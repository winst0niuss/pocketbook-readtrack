.pragma library

/* German catalog. See Tr.qml for how to add a language.
 * `plural(n)` returns the index into the "plural.*" form arrays. */

function plural(n) {
    return n === 1 ? 0 : 1;
}

var strings = {
    "app.title": "Statistik",

    "nav.overview": "Übersicht",
    "nav.streak": "Serie",
    "nav.calendar": "Kalender",
    "nav.year": "Jahr",

    "overview.progress": "Fortschritt: {percent} %",
    "overview.read": "Gelesen: {time}",
    "overview.left": "Noch ca. {time}",
    "overview.noBook": "Noch kein Buch geöffnet",
    "overview.today": "Gelesen heute",
    "overview.minPerSession": "Min pro Session",
    "overview.pagesPerMinute": "Seiten pro Minute",
    "overview.allBooks": "ALLE BÜCHER",
    "overview.donutCaption": "der Bücher auf dem Gerät",
    "overview.booksFinished": "Bücher beendet",
    "overview.totalHours": "Stunden gesamt",

    "streak.current": "Tage aktuelle Serie",
    "streak.best": "Tage beste Serie {year}",
    "streak.readingDays": "{n} LESETAGE IN {year}",
    "streak.none": "Noch keine Lese-Serie — heute ist ein guter Tag, um eine zu starten.",
    "streak.longest": "Deine längste Serie begann am {when} und hielt {n} {days}.",
    "streak.trackingSince": "Lesedaten werden seit dem {date} erfasst.",
    "streak.legendNotRead": "nicht gelesen",
    "streak.legendRead": "gelesen",
    "streak.legendFinished": "Buch beendet",

    "calendar.dayTitle": "{date}  ·  {time}",
    "calendar.finished": "Beendet",

    "year.title": "Bücher beendet in {year}",
    "year.monthTitle": "{month} {year}  ·  {n} {books}",
    "book.finishedOn": "Beendet am {date}",

    "about.version": "Version {version}",
    "about.check": "Nach Update suchen",
    "about.install": "{version} installieren",
    "about.checking": "Frage GitHub nach dem neuesten Release\u2026",
    "about.uptodate": "Dies ist das neueste Release.",
    "about.available": "Version {version} ist verfügbar.",
    "about.downloading": "Update wird geladen\u2026",
    "about.ready": "Update geladen. ReadTrack schließt sich und startet von selbst neu \u2014 falls nicht, über das Menü öffnen.",
    "about.privacy": "Das Update kommt per WLAN von GitHub, und nur auf Knopfdruck. Sonst geht ReadTrack nie online.",

    "about.log": "Letzter Versuch:",

    "update.errNoNetwork": "Keine Verbindung. WLAN einschalten und erneut versuchen.",
    "update.errDownload": "Download fehlgeschlagen.",
    "update.errResponse": "GitHub hat unerwartet geantwortet.",
    "update.errNoAsset": "Das neueste Release enthält keinen installierbaren Build.",
    "update.errUnsupported": "Diese Firmware bietet keinen Weg, das Update zu laden.",
    "update.errCorrupt": "Die geladene Datei ist beschädigt \u2014 es wurde nichts geändert.",
    "update.errHandover": "Die neue Version konnte nicht eingesetzt werden. Sie liegt hier:",

    "date.months": ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli",
                    "August", "September", "Oktober", "November", "Dezember"],
    "date.monthsGen": ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli",
                       "August", "September", "Oktober", "November", "Dezember"],
    "date.monthsShort": ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun",
                         "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
    "date.weekdays": ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
    "date.dayMonth": "{d}. {month}",

    "time.hm": "{h}h {m}m",
    "time.m": "{m} Min",

    "plural.days": ["Tag", "Tage"],
    "plural.books": ["Buch", "Bücher"]
};
