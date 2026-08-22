# PocketBook Statistics

Reading statistics for stock PocketBook e-readers. The firmware already records
what you read and when you last touched it; this app turns that into a stats
screen, built from the firmware's own UI components so it looks like it belongs
there.

> Developed and tested on a **PocketBook Verse (PB629), firmware
> U629.6.10.1461**. Other Allwinner **B288/B300** readers on Qt 6.8 firmware
> should work the same way, but none has been tried — reports welcome.

## What it shows

Two screens:

- **Overview** — the book in hand with its cover, how far in you are and what
  is left; hours spent on that book, minutes per session, pages per hour. Below
  it, the library: a ring of how much of the books on the device you have read,
  the all-time count of finished books, total hours.
- **Calendar** — a month at a time, each day carrying the cover of whatever you
  read most that day. Tap a day for the breakdown, tap a book for its detail.

The **ⓘ** in the header opens version and update; it sits opposite the reader's
home button because an update check is a detour, not a screen.

Covers come from your EPUBs when the firmware's cache is wrong for a sideloaded
book, and are kept in the app's own cache so a finished book keeps its
thumbnail after you delete the file. The interface follows the device language
across 29 of them — every European language a PocketBook ships with, plus
Kazakh and Azerbaijani — and falls back to English.

## How the time is counted

The firmware keeps no session history: per book it stores when it was opened,
when the position last moved, and which page you are on. A daemon in the same
binary reads that database **read-only** every 30 seconds and turns movements
of the position into reading time. Gaps are capped at ten minutes, so a book
left open overnight does not become eight hours of reading, and a session is
split at local midnight so day figures stay honest.

The daemon starts with the app and keeps running after you close it, through
sleep. It does not survive a reboot — open the app once after switching the
reader on, and it is back. Time missed while it was not running is
reconstructed from the firmware's own timestamps, capped at 90 minutes per
book, and marked as an estimate: it counts toward total hours but never toward
averages, pages per hour or session counts.

Nothing before the install date is presented as history, because there is none
to present — those days are drawn as unknown rather than as "did not read".
Finished books are the exception: the firmware dates those itself, so they show
whenever they happened, and "finished" always means the firmware's own *mark as
read* flag, exactly as the Library app shows it.

## Privacy

Your reading data never leaves the device: no account, no telemetry, nothing
uploaded. The app only **reads** the firmware's library database and writes its
own files under `system/pocketbook-statistics/`.

One request goes out, to `api.github.com`, and only when you press *Check for
update*. There is no background check and no other host is ever contacted.

## Install

1. Download the `.zip` from the [latest release](../../releases/latest) and
   unpack it.
2. Copy `PocketBookStatistics.app` to `applications/` on the reader over USB.
3. Eject, open the app once, then reboot so the custom launcher icon appears.

The tile is labelled in the reader's language ("Statistics", "Статистика",
"Statistik", …) — it says what it does, like the firmware's own tiles. First
launch registers it by adding one entry to
`system/config/desktop/view.json`, backed up beside it as
`view.json.pbstatistics-backup`. If that file cannot be written, the app still
runs with the default icon.

**Updating:** ⓘ → *Check for update* does it on the device — fetches the
release, swaps the binary, restarts. Copying a newer `PocketBookStatistics.app`
over the old one via USB works too. Your statistics are left alone either way.

**Uninstall:** delete `applications/PocketBookStatistics.app`; restore
`view.json` from the backup to remove the launcher tile, and delete
`system/pocketbook-statistics/` to remove the statistics with it.

## Under the hood

One ARM binary that is both the app and its daemon, linking the Qt 6.8.2 that
is already on the reader — nothing Qt is bundled. See
[BUILDING.md](BUILDING.md): `make sdk` once, then `make qt` produces
`build-qt/PocketBookStatistics.app`; `make test` runs the host-side tests.

[docs/DEVICE-DATA.md](docs/DEVICE-DATA.md) is the survey of what the firmware
actually stores — the two databases, the cover cache, the hash that joins them,
and what is missing, which is why the app derives sessions itself.
[docs/STATS-PLAN.md](docs/STATS-PLAN.md) is what the screens show and why,
measured against Kobo, KOReader and Goodreads.

## License and credits

MIT — see [LICENSE](LICENSE). Bundles [SQLite](https://www.sqlite.org/) (public
domain) and [miniz](https://github.com/richgel999/miniz) (MIT);
cross-compilation builds on
[fstanis/pocketbook-sdk-qt6](https://github.com/fstanis/pocketbook-sdk-qt6).

Not affiliated with PocketBook. It only reads the firmware's database and makes
a single backed-up edit to the launcher config, but you are installing
third-party software on your reader — use at your own risk.
