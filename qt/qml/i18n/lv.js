.pragma library

/* Latvian catalog. Three plural forms, the third for zero. */

function plural(n) {
    if (n % 10 === 1 && n % 100 !== 11)
        return 0;
    if (n !== 0)
        return 1;
    return 2;
}

var strings = {
    "app.title": "Statistika",

    "nav.overview": "Pārskats",
    "nav.streak": "Sērija",
    "nav.calendar": "Kalendārs",
    "nav.year": "Gads",

    "overview.progress": "Progress: {percent} %",
    "overview.read": "Izlasīts: {time}",
    "overview.left": "Atlicis apm. {time}",
    "overview.noBook": "Neviena grāmata vēl nav atvērta",
    "overview.today": "Šodien izlasīts",
    "overview.minPerSession": "min uz sesiju",
    "overview.pagesPerMinute": "lappuses minūtē",
    "overview.allBooks": "VISAS GRĀMATAS",
    "overview.donutCaption": "jūsu grāmatu izlasītas",
    "overview.booksFinished": "Izlasītās grāmatas",
    "overview.totalHours": "Stundas kopā",

    "streak.current": "{days} pašreizējā sērijā",
    "streak.best": "{days} labākajā sērijā {year}",
    "streak.readingDays": "{n} LASĪŠANAS {daysCaps} {year}. GADĀ",
    "streak.none": "Lasīšanas sērijas vēl nav — šodien ir laba diena to sākt.",
    "streak.longest": "Jūsu garākā sērija sākās {when} un ilga {n} {days}.",
    "streak.trackingSince": "Lasīšanas dati tiek uzkrāti kopš {date}.",
    "streak.legendNotRead": "nav lasīts",
    "streak.legendRead": "lasīts",
    "streak.legendFinished": "grāmata izlasīta",

    "calendar.dayTitle": "{date}  ·  {time}",
    "calendar.finished": "Izlasīta",

    "year.title": "{year}. gadā izlasītās grāmatas",
    "year.monthTitle": "{month} {year}  ·  {n} {books}",
    "book.finishedOn": "Izlasīta {date}",

    "about.version": "Versija {version}",
    "about.check": "Meklēt atjauninājumu",
    "about.install": "Instalēt {version}",
    "about.checking": "Vaicāju GitHub par jaunāko laidienu…",
    "about.uptodate": "Šī ir jaunākā versija.",
    "about.available": "Pieejama versija {version}.",
    "about.downloading": "Lejupielādēju atjauninājumu…",
    "about.ready": "Atjauninājums lejupielādēts. ReadTrack aizvērsies un pats startēs no jauna — ja nē, atveriet to no lietotņu izvēlnes.",
    "about.privacy": "Atjauninājums tiek ielādēts no GitHub caur Wi-Fi un tikai tad, kad nospiežat pogu. Citkārt ReadTrack tīklā neiziet.",
    "about.log": "Pēdējais mēģinājums:",

    "update.errNoNetwork": "Nav savienojuma. Ieslēdziet Wi-Fi un mēģiniet vēlreiz.",
    "update.errDownload": "Lejupielāde neizdevās.",
    "update.errResponse": "GitHub atbildēja negaidīti.",
    "update.errNoAsset": "Jaunākajā laidienā nav instalējamas datnes.",
    "update.errUnsupported": "Šī programmaparatūra nevar lejupielādēt atjauninājumu.",
    "update.errCorrupt": "Lejupielādētā datne ir bojāta — nekas netika mainīts.",
    "update.errHandover": "Lietotni neizdevās nomainīt. Jaunā versija ir šeit:",

    "date.months": ["Janvāris", "Februāris", "Marts", "Aprīlis", "Maijs", "Jūnijs", "Jūlijs", "Augusts", "Septembris", "Oktobris", "Novembris", "Decembris"],
    "date.monthsGen": ["janvāra", "februāra", "marta", "aprīļa", "maija", "jūnija", "jūlija", "augusta", "septembra", "oktobra", "novembra", "decembra"],
    "date.monthsShort": ["jan", "feb", "mar", "apr", "mai", "jūn", "jūl", "aug", "sep", "okt", "nov", "dec"],
    "date.weekdays": ["Pr", "Ot", "Tr", "Ce", "Pk", "Se", "Sv"],
    "date.dayMonth": "{d}. {monthGen}",

    "time.hm": "{h} st {m} min",
    "time.m": "{m} min",

    "plural.days": ["diena", "dienas", "dienu"],
    "plural.books": ["grāmata", "grāmatas", "grāmatu"]
};
