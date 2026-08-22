.pragma library

/* Estonian catalog. Two plural forms. */

function plural(n) {
    return n === 1 ? 0 : 1;
}

var strings = {
    "app.title": "Statistika",

    "nav.overview": "Ülevaade",
    "nav.streak": "Seeria",
    "nav.calendar": "Kalender",
    "nav.year": "Aasta",

    "overview.progress": "Edenemine: {percent} %",
    "overview.read": "Loetud: {time}",
    "overview.left": "Jäänud u {time}",
    "overview.noBook": "Ühtegi raamatut pole veel avatud",
    "overview.today": "Täna loetud",
    "overview.minPerSession": "min lugemiskorra kohta",
    "overview.pagesPerMinute": "lehekülge minutis",
    "overview.allBooks": "KÕIK RAAMATUD",
    "overview.donutCaption": "sinu raamatutest loetud",
    "overview.booksFinished": "Läbi loetud raamatud",
    "overview.totalHours": "Tunde kokku",

    "streak.current": "{days} praegust seeriat",
    "streak.best": "{days} parim seeria {year}",
    "streak.readingDays": "{n} {daysCaps} LUGEMIST AASTAL {year}",
    "streak.none": "Lugemisseeriat veel pole — täna on hea päev see alustada.",
    "streak.longest": "Sinu pikim seeria algas {when} ja kestis {n} {days}.",
    "streak.trackingSince": "Lugemisandmeid on salvestatud alates {date}.",
    "streak.legendNotRead": "lugemata",
    "streak.legendRead": "loetud",
    "streak.legendFinished": "raamat läbi",

    "calendar.dayTitle": "{date}  ·  {time}",
    "calendar.finished": "Läbi loetud",

    "year.title": "Aastal {year} läbi loetud raamatud",
    "year.monthTitle": "{month} {year}  ·  {n} {books}",
    "book.finishedOn": "Läbi loetud {date}",

    "about.version": "Versioon {version}",
    "about.check": "Otsi uuendust",
    "about.install": "Paigalda {version}",
    "about.checking": "Küsin GitHubilt viimast väljalaset…",
    "about.uptodate": "See on kõige uuem versioon.",
    "about.available": "Saadaval on versioon {version}.",
    "about.downloading": "Laadin uuendust…",
    "about.ready": "Uuendus alla laaditud. ReadTrack sulgub ja käivitub ise uuesti — kui mitte, ava see rakenduste menüüst.",
    "about.privacy": "Uuendus tuuakse GitHubist üle WiFi ja ainult siis, kui vajutad nuppu. Muul ajal ReadTrack võrku ei lähe.",
    "about.log": "Viimane katse:",

    "update.errNoNetwork": "Ühendus puudub. Lülita WiFi sisse ja proovi uuesti.",
    "update.errDownload": "Allalaadimine ebaõnnestus.",
    "update.errResponse": "GitHub vastas ootamatult.",
    "update.errNoAsset": "Viimane väljalase ei sisalda paigaldatavat faili.",
    "update.errUnsupported": "See püsivara ei võimalda uuendust alla laadida.",
    "update.errCorrupt": "Allalaaditud fail on rikutud — midagi ei muudetud.",
    "update.errHandover": "Rakendust ei õnnestunud vahetada. Uus versioon on siin:",

    "date.months": ["Jaanuar", "Veebruar", "Märts", "Aprill", "Mai", "Juuni", "Juuli", "August", "September", "Oktoober", "November", "Detsember"],
    "date.monthsGen": ["jaanuar", "veebruar", "märts", "aprill", "mai", "juuni", "juuli", "august", "september", "oktoober", "november", "detsember"],
    "date.monthsShort": ["jaan", "veebr", "märts", "apr", "mai", "juuni", "juuli", "aug", "sept", "okt", "nov", "dets"],
    "date.weekdays": ["E", "T", "K", "N", "R", "L", "P"],
    "date.dayMonth": "{d}. {monthGen}",

    "time.hm": "{h} t {m} min",
    "time.m": "{m} min",

    "plural.days": ["päev", "päeva"],
    "plural.books": ["raamat", "raamatut"]
};
