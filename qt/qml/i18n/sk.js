.pragma library

/* Slovak catalog. Three plural forms: 1 kniha, 2 knihy, 5 kníh. */

function plural(n) {
    if (n === 1)
        return 0;
    if (n >= 2 && n <= 4)
        return 1;
    return 2;
}

var strings = {
    "app.title": "Štatistika",

    "nav.overview": "Prehľad",
    "nav.calendar": "Kalendár",
    "nav.about": "Info",

    "overview.left": "Zostáva asi {time}",
    "overview.noBook": "Zatiaľ nebola otvorená kniha",
    "overview.bookProgress": "Postup knihy: {percent} %",
    "overview.hoursOfReading": "hodín čítania",
    "overview.minPerSession": "min na čítanie",
    "overview.allBooks": "VŠETKY KNIHY",
    "overview.donutCaption": "kníh v zariadení",
    "overview.booksFinished": "Dočítané knihy",
    "overview.totalHours": "Hodín celkovo",
    "overview.pagesPerHour": "strán za hodinu",


    "calendar.dayTitle": "{date}  ·  {time}",
    "calendar.finished": "Dočítané",
    "calendar.trackingSince": "Údaje o čítaní sa zaznamenávajú od {date}.",
    "book.finishedOn": "Dočítané {date}",
    "calendar.monthSummary": "{n} {days} · {time}",


    "about.version": "Verzia {version}",
    "about.check": "Skontrolovať aktualizáciu",
    "about.install": "Nainštalovať {version}",
    "about.checking": "Pýtam sa GitHubu na najnovšie vydanie…",
    "about.uptodate": "Toto je najnovšia verzia.",
    "about.available": "K dispozícii je verzia {version}.",
    "about.downloading": "Sťahujem aktualizáciu…",
    "about.ready": "Aktualizácia stiahnutá. {app} sa zavrie a sám spustí znova — ak nie, otvorte ho z ponuky aplikácií.",
    "about.privacy": "Aktualizácia sa sťahuje z GitHubu cez Wi-Fi, a to len po stlačení tlačidla. Inokedy sa {app} k sieti nepripája.",
    "about.log": "Posledný pokus:",

    "update.errNoNetwork": "Bez pripojenia. Zapnite Wi-Fi a skúste znova.",
    "update.errDownload": "Sťahovanie zlyhalo.",
    "update.errResponse": "GitHub odpovedal neočakávane.",
    "update.errNoAsset": "Najnovšie vydanie neobsahuje hotové zostavenie.",
    "update.errUnsupported": "Tento firmvér neumožňuje stiahnuť aktualizáciu.",
    "update.errCorrupt": "Stiahnutý súbor je poškodený — nič sa nezmenilo.",
    "update.errHandover": "Aplikáciu sa nepodarilo vymeniť. Nová verzia je tu:",

    "date.months": ["Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"],
    "date.monthsGen": ["januára", "februára", "marca", "apríla", "mája", "júna", "júla", "augusta", "septembra", "októbra", "novembra", "decembra"],
    "date.monthsShort": ["jan", "feb", "mar", "apr", "máj", "jún", "júl", "aug", "sep", "okt", "nov", "dec"],
    "date.weekdays": ["Po", "Ut", "St", "Št", "Pi", "So", "Ne"],
    "date.dayMonth": "{d}. {monthGen}",

    "time.hm": "{h} h {m} min",
    "time.m": "{m} min",

    "plural.days": ["deň", "dni", "dní"],
    "plural.books": ["kniha", "knihy", "kníh"],
    "plural.pages": ["strana", "strany", "strán"]
};
