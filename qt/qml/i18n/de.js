.pragma library

/* German catalog. See Tr.qml for how to add a language.
 * `plural(n)` returns the index into the "plural.*" form arrays. */

function plural(n) {
    return n === 1 ? 0 : 1;
}

var strings = {
    "app.title": "Statistik",

    "nav.overview": "Übersicht",
    "nav.calendar": "Kalender",

    "overview.left": "Noch ca. {time}",
    "overview.noBook": "Noch kein Buch geöffnet",
    "overview.bookProgress": "Fortschritt: {percent} %",
    "overview.hoursOfReading": "Stunden gelesen",
    "overview.minPerSession": "Min pro Session",
    "overview.allBooks": "ALLE BÜCHER",
    "overview.donutCaption": "der Bücher auf dem Gerät",
    "overview.booksFinished": "Bücher beendet",
    "overview.totalHours": "Stunden gesamt",
    "overview.pagesPerHour": "Seiten pro Stunde",


    "calendar.dayTitle": "{date}  ·  {time}",
    "calendar.finished": "Beendet",
    "calendar.trackingSince": "Lesedaten werden seit dem {date} erfasst.",
    "book.finishedOn": "Beendet am {date}",
    "calendar.monthSummary": "{n} {days} · {time}",


    "about.version": "Version {version}",
    "about.check": "Nach Update suchen",
    "about.install": "{version} installieren",
    "about.checking": "Frage GitHub nach dem neuesten Release\u2026",
    "about.uptodate": "Dies ist das neueste Release.",
    "about.available": "Version {version} ist verfügbar.",
    "about.downloading": "Update wird geladen\u2026",
    "about.ready": "Update geladen. {app} schließt sich und startet von selbst neu \u2014 falls nicht, über das Menü öffnen.",
    "about.privacy": "Das Update kommt per WLAN von GitHub, und nur auf Knopfdruck. Sonst geht {app} nie online.",

    "about.shim": "Zählen, sobald ein Buch geöffnet wird",
    "about.shimHint": "Ein EPUB, FB2 oder PDF zu öffnen startet die Zählung und übergibt das Buch dem gewohnten Reader. Ohne dies die App nach dem Einschalten einmal öffnen.",
    "about.shimOn": "Einschalten",
    "about.shimOff": "Ausschalten",
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
    "date.weekdays": ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
    "date.dayMonth": "{d}. {month}",

    "time.hm": "{h}h {m}m",
    "time.m": "{m} Min",

    "plural.days": ["Tag", "Tage"]
};
