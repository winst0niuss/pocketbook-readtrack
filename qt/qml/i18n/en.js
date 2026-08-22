.pragma library

/* English catalog — also the fallback for every key a catalog is missing
 * and for device languages we have no catalog for. */

function plural(n) {
    return n === 1 ? 0 : 1;
}

var strings = {
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
    "overview.donutCaption": "of your books finished",
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

    "year.title": "Books finished in {year}",
    "year.monthTitle": "{month} {year}  ·  {n} {books}",

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
