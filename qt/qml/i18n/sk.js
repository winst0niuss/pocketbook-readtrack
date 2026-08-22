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
    "nav.streak": "Séria",
    "nav.calendar": "Kalendár",
    "nav.year": "Rok",

    "overview.progress": "Postup: {percent} %",
    "overview.read": "Prečítané: {time}",
    "overview.left": "Zostáva asi {time}",
    "overview.noBook": "Zatiaľ nebola otvorená kniha",
    "overview.today": "Prečítané dnes",
    "overview.minPerSession": "min na čítanie",
    "overview.pagesPerMinute": "strán za minútu",
    "overview.allBooks": "VŠETKY KNIHY",
    "overview.donutCaption": "vašich kníh dočítaných",
    "overview.booksFinished": "Dočítané knihy",
    "overview.totalHours": "Hodín celkovo",

    "streak.current": "{days} súčasnej série",
    "streak.best": "{days} najlepšej série {year}",
    "streak.readingDays": "{n} {daysCaps} ČÍTANIA V ROKU {year}",
    "streak.none": "Zatiaľ žiadna séria čítania — dnešok je dobrý deň ju začať.",
    "streak.longest": "Vaša najdlhšia séria sa začala {when} a trvala {n} {days}.",
    "streak.trackingSince": "Údaje o čítaní sa zaznamenávajú od {date}.",
    "streak.legendNotRead": "bez čítania",
    "streak.legendRead": "čítanie",
    "streak.legendFinished": "kniha dočítaná",

    "calendar.dayTitle": "{date}  ·  {time}",
    "calendar.finished": "Dočítané",

    "year.title": "Knihy dočítané v roku {year}",
    "year.monthTitle": "{month} {year}  ·  {n} {books}",
    "book.finishedOn": "Dočítané {date}",

    "about.version": "Verzia {version}",
    "about.check": "Skontrolovať aktualizáciu",
    "about.install": "Nainštalovať {version}",
    "about.checking": "Pýtam sa GitHubu na najnovšie vydanie…",
    "about.uptodate": "Toto je najnovšia verzia.",
    "about.available": "K dispozícii je verzia {version}.",
    "about.downloading": "Sťahujem aktualizáciu…",
    "about.ready": "Aktualizácia stiahnutá. ReadTrack sa zavrie a sám spustí znova — ak nie, otvorte ho z ponuky aplikácií.",
    "about.privacy": "Aktualizácia sa sťahuje z GitHubu cez Wi-Fi, a to len po stlačení tlačidla. Inokedy sa ReadTrack k sieti nepripája.",
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
    "plural.books": ["kniha", "knihy", "kníh"]
};
