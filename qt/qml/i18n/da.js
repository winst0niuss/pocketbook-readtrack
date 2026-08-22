.pragma library

/* Danish catalog. Two plural forms. */

function plural(n) {
    return n === 1 ? 0 : 1;
}

var strings = {
    "app.title": "Statistik",

    "nav.overview": "Oversigt",
    "nav.streak": "Stime",
    "nav.calendar": "Kalender",
    "nav.year": "År",

    "overview.progress": "Fremgang: {percent} %",
    "overview.read": "Læst: {time}",
    "overview.left": "Ca. {time} tilbage",
    "overview.noBook": "Ingen bog åbnet endnu",
    "overview.today": "Læst i dag",
    "overview.minPerSession": "min pr. session",
    "overview.pagesPerMinute": "sider i minuttet",
    "overview.allBooks": "ALLE BØGER",
    "overview.donutCaption": "af bøgerne på enheden",
    "overview.booksFinished": "Bøger læst færdig",
    "overview.totalHours": "Timer i alt",

    "streak.current": "{days} nuværende stime",
    "streak.best": "{days} bedste stime {year}",
    "streak.readingDays": "{n} {daysCaps} MED LÆSNING I {year}",
    "streak.none": "Ingen læsestime endnu — i dag er en god dag at begynde en.",
    "streak.longest": "Din længste stime begyndte {when} og varede {n} {days}.",
    "streak.trackingSince": "Læsedata er registreret siden {date}.",
    "streak.legendNotRead": "ingen læsning",
    "streak.legendRead": "læsning",
    "streak.legendFinished": "bog læst færdig",

    "calendar.dayTitle": "{date}  ·  {time}",
    "calendar.finished": "Læst færdig",

    "year.title": "Bøger læst færdig i {year}",
    "year.monthTitle": "{month} {year}  ·  {n} {books}",
    "book.finishedOn": "Læst færdig {date}",

    "about.version": "Version {version}",
    "about.check": "Søg efter opdatering",
    "about.install": "Installer {version}",
    "about.checking": "Spørger GitHub om den nyeste udgave…",
    "about.uptodate": "Dette er den nyeste version.",
    "about.available": "Version {version} er tilgængelig.",
    "about.downloading": "Henter opdateringen…",
    "about.ready": "Opdateringen er hentet. ReadTrack lukker og starter selv igen — hvis ikke, så åbn den fra menuen.",
    "about.privacy": "Opdateringen hentes fra GitHub over wi-fi, og kun når du trykker på knappen. Ellers går ReadTrack aldrig på nettet.",
    "about.log": "Seneste forsøg:",

    "update.errNoNetwork": "Ingen forbindelse. Slå wi-fi til, og prøv igen.",
    "update.errDownload": "Hentningen mislykkedes.",
    "update.errResponse": "GitHub svarede uventet.",
    "update.errNoAsset": "Den nyeste udgave indeholder ingen installerbar fil.",
    "update.errUnsupported": "Denne firmware kan ikke hente opdateringen.",
    "update.errCorrupt": "Den hentede fil er beskadiget — intet blev ændret.",
    "update.errHandover": "Appen kunne ikke udskiftes. Den nye version ligger her:",

    "date.months": ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"],
    "date.monthsGen": ["januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "september", "oktober", "november", "december"],
    "date.monthsShort": ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec"],
    "date.weekdays": ["Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"],
    "date.dayMonth": "{d}. {monthGen}",

    "time.hm": "{h} t {m} min",
    "time.m": "{m} min",

    "plural.days": ["dag", "dage"],
    "plural.books": ["bog", "bøger"]
};
