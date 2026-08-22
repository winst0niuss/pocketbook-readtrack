# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Environment quirks

- The working directory name ends with a **trailing space** (`pocketbook-readtrack `). Always quote paths.
- Git repo on `main`, remote `origin` → `winst0niuss/pocketbook-readtrack`. History is short; the two `tmp:` commits were CI probes for the qmllint gate.

## Commands

```bash
make sdk      # one-time: sparse-clones fstanis/pocketbook-sdk-qt6 into third_party/ (~2 MB)
make qt       # cross-compiles in Docker -> build-qt/ReadTrack.app (ARM32 softfp ELF)
make test     # host build+run of test/test_tracker.c (no device, no Docker)
make deploy   # cp to $(DEVICE)/applications/ (DEVICE defaults to /Volumes/PB710)
make icons    # regenerate qt/qml/*.bmp from tools/make_icon.py (needs Pillow)
```

`make test` is a single assert-based binary — there is no test selection or framework. To run one scenario, comment out the others in `main()` of `test/test_tracker.c` or add a new block. It compiles only `src/tracker.c` + `src/stats_db.c` against the host `libsqlite3`, so **the C core must stay free of Qt and device headers**.

The tests point the code at temp DBs through `READTRACK_DB` / `READTRACK_EXPLORER_DB`; `daemon.c` reads those env vars in `stats_db_path()` / `explorer_db_path()`, which is the only way to exercise the app off-device.

There is no host-runnable UI: the QML imports `com.pocketbook.controls`, which exists only in the device firmware at `/ebrmain/qml`. UI changes can only be verified on a reader.

CI (`.github/workflows/build.yml`) runs `make test` on a plain runner, then in the SDK image runs `qmllint qt/qml/*.qml` before `make qt`. `rcc` embeds QML verbatim, so **that lint gate is the only pre-device check for QML syntax errors** — only its exit code matters; its import/unqualified-access warnings are noise because the firmware modules aren't resolvable off-device. Pushing a `v*` tag also publishes `ReadTrack.zip` as a release.

## Architecture

One ARM ELF that is both the app and its background daemon; it links the device's own Qt 6.8.2 from `/ebrmain` (nothing Qt is bundled).

**Data flow:** firmware library DB (`explorer-3.db`, opened **read-only**, never written) → `tracker.c` derives sessions → own stats DB (`/mnt/ext1/system/readtrack/readtrack.db`) → `stats_db.c` aggregates → `stats_bridge.cpp` shapes `QVariantMap`s → QML tabs.

**Layers:**
- `src/*.c` — plain C, no Qt. `tracker.c` (session derivation + schema + idempotent migration), `stats_db.c` (aggregation SQL, streak walk), `daemon.c` (pidfile, 30 s poll loop, `spawn_daemon`).
- `qt/src/main.cpp` — `--daemon` is handled **before any Qt call** and runs the pure C loop; otherwise sets QPA `pocketbook2` + software rendering, registers the launcher icon, forks the daemon, loads `qrc:/main.qml`.
- `qt/src/stats_bridge.cpp` — the only QML-visible object (`stats` context property); each `Q_INVOKABLE` opens/closes explorer-3 itself.
- `qt/src/inkview_bridge.cpp` — the **only** TU allowed to include `inkview.h`; its macros collide with Qt. Also holds the two network calls (Wi-Fi up, download-to-file).
- `qt/src/updater.cpp` — the `updater` context property: version check against the GitHub release, unpack, stage, hand over.
- `qt/qml/` — five tabs, no scrolling (e-ink), plus `PanelDialog.qml` and the `Tr` i18n singleton.

`docs/DEVICE-DATA.md` is the survey of what the firmware stores (both databases, their field coverage on a real device, the hash that joins them) and what it does not. Check it before designing a metric — it saves a USB round trip.

### Invariants that are easy to break

