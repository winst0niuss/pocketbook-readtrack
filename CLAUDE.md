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
- `qt/src/inkview_bridge.cpp` — the **only** TU allowed to include `inkview.h`; its macros collide with Qt.
- `qt/qml/` — four tabs, no scrolling (e-ink), plus `PanelDialog.qml` and the `Tr` i18n singleton.

### Invariants that are easy to break

- **`recovered = 1` rows are estimates, not measurements.** They are wall-clock spans reconstructed when the daemon wasn't running, capped at `RECOVERED_CAP_SECONDS`, and carry no `pages_start`. They count toward totals but must be excluded (`AND recovered = 0`) from every derived metric — averages, pages/min, session counts.
- **Sessions must not span local midnight.** `tracker_observe` splits the row at midnight because all day-level stats `GROUP BY date(end_time,'unixepoch','localtime')`.
- **Gaps are capped at `IDLE_CAP_SECONDS`** (600) so standby doesn't become reading time.
- **Deduplicate by title, not `book_id`.** `books_impl` keeps stale rows and the same book exists as several file copies; the calendar/year/book-count queries group by normalized title (see `sameBook()` / `titleWords()` prefix matching).
- **Nothing before `meta.tracking_since` may be shown as history.** The marker is stamped on first run; earlier sessions only exist because `tracker_recover()` reconstructed them from the firmware's last-open timestamps, and they are guesses, not measurement. Every session aggregate appends `AND_TRACKED` (`src/stats_db.h`), and the year heatmap renders those days as unknown via `trackedFrom` rather than as "not read". Firmware-sourced finish dates are exempt.
- **"Finished" always comes from the firmware** (`books_settings.completed` / `completed_ts`), never from our own DB, so it matches the Library UI.
- Covers: try EPUB extraction first (`epub_cover.cpp`, miniz), fall back to the firmware cover cache — the cache holds the wrong image for some Calibre/sideloaded books. Extracted covers are cached as PNG under `system/readtrack/covers/`.

### Device-side constraints

- Cross-compilation constraints (softfp ABI, exact Qt version match, `rcc --no-zstd`) come from the SDK — see the fstanis/pocketbook-sdk-qt6 notes before touching the toolchain or CMake.
- **The launcher icons are 106x64 8-bit BMPs, and the width is the load-bearing half.** The launcher draws a tile as image-then-label at the bitmap's native size, so the canvas height decides where the label sits — a 128 px canvas drops the label below the row of labels beside it. Width is stranger: 106 renders, 48 makes the icon vanish entirely (the tile shows no image at all and the label slides up into the empty space), and why has never been established, so treat 106 as the only known-good value. Both sizes were confirmed on a PB710; `--canvas`/`--glyph` on `tools/make_icon.py` exist for re-probing them. The glyph itself lives on a 48-unit grid scaled onto the canvas, with the stroke width left unscaled so the line art stays as thin as the firmware's own icons (~50 px glyphs) instead of reading as heavier than its neighbours.
- The app writes outside its own directory in exactly one place: `installer.cpp` adds a `U_readtrack` entry to `system/config/desktop/view.json` after backing it up. Keep that patch idempotent and failure-tolerant — the app must still start if the file is missing or read-only.
- No network access anywhere. Everything stays on device.

### Conventions

- New source files must be added to `CMakeLists.txt`; new QML files to **both** `qt/qml/readtrack.qrc` and the parent tab.
- All user-facing strings go through `Tr.t("<key>")`, resolved against the catalogs in `qt/qml/i18n/`; `Tr.plural("plural.<noun>", n)` inflects a noun for a count. A missing key falls back to English, then renders as the key itself. Adding a language never touches a call site.
- Sizing and color come from the firmware theme: `Global.dp(n)`, `GlobalValues.*`, `FontStyles.*`, `StyledText` instead of `Text`. No hardcoded pixels or colors, so dark/light follows the device.
- Tabs refresh in `Component.onCompleted` and `onVisibleChanged` — there is no live binding to the DB.
- C code is `-Wall -Wextra -std=gnu99`, no allocation in the poll path; existing comments are English (a few older ones German).
