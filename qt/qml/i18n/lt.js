.pragma library

/* Lithuanian catalog. Three plural forms: 1 knyga, 2 knygos, 10 knygų. */

function plural(n) {
    var m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && (m100 < 11 || m100 > 19))
        return 0;
    if (m10 >= 2 && m10 <= 9 && (m100 < 11 || m100 > 19))
        return 1;
    return 2;
}

var strings = {
    "app.title": "Statistika",

    "nav.overview": "Apžvalga",
    "nav.streak": "Serija",
    "nav.calendar": "Kalendorius",
    "nav.year": "Metai",

    "overview.progress": "Progresas: {percent} %",
    "overview.read": "Perskaityta: {time}",
    "overview.left": "Liko apie {time}",
    "overview.noBook": "Dar neatverstos jokios knygos",
    "overview.today": "Perskaityta šiandien",
    "overview.minPerSession": "min per seansą",
    "overview.pagesPerMinute": "puslapių per minutę",
    "overview.allBooks": "VISOS KNYGOS",
    "overview.donutCaption": "jūsų knygų perskaityta",
    "overview.booksFinished": "Perskaitytos knygos",
    "overview.totalHours": "Iš viso valandų",

    "streak.current": "{days} dabartinė serija",
    "streak.best": "{days} geriausia serija {year}",
    "streak.readingDays": "{n} SKAITYMO {daysCaps} {year} METAIS",
    "streak.none": "Skaitymo serijos dar nėra — šiandien gera diena ją pradėti.",
    "streak.longest": "Ilgiausia jūsų serija prasidėjo {when} ir truko {n} {days}.",
    "streak.trackingSince": "Skaitymo duomenys renkami nuo {date}.",
    "streak.legendNotRead": "neskaityta",
    "streak.legendRead": "skaityta",
    "streak.legendFinished": "knyga perskaityta",

    "calendar.dayTitle": "{date}  ·  {time}",
    "calendar.finished": "Perskaityta",

    "year.title": "{year} m. perskaitytos knygos",
    "year.monthTitle": "{month} {year}  ·  {n} {books}",
    "book.finishedOn": "Perskaityta {date}",

    "about.version": "Versija {version}",
    "about.check": "Tikrinti atnaujinimą",
    "about.install": "Įdiegti {version}",
    "about.checking": "Klausiu GitHub apie naujausią laidą…",
    "about.uptodate": "Tai naujausia versija.",
    "about.available": "Galima versija {version}.",
    "about.downloading": "Atsiunčiu atnaujinimą…",
    "about.ready": "Atnaujinimas atsiųstas. ReadTrack užsidarys ir pats pasileis iš naujo — jei ne, atverkite jį iš programų meniu.",
    "about.privacy": "Atnaujinimas parsiunčiamas iš GitHub per Wi-Fi ir tik paspaudus mygtuką. Kitu metu ReadTrack į tinklą neina.",
    "about.log": "Paskutinis bandymas:",

    "update.errNoNetwork": "Nėra ryšio. Įjunkite Wi-Fi ir bandykite dar kartą.",
    "update.errDownload": "Atsiuntimas nepavyko.",
    "update.errResponse": "GitHub atsakė netikėtai.",
    "update.errNoAsset": "Naujausioje laidoje nėra įdiegiamos rinkmenos.",
    "update.errUnsupported": "Ši aparatinė programinė įranga negali atsiųsti atnaujinimo.",
    "update.errCorrupt": "Atsiųsta rinkmena sugadinta — niekas nepakeista.",
    "update.errHandover": "Programos pakeisti nepavyko. Nauja versija yra čia:",

    "date.months": ["Sausis", "Vasaris", "Kovas", "Balandis", "Gegužė", "Birželis", "Liepa", "Rugpjūtis", "Rugsėjis", "Spalis", "Lapkritis", "Gruodis"],
    "date.monthsGen": ["sausio", "vasario", "kovo", "balandžio", "gegužės", "birželio", "liepos", "rugpjūčio", "rugsėjo", "spalio", "lapkričio", "gruodžio"],
    "date.monthsShort": ["saus", "vas", "kov", "bal", "geg", "birž", "liep", "rugp", "rugs", "spal", "lapkr", "gruod"],
    "date.weekdays": ["Pr", "An", "Tr", "Kt", "Pn", "Št", "Sk"],
    "date.dayMonth": "{monthGen} {d} d.",

    "time.hm": "{h} val {m} min",
    "time.m": "{m} min",

    "plural.days": ["diena", "dienos", "dienų"],
    "plural.books": ["knyga", "knygos", "knygų"]
};
