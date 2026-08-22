.pragma library

/* Danish catalog. Two plural forms. */

function plural(n) {
    return n === 1 ? 0 : 1;
}

var strings = {
    "app.title": "Statistik",

    "nav.overview": "Oversigt",
    "nav.calendar": "Kalender",

    "overview.left": "Ca. {time} tilbage",
    "overview.noBook": "Ingen bog åbnet endnu",
    "overview.bookProgress": "Bogens fremgang: {percent} %",
    "overview.allBooks": "ALLE BØGER",
    "overview.booksFinished": "Bøger læst færdig",
    "overview.totalHours": "Timer i alt",
    "overview.pagesPerHour": "sider i timen",


    "calendar.dayTitle": "{date}  ·  {time}",
    "calendar.finished": "Læst færdig",
    "calendar.trackingSince": "Læsedata er registreret siden {date}.",
    "book.finishedOn": "Læst færdig {date}",
    "calendar.monthSummary": "{n} {days} · {time}",


    "about.version": "Version {version}",
    "about.check": "Søg efter opdatering",
    "about.install": "Installer {version}",
    "about.checking": "Spørger GitHub om den nyeste udgave…",
    "about.uptodate": "Dette er den nyeste version.",
    "about.available": "Version {version} er tilgængelig.",
    "about.downloading": "Henter opdateringen…",
    "about.ready": "Opdateringen er hentet. {app} lukker og starter selv igen — hvis ikke, så åbn den fra menuen.",
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
    "date.weekdays": ["Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"],
    "date.dayMonth": "{d}. {monthGen}",

    "time.hm": "{h} t {m} min",
    "time.m": "{m} min",

    "plural.days": ["dag", "dage"]
};