- **`recovered = 1` rows are estimates, not measurements.** They are wall-clock spans reconstructed when the daemon wasn't running, capped at `RECOVERED_CAP_SECONDS`, and carry no `pages_start`. They count toward totals but must be excluded (`AND recovered = 0`) from every derived metric — averages, pages/min, session counts.
- **Sessions must not span local midnight.** `tracker_observe` splits the row at midnight because all day-level stats `GROUP BY date(end_time,'unixepoch','localtime')`.
- **Gaps are capped at `IDLE_CAP_SECONDS`** (600) so standby doesn't become reading time.
- **Deduplicate by title, not `book_id`.** `books_impl` keeps stale rows and the same book exists as several file copies; the calendar/year/book-count queries group by normalized title (see `sameBook()` / `titleWords()` prefix matching).
- **Nothing before `meta.tracking_since` may be shown as history.** The marker is stamped on first run; earlier sessions only exist because `tracker_recover()` reconstructed them from the firmware's last-open timestamps, and they are guesses, not measurement. Every session aggregate appends `AND_TRACKED` (`src/stats_db.h`), and the year heatmap renders those days as unknown via `trackedFrom` rather than as "not read". Firmware-sourced finish dates are exempt — the year heatmap **and** the calendar draw them for untracked days too, carrying no reading time (`secs = 0`), because the firmware dates the finish without saying how long that day's reading was. A tab that can show a blank day must also say why it is blank: the calendar dims untracked day numbers and prints `streak.trackingSince` beneath the grid, so an empty month reads as "not recorded yet" rather than as a bug.
- **"Finished" always comes from the firmware** (`books_settings.completed` / `completed_ts`), never from our own DB, so it matches the Library UI.
- **`VERSION` is the single source of the version, and a release tag must match it.** It is read by CMake into `READTRACK_VERSION` and compared against the release's `tag_name` (`version_compare` in `src/version.c`, host-tested). A tag that disagrees with the file makes every installed build offer an update to the version it already runs — CI fails the tag build for exactly that reason. Bump `VERSION` in the commit that earns the release, not at tag time.
- **A running binary cannot overwrite itself.** The updater unpacks to `ReadTrack.app.new` beside the installed file and leaves the swap to a generated `/bin/sh` script that waits for the app's PID to disappear, kills the daemon (it runs from the same ELF), `mv`s the file and starts the new one. Staging must stay on the same mount — `mv` is only atomic within one filesystem, and `/mnt/ext1` is not the same one as `/tmp`.
- **The update path never blocks on the network without repainting first.** InkView must not be driven from a second thread, so `check()`/`install()` run on the GUI thread and call `publish()` (state + `processEvents`) before each blocking firmware call. User input stays excluded there so a second tap cannot re-enter them.
- **Covers must outlive the book file.** Most finished books get deleted, and both the file and the firmware's cache entry go with them — so a thumbnail only exists later if it was copied while the book was still there. Three rules follow:
  - The cover key is the **bare file hash from `books_fast_hashes`**, never `files.fast_hash`: `files` lists only what is on disk (5 of 223 books on the reference device), so keying off it loses the cover for every deleted book. Rows written before v0.7 hold `<storageid><hash>` — 33 characters instead of 32, which is how `coverUrlForKey()` tells them apart.
  - `adopt_cover()` in `tracker.c` copies the firmware's PNG into `OWN_COVER_DIR` as `fw_<hash>.png` on first sight of a book. It runs in the poll path: no allocation, and a no-op once the copy exists.
  - Lookup order in `resolveCoverUrl()` is our cache → EPUB extraction (`epub_cover.cpp`, miniz) → firmware cache, adopted on the way out. EPUB wins over the firmware cache because the cache holds ad pages instead of the cover for some Calibre books; our cache wins over both because it is the only one that survives.

### Device-side constraints

