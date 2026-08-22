.pragma library

/* English catalog — also the fallback for every key a catalog is missing
 * and for device languages we have no catalog for. */

function plural(n) {
    return n === 1 ? 0 : 1;
}

var strings = {
    "app.title": "Statistics",

    "nav.overview": "Overview",
    "nav.streak": "Streak",
    "nav.calendar": "Calendar",
    "nav.year": "Year",

    "overview.progress": "Progress: {percent} %",
    "overview.read": "Read: {time}",
    "overview.left": "About {time}",
    "overview.noBook": "No book opened yet",
    "overview.today": "Read today",
    "overview.minPerSession": "Min per session",
    "overview.pagesPerMinute": "Pages per minute",
    "overview.allBooks": "ALL BOOKS",
    "overview.donutCaption": "of the books on your device",
    "overview.booksFinished": "Books finished",
    "overview.totalHours": "Total hours",

    "streak.current": "Days current streak",
    "streak.best": "Days best streak {year}",
    "streak.readingDays": "{n} READING DAYS IN {year}",
    "streak.none": "No reading streak yet — today is a good day to start one.",
    "streak.longest": "Your longest streak began on {when} and lasted {n} {days}.",
    "streak.trackingSince": "Reading data has been recorded since {date}.",
    "streak.legendNotRead": "not read",
    "streak.legendRead": "read",
    "streak.legendFinished": "book finished",

    "calendar.dayTitle": "{date}  ·  {time}",
    "calendar.finished": "Finished",

    "year.title": "Books finished in {year}",
    "year.monthTitle": "{month} {year}  ·  {n} {books}",
    "book.finishedOn": "Finished {date}",

    "about.version": "Version {version}",
    "about.check": "Check for update",
    "about.install": "Install {version}",
    "about.checking": "Asking GitHub for the latest release\u2026",
    "about.uptodate": "This is the latest release.",
    "about.available": "Version {version} is available.",
    "about.downloading": "Downloading the update\u2026",
    "about.ready": "Update downloaded. ReadTrack closes now and starts again on its own \u2014 if it doesn't, open it from the launcher.",
    "about.privacy": "The update is fetched from GitHub over Wi-Fi, and only when you press the button. ReadTrack goes online at no other time.",

    "about.log": "Last attempt:",

    "update.errNoNetwork": "No connection. Turn on Wi-Fi and try again.",
    "update.errDownload": "Download failed.",
    "update.errResponse": "GitHub sent an unexpected answer.",
    "update.errNoAsset": "The latest release ships no installable build.",
    "update.errUnsupported": "This firmware offers no way to download the update.",
    "update.errCorrupt": "The downloaded file is damaged \u2014 nothing was changed.",
    "update.errHandover": "The new version could not be swapped in. It is stored here:",

    "date.months": ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"],
    "date.monthsGen": ["January", "February", "March", "April", "May", "June",
                       "July", "August", "September", "October", "November", "December"],
    "date.monthsShort": ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                         "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    "date.weekdays": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "date.dayMonth": "{month} {d}",

    "time.hm": "{h}h {m}m",
    "time.m": "{m} min",

    "plural.days": ["day", "days"],
    "plural.books": ["book", "books"]
};
