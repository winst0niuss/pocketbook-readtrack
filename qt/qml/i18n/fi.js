.pragma library

/* Finnish catalog. Two plural forms. */

function plural(n) {
    return n === 1 ? 0 : 1;
}

var strings = {
    "app.title": "Tilastot",

    "nav.overview": "Yleiskuva",
    "nav.streak": "Putki",
    "nav.calendar": "Kalenteri",
    "nav.year": "Vuosi",

    "overview.progress": "Edistyminen: {percent} %",
    "overview.read": "Luettu: {time}",
    "overview.left": "Jäljellä n. {time}",
    "overview.noBook": "Yhtään kirjaa ei ole vielä avattu",
    "overview.today": "Luettu tänään",
    "overview.minPerSession": "min per lukukerta",
    "overview.pagesPerMinute": "sivua minuutissa",
    "overview.allBooks": "KAIKKI KIRJAT",
    "overview.donutCaption": "kirjoistasi luettu loppuun",
    "overview.booksFinished": "Loppuun luetut kirjat",
    "overview.totalHours": "Tunteja yhteensä",

    "streak.current": "{days} nykyistä putkea",
    "streak.best": "{days} paras putki {year}",
    "streak.readingDays": "{n} {daysCaps} LUKEMISTA VUONNA {year}",
    "streak.none": "Ei vielä lukuputkea — tänään on hyvä päivä aloittaa.",
    "streak.longest": "Pisin putkesi alkoi {when} ja kesti {n} {days}.",
    "streak.trackingSince": "Lukutietoja on kerätty {date} alkaen.",
    "streak.legendNotRead": "ei lukemista",
    "streak.legendRead": "lukemista",
    "streak.legendFinished": "kirja luettu",

    "calendar.dayTitle": "{date}  ·  {time}",
    "calendar.finished": "Luettu loppuun",

    "year.title": "Vuonna {year} loppuun luetut kirjat",
    "year.monthTitle": "{month} {year}  ·  {n} {books}",
    "book.finishedOn": "Luettu loppuun {date}",

    "about.version": "Versio {version}",
    "about.check": "Tarkista päivitys",
    "about.install": "Asenna {version}",
    "about.checking": "Kysytään GitHubilta uusinta julkaisua…",
    "about.uptodate": "Tämä on uusin versio.",
    "about.available": "Versio {version} on saatavilla.",
    "about.downloading": "Ladataan päivitystä…",
    "about.ready": "Päivitys ladattu. ReadTrack sulkeutuu ja käynnistyy itsestään uudelleen — jos ei, avaa se sovellusvalikosta.",
    "about.privacy": "Päivitys haetaan GitHubista wifin kautta, vain kun painat painiketta. Muulloin ReadTrack ei ota yhteyttä verkkoon.",
    "about.log": "Viimeisin yritys:",

    "update.errNoNetwork": "Ei yhteyttä. Kytke wifi päälle ja yritä uudelleen.",
    "update.errDownload": "Lataus epäonnistui.",
    "update.errResponse": "GitHub vastasi odottamattomasti.",
    "update.errNoAsset": "Uusin julkaisu ei sisällä asennettavaa tiedostoa.",
    "update.errUnsupported": "Tämä laiteohjelmisto ei osaa ladata päivitystä.",
    "update.errCorrupt": "Ladattu tiedosto on vioittunut — mitään ei muutettu.",
    "update.errHandover": "Sovellusta ei voitu vaihtaa. Uusi versio on täällä:",

    "date.months": ["Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"],
    "date.monthsGen": ["tammikuuta", "helmikuuta", "maaliskuuta", "huhtikuuta", "toukokuuta", "kesäkuuta", "heinäkuuta", "elokuuta", "syyskuuta", "lokakuuta", "marraskuuta", "joulukuuta"],
    "date.monthsShort": ["tammi", "helmi", "maalis", "huhti", "touko", "kesä", "heinä", "elo", "syys", "loka", "marras", "joulu"],
    "date.weekdays": ["Ma", "Ti", "Ke", "To", "Pe", "La", "Su"],
    "date.dayMonth": "{d}. {monthGen}",

    "time.hm": "{h} t {m} min",
    "time.m": "{m} min",

    "plural.days": ["päivä", "päivää"],
    "plural.books": ["kirja", "kirjaa"]
};
