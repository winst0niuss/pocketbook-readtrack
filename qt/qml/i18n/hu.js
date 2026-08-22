.pragma library

/* Hungarian catalog. Two plural forms; the noun stays singular after a number. */

function plural(n) {
    return n === 1 ? 0 : 1;
}

var strings = {
    "app.title": "Statisztika",

    "nav.overview": "Áttekintés",
    "nav.calendar": "Naptár",

    "overview.left": "Kb. {time} van hátra",
    "overview.noBook": "Még nincs megnyitott könyv",
    "overview.bookProgress": "Könyv haladás: {percent} %",
    "overview.allBooks": "MINDEN KÖNYV",
    "overview.booksFinished": "Kiolvasott könyvek",
    "overview.totalHours": "Óra összesen",
    "overview.pagesPerHour": "oldal óránként",


    "calendar.dayTitle": "{date}  ·  {time}",
    "calendar.finished": "Kiolvasva",
    "calendar.trackingSince": "Az olvasási adatok {date} óta készülnek.",
    "book.finishedOn": "Kiolvasva: {date}",
    "calendar.monthSummary": "{n} {days} · {time}",


    "about.version": "{version} verzió",
    "about.check": "Frissítés keresése",
    "about.install": "{version} telepítése",
    "about.checking": "A GitHub legfrissebb kiadását kérdezem…",
    "about.uptodate": "Ez a legfrissebb verzió.",
    "about.available": "Elérhető a(z) {version} verzió.",
    "about.downloading": "Frissítés letöltése…",
    "about.ready": "A frissítés letöltve. A {app} bezárul, és magától újraindul — ha mégsem, nyisd meg az alkalmazások közül.",
    "about.log": "Utolsó próbálkozás:",

    "update.errNoNetwork": "Nincs kapcsolat. Kapcsold be a Wi-Fit, és próbáld újra.",
    "update.errDownload": "A letöltés nem sikerült.",
    "update.errResponse": "A GitHub váratlan választ adott.",
    "update.errNoAsset": "A legfrissebb kiadás nem tartalmaz telepíthető állományt.",
    "update.errUnsupported": "Ez a firmware nem tud frissítést letölteni.",
    "update.errCorrupt": "A letöltött fájl sérült — semmi sem változott.",
    "update.errHandover": "Az alkalmazást nem sikerült lecserélni. Az új verzió itt van:",

    "date.months": ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"],
    "date.monthsGen": ["január", "február", "március", "április", "május", "június", "július", "augusztus", "szeptember", "október", "november", "december"],
    "date.weekdays": ["H", "K", "Sze", "Cs", "P", "Szo", "V"],
    "date.dayMonth": "{monthGen} {d}.",

    "time.hm": "{h} ó {m} p",
    "time.m": "{m} perc",

    "plural.days": ["nap", "nap"]
};
