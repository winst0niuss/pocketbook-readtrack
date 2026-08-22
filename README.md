# ReadTrack

Reading statistics for stock PocketBook e-readers — no KOReader, no account, no
cloud. ReadTrack turns what the firmware already records into a proper stats
screen, built from the firmware's own UI components so it looks native.

> Built and tested on a **PocketBook Era Lite (PB710), firmware 6.x**. Other
> Allwinner **B288/B300** readers on Qt 6.8 firmware very likely work, but are
> untested — feedback welcome.

## Features

Five tabs, no scrolling (e-ink scrolling is fiddly):

- **Overview** — current book with cover, progress and time left; time read
  today, minutes per session, pages per minute, books-finished donut.
- **Streak** — current and best streak, a year heatmap with finished-book
  markers, longest-streak insight.
- **Calendar** — month grid with the day's most-read book cover; tap a day for
  the breakdown.
- **Year** — books finished per month; tap a month for finish dates.
- **About** — installed version and one-tap update over Wi-Fi.

Covers are extracted from your EPUBs, since the firmware's cover cache is
sometimes wrong for sideloaded books. German, English and Russian, picked from
the device language.

## How it works

A daemon in the same binary polls the firmware's library database
(`explorer-3.db`) **read-only** every 30 seconds and derives sessions from open
time and last position. Idle gaps are capped so standby isn't reading time. If
the daemon wasn't running, the last session per book is reconstructed on the
next launch.

The firmware keeps no session history — only a "last opened" and "last
position" per book — so the time before you installed ReadTrack cannot be
recovered. Rather than pass guesses off as history, stats start at the install
date and earlier days are drawn as unknown. Finished books are the exception:
the firmware dates those, so they show for the whole year, and "finished" always
means the firmware's own *mark as read* flag.

## Privacy

Your reading data never leaves the device: no account, no telemetry, nothing
uploaded. ReadTrack only **reads** the firmware database and writes its own
files under `system/readtrack/`.

The one request that goes out is to `api.github.com`, and only when you press
*Check for update*. There is no background check and no other host is contacted.

## Install

1. Download the `.zip` from the [latest release](../../releases/latest) and
   unzip it.
2. Copy `ReadTrack.app` to `applications/` on the reader over USB.
3. Eject, open ReadTrack once, then reboot so the custom icon appears.

The tile is labelled in the reader's language ("Statistics", "Статистика",
"Statistik"). First launch installs the launcher icon by adding one entry to
`system/config/desktop/view.json`, backed up next to it as
`view.json.readtrack-backup`. If that file can't be touched, the app still runs
with the default icon.

**Updating:** *About* → *Check for update* does it on the device — downloads the
release, swaps the binary and restarts. Copying a newer `ReadTrack.app` over the
old one via USB works too. Your stats database is left alone either way.

**Uninstall:** delete `applications/ReadTrack.app`, and restore `view.json` from
the backup if you want the launcher entry gone.

## Data

[docs/DEVICE-DATA.md](docs/DEVICE-DATA.md) surveys everything the firmware
stores that reading stats can be built from — the two databases, the cover
cache, how they join — and what it does not store, which is why ReadTrack
derives sessions itself.

## Building

See [BUILDING.md](BUILDING.md): `make sdk` once, then `make qt` produces
`build-qt/ReadTrack.app`. `make test` runs the host-side tests.

## License and credits

MIT — see [LICENSE](LICENSE). Bundles [SQLite](https://www.sqlite.org/) (public
domain) and [miniz](https://github.com/richgel999/miniz) (MIT); cross-compilation
builds on [fstanis/pocketbook-sdk-qt6](https://github.com/fstanis/pocketbook-sdk-qt6).

Not affiliated with PocketBook. It only reads the firmware database and makes a
single backed-up edit to the launcher config, but you are installing third-party
software on your reader — use at your own risk.

ReadTrack is a fork of [Better Stats](https://github.com/nikljuel/better-stats)
by Niklas Jülicher, renamed and continued as a separate project. The original is
MIT-licensed and its copyright notice is kept in [LICENSE](LICENSE).
