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
    "nav.calendar": "Koledar",
    "nav.about": "Info",

    "overview.left": "Ostalo pribl. {time}",
    "overview.noBook": "Nobena knjiga še ni odprta",
    "overview.bookProgress": "Napredek knjige: {percent} %",
    "overview.hoursOfReading": "ur branja",
    "overview.minPerSession": "min na branje",
    "overview.allBooks": "VSE KNJIGE",
    "overview.donutCaption": "knjig v napravi",
    "overview.booksFinished": "Prebrane knjige",
    "overview.totalHours": "Ur skupaj",
    "overview.pagesPerHour": "strani na uro",


    "calendar.dayTitle": "{date}  ·  {time}",
    "calendar.finished": "Prebrana",
    "calendar.trackingSince": "Podatki o branju se beležijo od {date}.",
    "book.finishedOn": "Prebrana {date}",
    "calendar.monthSummary": "{n} {days} · {time}",


    "about.version": "Različica {version}",
    "about.check": "Preveri posodobitev",
    "about.install": "Namesti {version}",
    "about.checking": "Sprašujem GitHub po zadnji izdaji…",
    "about.uptodate": "To je najnovejša različica.",
    "about.available": "Na voljo je različica {version}.",
    "about.downloading": "Prenašam posodobitev…",
    "about.ready": "Posodobitev je prenesena. {app} se bo zaprl in sam znova zagnal — če se ne, ga odprite iz menija aplikacij.",
    "about.privacy": "Posodobitev se prenese z GitHuba prek Wi-Fi, in le ko pritisnete gumb. Sicer {app} ne gre v omrežje.",
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
    "plural.books": ["knjiga", "knjigi", "knjige", "knjig"],
    "plural.pages": ["stran", "strani", "strani", "strani"]
};
