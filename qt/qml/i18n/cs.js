.pragma library

/* Czech catalog. Three plural forms: 1 kniha, 2 knihy, 5 knih. */

function plural(n) {
    if (n === 1)
        return 0;
    if (n >= 2 && n <= 4)
        return 1;
    return 2;
}

var strings = {
    "app.title": "Statistika",

    "nav.overview": "Přehled",
    "nav.streak": "Série",
    "nav.calendar": "Kalendář",
    "nav.year": "Rok",

    "overview.progress": "Postup: {percent} %",
    "overview.read": "Přečteno: {time}",
    "overview.left": "Zbývá asi {time}",
    "overview.noBook": "Zatím nebyla otevřena kniha",
    "overview.today": "Přečteno dnes",
    "overview.minPerSession": "min na čtení",
    "overview.pagesPerMinute": "stran za minutu",
    "overview.allBooks": "VŠECHNY KNIHY",
    "overview.donutCaption": "vašich knih dočteno",
    "overview.booksFinished": "Dočtené knihy",
    "overview.totalHours": "Hodin celkem",

    "streak.current": "{days} současné série",
    "streak.best": "{days} nejlepší série {year}",
    "streak.readingDays": "{n} {daysCaps} ČTENÍ V ROCE {year}",
    "streak.none": "Zatím žádná série čtení — dnešek je dobrý den ji začít.",
    "streak.longest": "Vaše nejdelší série začala {when} a trvala {n} {days}.",
    "streak.trackingSince": "Údaje o čtení se zaznamenávají od {date}.",
    "streak.legendNotRead": "bez čtení",
    "streak.legendRead": "čtení",
    "streak.legendFinished": "kniha dočtena",

    "calendar.dayTitle": "{date}  ·  {time}",
    "calendar.finished": "Dočteno",

    "year.title": "Knihy dočtené v roce {year}",
    "year.monthTitle": "{month} {year}  ·  {n} {books}",
    "book.finishedOn": "Dočteno {date}",

    "about.version": "Verze {version}",
    "about.check": "Zkontrolovat aktualizaci",
    "about.install": "Nainstalovat {version}",
    "about.checking": "Ptám se GitHubu na nejnovější vydání…",
    "about.uptodate": "Toto je nejnovější verze.",
    "about.available": "K dispozici je verze {version}.",
    "about.downloading": "Stahuji aktualizaci…",
    "about.ready": "Aktualizace stažena. ReadTrack se zavře a sám spustí znovu — pokud ne, otevřete jej z nabídky aplikací.",
    "about.privacy": "Aktualizace se stahuje z GitHubu přes Wi-Fi, a to jen po stisku tlačítka. Jindy se ReadTrack k síti nepřipojuje.",
    "about.log": "Poslední pokus:",

    "update.errNoNetwork": "Bez připojení. Zapněte Wi-Fi a zkuste to znovu.",
    "update.errDownload": "Stažení se nezdařilo.",
    "update.errResponse": "GitHub odpověděl neočekávaně.",
    "update.errNoAsset": "Nejnovější vydání neobsahuje hotové sestavení.",
    "update.errUnsupported": "Tento firmware neumožňuje aktualizaci stáhnout.",
    "update.errCorrupt": "Stažený soubor je poškozený — nic se nezměnilo.",
    "update.errHandover": "Aplikaci se nepodařilo vyměnit. Nová verze je zde:",

    "date.months": ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"],
    "date.monthsGen": ["ledna", "února", "března", "dubna", "května", "června", "července", "srpna", "září", "října", "listopadu", "prosince"],
    "date.monthsShort": ["led", "úno", "bře", "dub", "kvě", "čvn", "čvc", "srp", "zář", "říj", "lis", "pro"],
    "date.weekdays": ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"],
    "date.dayMonth": "{d}. {monthGen}",

    "time.hm": "{h} h {m} min",
    "time.m": "{m} min",

    "plural.days": ["den", "dny", "dní"],
    "plural.books": ["kniha", "knihy", "knih"]
};
