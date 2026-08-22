.pragma library

/* Norwegian (Bokmål) catalog. Two plural forms. */

function plural(n) {
    return n === 1 ? 0 : 1;
}

var strings = {
    "app.title": "Statistikk",

    "nav.overview": "Oversikt",
    "nav.streak": "Rekke",
    "nav.calendar": "Kalender",
    "nav.year": "År",

    "overview.progress": "Framdrift: {percent} %",
    "overview.read": "Lest: {time}",
    "overview.left": "Ca. {time} igjen",
    "overview.noBook": "Ingen bok åpnet ennå",
    "overview.today": "Lest i dag",
    "overview.minPerSession": "min per økt",
    "overview.pagesPerMinute": "sider per minutt",
    "overview.allBooks": "ALLE BØKER",
    "overview.donutCaption": "av bøkene på enheten",
    "overview.booksFinished": "Ferdigleste bøker",
    "overview.totalHours": "Timer totalt",

    "streak.current": "{days} nåværende rekke",
    "streak.best": "{days} beste rekke {year}",
    "streak.readingDays": "{n} {daysCaps} MED LESING I {year}",
    "streak.none": "Ingen leserekke ennå — i dag er en god dag å starte en.",
    "streak.longest": "Den lengste rekken din begynte {when} og varte {n} {days}.",
    "streak.trackingSince": "Lesedata er registrert siden {date}.",
    "streak.legendNotRead": "ingen lesing",
    "streak.legendRead": "lesing",
    "streak.legendFinished": "bok ferdiglest",

    "calendar.dayTitle": "{date}  ·  {time}",
    "calendar.finished": "Ferdiglest",

    "year.title": "Bøker ferdiglest i {year}",
    "year.monthTitle": "{month} {year}  ·  {n} {books}",
    "book.finishedOn": "Ferdiglest {date}",

    "about.version": "Versjon {version}",
    "about.check": "Se etter oppdatering",
    "about.install": "Installer {version}",
    "about.checking": "Spør GitHub om siste utgivelse…",
    "about.uptodate": "Dette er den nyeste versjonen.",
    "about.available": "Versjon {version} er tilgjengelig.",
    "about.downloading": "Laster ned oppdateringen…",
    "about.ready": "Oppdateringen er lastet ned. ReadTrack lukkes og starter av seg selv — hvis ikke, åpne den fra menyen.",
    "about.privacy": "Oppdateringen hentes fra GitHub over wifi, og bare når du trykker på knappen. Ellers går ReadTrack aldri på nett.",
    "about.log": "Siste forsøk:",

    "update.errNoNetwork": "Ingen tilkobling. Slå på wifi og prøv igjen.",
    "update.errDownload": "Nedlastingen mislyktes.",
    "update.errResponse": "GitHub svarte uventet.",
    "update.errNoAsset": "Siste utgivelse inneholder ingen installerbar fil.",
    "update.errUnsupported": "Denne fastvaren kan ikke laste ned oppdateringen.",
    "update.errCorrupt": "Den nedlastede filen er skadet — ingenting ble endret.",
    "update.errHandover": "Appen kunne ikke byttes ut. Den nye versjonen ligger her:",

    "date.months": ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"],
    "date.monthsGen": ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"],
    "date.monthsShort": ["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "des"],
    "date.weekdays": ["Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"],
    "date.dayMonth": "{d}. {monthGen}",

    "time.hm": "{h} t {m} min",
    "time.m": "{m} min",

    "plural.days": ["dag", "dager"],
    "plural.books": ["bok", "bøker"]
};
