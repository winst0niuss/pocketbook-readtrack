.pragma library

/* Slovenian catalog. Four plural forms: 1 knjiga, 2 knjigi, 3 knjige, 5 knjig. */

function plural(n) {
    var m100 = n % 100;
    if (m100 === 1)
        return 0;
    if (m100 === 2)
        return 1;
    if (m100 === 3 || m100 === 4)
        return 2;
    return 3;
}

var strings = {
    "app.title": "Statistika",

    "nav.overview": "Pregled",
    "nav.streak": "Niz",
    "nav.calendar": "Koledar",
    "nav.year": "Leto",

    "overview.progress": "Napredek: {percent} %",
    "overview.read": "Prebrano: {time}",
    "overview.left": "Ostalo pribl. {time}",
    "overview.noBook": "Nobena knjiga še ni odprta",
    "overview.today": "Prebrano danes",
    "overview.minPerSession": "min na branje",
    "overview.pagesPerMinute": "strani na minuto",
    "overview.allBooks": "VSE KNJIGE",
    "overview.donutCaption": "vaših knjig prebranih",
    "overview.booksFinished": "Prebrane knjige",
    "overview.totalHours": "Ur skupaj",

    "streak.current": "{days} trenutnega niza",
    "streak.best": "{days} najboljšega niza {year}",
    "streak.readingDays": "{n} {daysCaps} BRANJA V LETU {year}",
    "streak.none": "Niza branja še ni — danes je dober dan, da ga začnete.",
    "streak.longest": "Vaš najdaljši niz se je začel {when} in trajal {n} {days}.",
    "streak.trackingSince": "Podatki o branju se beležijo od {date}.",
    "streak.legendNotRead": "brez branja",
    "streak.legendRead": "branje",
    "streak.legendFinished": "knjiga prebrana",

    "calendar.dayTitle": "{date}  ·  {time}",
    "calendar.finished": "Prebrana",

    "year.title": "Knjige, prebrane v letu {year}",
    "year.monthTitle": "{month} {year}  ·  {n} {books}",
    "book.finishedOn": "Prebrana {date}",

    "about.version": "Različica {version}",
    "about.check": "Preveri posodobitev",
    "about.install": "Namesti {version}",
    "about.checking": "Sprašujem GitHub po zadnji izdaji…",
    "about.uptodate": "To je najnovejša različica.",
    "about.available": "Na voljo je različica {version}.",
    "about.downloading": "Prenašam posodobitev…",
    "about.ready": "Posodobitev je prenesena. ReadTrack se bo zaprl in sam znova zagnal — če se ne, ga odprite iz menija aplikacij.",
    "about.privacy": "Posodobitev se prenese z GitHuba prek Wi-Fi, in le ko pritisnete gumb. Sicer ReadTrack ne gre v omrežje.",
    "about.log": "Zadnji poskus:",

    "update.errNoNetwork": "Ni povezave. Vklopite Wi-Fi in poskusite znova.",
    "update.errDownload": "Prenos ni uspel.",
    "update.errResponse": "GitHub je odgovoril nepričakovano.",
    "update.errNoAsset": "Zadnja izdaja nima namestitvene datoteke.",
    "update.errUnsupported": "Ta strojna programska oprema ne more prenesti posodobitve.",
    "update.errCorrupt": "Prenesena datoteka je poškodovana — nič ni bilo spremenjeno.",
    "update.errHandover": "Aplikacije ni bilo mogoče zamenjati. Nova različica je tukaj:",

    "date.months": ["Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"],
    "date.monthsGen": ["januarja", "februarja", "marca", "aprila", "maja", "junija", "julija", "avgusta", "septembra", "oktobra", "novembra", "decembra"],
    "date.monthsShort": ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "avg", "sep", "okt", "nov", "dec"],
    "date.weekdays": ["Pon", "Tor", "Sre", "Čet", "Pet", "Sob", "Ned"],
    "date.dayMonth": "{d}. {monthGen}",

    "time.hm": "{h} h {m} min",
    "time.m": "{m} min",

    "plural.days": ["dan", "dneva", "dnevi", "dni"],
    "plural.books": ["knjiga", "knjigi", "knjige", "knjig"]
};