- Cross-compilation constraints (softfp ABI, exact Qt version match, `rcc --no-zstd`) come from the SDK — see the fstanis/pocketbook-sdk-qt6 notes before touching the toolchain or CMake.
- **The launcher icons are 106x64 8-bit BMPs, and the width is the load-bearing half.** The launcher draws a tile as image-then-label at the bitmap's native size, so the canvas height decides where the label sits — a 128 px canvas drops the label below the row of labels beside it. Width is stranger: 106 renders, 48 makes the icon vanish entirely (the tile shows no image at all and the label slides up into the empty space), and why has never been established, so treat 106 as the only known-good value. Both sizes were confirmed on a PB710; `--canvas`/`--glyph` on `tools/make_icon.py` exist for re-probing them. The glyph itself lives on a 48-unit grid scaled onto the canvas, with the stroke width left unscaled so the line art stays as thin as the firmware's own icons (~50 px glyphs) instead of reading as heavier than its neighbours.
- The app writes outside its own directory in exactly one place: `installer.cpp` adds a `U_readtrack` entry to `system/config/desktop/view.json` after backing it up. Keep that patch idempotent and failure-tolerant — the app must still start if the file is missing or read-only.
- **The network is used in exactly one place: the update check.** `updater.cpp` asks `api.github.com` for the latest release and downloads that release's `ReadTrack.zip`, and only when the user presses the button on the About tab — there is no background check and no other host is ever contacted. Reading data never leaves the device.
- **The firmware's network API behaves differently from what `inkview.h` promises**, and all three lessons were paid for on a PB710:
  - **The session API (`NewSession`/`DownloadTo`) does not transfer anything under Qt.** It returns `NET_OK` and writes a zero-byte file: the transfer is handed to the event loop InkView runs for its own applications, and ours is Qt's. Use the synchronous `QuickDownloadExt3`, which returns the whole body in one heap buffer.
  - **`iv_sessioninfo` does not match the header on this firmware.** Reading `->response` yielded 1 and 0 where an HTTP status belonged and killed the process. Judge a download by what landed in the file; never read a session struct.
  - **Redirects are followed for us.** A release asset URL bounces to a CDN host, and `QuickDownloadExt3` lands the final body — confirmed on a PB710 with the 599 KB zip. Nothing needs to chase a `Location` header (which is just as well: the session struct it would come from is unreadable).
  - **`QueryNetwork()` is not a connection test.** `0x202` (`NET_WIFI|NET_WIFIREADY`) means the radio is up and answered a scan — a download in that state comes back empty. Always call `NetConnectSilent(NULL)`, which is a no-op when a connection exists.
- **Everything in the network path is resolved with `dlsym`, never linked.** `inkview.h` is the SDK's, `libinkview.so` is the device's, and a function present in the header but missing from the library is a lazily-bound symbol that kills the process on first call — with no console to say why. `resolve<Fn>()` in `inkview_bridge.cpp` turns that into a log line and a fallback.
- **The update log is the only debugger this app has.** `update_log.cpp` opens, writes and closes per line so a crash cannot swallow the last one, and the About tab shows the tail whenever the previous run did not reach a resting state. Trace every step of a new device-side path this way — it is faster than another USB round trip.

### Conventions

- New source files must be added to `CMakeLists.txt`; new QML files to **both** `qt/qml/readtrack.qrc` and the parent tab.
- The launcher tile's label is the **one** user-facing string outside the catalogs: `launcherTitle()` in `installer.cpp` picks it from the device language, because it is written into `view.json` before a QML engine exists. Adding a language means touching that table too. The label is "Statistics"/"Статистика"/"Statistik", not the app name — it sits among firmware tiles that are named for what they do.
- All other user-facing strings go through `Tr.t("<key>")`, resolved against the catalogs in `qt/qml/i18n/`; `Tr.plural("plural.<noun>", n)` inflects a noun for a count. A missing key falls back to English, then renders as the key itself. Adding a language never touches a call site.
- Sizing and color come from the firmware theme: `Global.dp(n)`, `GlobalValues.*`, `FontStyles.*`, `StyledText` instead of `Text`. No hardcoded pixels or colors, so dark/light follows the device.
- Tabs refresh in `Component.onCompleted` and `onVisibleChanged` — there is no live binding to the DB.
- C code is `-Wall -Wextra -std=gnu99`, no allocation in the poll path; existing comments are English (a few older ones German).
