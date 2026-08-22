# PocketBook Statistics

Reading statistics for stock PocketBook e-readers — no KOReader, no account, no
cloud. PocketBook Statistics turns what the firmware already records into a proper stats
screen, built from the firmware's own UI components so it looks native.

> Built and tested on a **PocketBook Era Lite (PB710), firmware 6.x**. Other
> Allwinner **B288/B300** readers on Qt 6.8 firmware very likely work, but are
> untested — feedback welcome.

## Features

Two screens, no scrolling (e-ink scrolling is fiddly):

- **Overview** — the book in hand with its cover, progress and time left; hours
  spent on it, minutes per session and pages per hour; then the library behind
  it — a ring of how much of the books on the device you have read, with the
  finished ones marked out inside it, the all-time finished count and total
  hours read.
- **Calendar** — month grid with the day's most-read book cover; tap a day for
  the breakdown.

*About* — installed version and a one-tap update over Wi-Fi — sits behind the
info glyph in the header, opposite the reader's home button.

Covers are extracted from your EPUBs, since the firmware's cover cache is
sometimes wrong for sideloaded books. The interface follows the device
language across 29 of them — every European language a PocketBook ships with,
plus Kazakh and Azerbaijani — and falls back to English for anything else.

## How it works

A daemon in the same binary polls the firmware's library database
(`explorer-3.db`) **read-only** every 30 seconds and derives sessions from open
time and last position. Idle gaps are capped so standby isn't reading time. If
the daemon wasn't running, the last session per book is reconstructed on the
next launch.

The firmware keeps no session history — only a "last opened" and "last
position" per book — so the time before you installed PocketBook Statistics cannot be
recovered. Rather than pass guesses off as history, stats start at the install
date and earlier days are drawn as unknown. Finished books are the exception:
the firmware dates those, so they appear on the calendar even for days before
the install date, and "finished" always means the firmware's own *mark as read*
flag.

## Privacy

Your reading data never leaves the device: no account, no telemetry, nothing
uploaded. PocketBook Statistics only **reads** the firmware database and writes its own
files under `system/pocketbook-statistics/`.

The one request that goes out is to `api.github.com`, and only when you press
*Check for update*. There is no background check and no other host is contacted.

## Install

1. Download the `.zip` from the [latest release](../../releases/latest) and
   unzip it.
2. Copy `PocketBookStatistics.app` to `applications/` on the reader over USB.
3. Eject, open PocketBook Statistics once, then reboot so the custom icon appears.

The tile is labelled in the reader's language ("Statistics", "Статистика",
"Statistik", …). First launch installs the launcher icon by adding one entry to
`system/config/desktop/view.json`, backed up next to it as
`view.json.pbstatistics-backup`. If that file can't be touched, the app still runs
with the default icon.

**Updating:** *About* → *Check for update* does it on the device — downloads the
release, swaps the binary and restarts. Copying a newer `PocketBookStatistics.app` over the
old one via USB works too. Your stats database is left alone either way.

**Uninstall:** delete `applications/PocketBookStatistics.app`, and restore `view.json` from
the backup if you want the launcher entry gone.

## Data

[docs/STATS-PLAN.md](docs/STATS-PLAN.md) is the plan for what the app shows and
why, measured against Kobo, KOReader and Goodreads.
[docs/DEVICE-DATA.md](docs/DEVICE-DATA.md) surveys everything the firmware
stores that reading stats can be built from — the two databases, the cover
cache, how they join — and what it does not store, which is why PocketBook Statistics
derives sessions itself.

## Building

See [BUILDING.md](BUILDING.md): `make sdk` once, then `make qt` produces
`build-qt/PocketBookStatistics.app`. `make test` runs the host-side tests.

## License and credits

MIT — see [LICENSE](LICENSE). Bundles [SQLite](https://www.sqlite.org/) (public
domain) and [miniz](https://github.com/richgel999/miniz) (MIT); cross-compilation
builds on [fstanis/pocketbook-sdk-qt6](https://github.com/fstanis/pocketbook-sdk-qt6).

Not affiliated with PocketBook. It only reads the firmware database and makes a
single backed-up edit to the launcher config, but you are installing third-party
software on your reader — use at your own risk.
