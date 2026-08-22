# PocketBook Statistics

Reading statistics for stock PocketBook e-readers. The firmware records what you
read and when you last touched it; this app turns that into a stats screen,
built from the firmware's own UI components.

| Overview | Calendar |
|---|---|
| <img src="docs/screenshots/overview.png" width="380" alt="Overview: the current book with cover and progress, three figures, and the library ring"> | <img src="docs/screenshots/calendar.png" width="380" alt="Calendar: a month grid with book covers on the days they were read"> |

<sup>Shot on a PB629 with a filled-in history, so the calendar shows what a used
month looks like.</sup>

> Developed and tested on a **PocketBook Verse (PB629), firmware
> U629.6.10.1461**. Other Allwinner **B288/B300** readers on Qt 6.8 firmware
> should work, but none has been tried.

## What it shows

- **Overview** — the current book with cover, progress and time left at your own
  pace; hours on it, minutes per session, pages per hour. Below, the library: a
  ring of how much of the books on the device you have read (part-read ones
  count too), books finished, total hours.
- **Calendar** — a month at a time, each day carrying the cover of what you read
  most. Tap a day for the breakdown, a book for its detail.

The **ⓘ** in the header holds the version, the update button and one setting.

## How it works

A daemon in the same binary reads the firmware's library database — read-only,
every 30 seconds — and turns movements of your reading position into sessions.
Idle gaps are capped at ten minutes, so a book left open overnight is not eight
hours of reading, and sessions split at local midnight.

Nothing starts at boot: the firmware has no place for that outside its own
partition. Instead, ⓘ offers to track **from the moment a book opens** — the app
registers itself as the handler for EPUB, FB2 and PDF, starts the daemon when
you open a book and hands the book straight to the usual reader. With that off,
open the app once after switching the reader on.

Time missed while the daemon was down is reconstructed from the firmware's
timestamps, capped, and marked as an estimate: it counts toward total hours but
never toward averages. Days before the install date are drawn as unknown rather
than as days without reading. "Finished" always means the firmware's own *mark
as read* flag.

Covers are extracted from your EPUBs when the firmware's cache is wrong, and
kept in the app's own cache — which is why a finished book still has a
thumbnail after you delete the file. The interface follows the device language
across 29 of them.

## Privacy

Nothing is uploaded: no account, no telemetry. The app reads the firmware's
database and writes its own files under `system/pocketbook-statistics/`. One
request goes out, to `api.github.com`, and only when you press *Check for
update*.

## Install

1. Download the `.zip` from the [latest release](../../releases/latest) and
   unpack it.
2. Copy `PocketBookStatistics.app` to `applications/` on the reader over USB.
3. Eject, open the app once, then reboot so the launcher icon appears.

Updating afterwards is ⓘ → *Check for update*. To uninstall, delete the `.app`,
restore `view.json` from the backup beside it, and delete
`system/pocketbook-statistics/`.

## Build

One ARM binary, app and daemon in one, linking the Qt 6.8.2 already on the
reader. `make sdk` once, then `make qt`; `make test` runs the host-side tests.
Details in [BUILDING.md](BUILDING.md), the firmware's data in
[docs/DEVICE-DATA.md](docs/DEVICE-DATA.md).

## License

MIT — see [LICENSE](LICENSE). Bundles [SQLite](https://www.sqlite.org/) and
[miniz](https://github.com/richgel999/miniz); cross-compilation builds on
[fstanis/pocketbook-sdk-qt6](https://github.com/fstanis/pocketbook-sdk-qt6).
Not affiliated with PocketBook — third-party software on your reader, at your
own risk.
