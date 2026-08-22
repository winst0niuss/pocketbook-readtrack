.pragma library

/* Italian catalog. Two plural forms. */

function plural(n) {
    return n === 1 ? 0 : 1;
}

var strings = {
    "app.title": "Statistiche",

    "nav.overview": "Panoramica",
    "nav.streak": "Serie",
    "nav.calendar": "Calendario",
    "nav.year": "Anno",

    "overview.progress": "Avanzamento: {percent} %",
    "overview.read": "Letto: {time}",
    "overview.left": "Restano circa {time}",
    "overview.noBook": "Nessun libro ancora aperto",
    "overview.today": "Letto oggi",
    "overview.minPerSession": "min per sessione",
    "overview.pagesPerMinute": "pagine al minuto",
    "overview.allBooks": "TUTTI I LIBRI",
    "overview.donutCaption": "dei tuoi libri finiti",
    "overview.booksFinished": "Libri finiti",
    "overview.totalHours": "Ore in totale",

    "streak.current": "{days} di serie attuale",
    "streak.best": "{days} di serie migliore {year}",
    "streak.readingDays": "{n} {daysCaps} DI LETTURA NEL {year}",
    "streak.none": "Ancora nessuna serie di lettura — oggi è un buon giorno per iniziarla.",
    "streak.longest": "La tua serie più lunga è iniziata il {when} ed è durata {n} {days}.",
    "streak.trackingSince": "I dati di lettura sono registrati dal {date}.",
    "streak.legendNotRead": "nessuna lettura",
    "streak.legendRead": "lettura",
    "streak.legendFinished": "libro finito",

    "calendar.dayTitle": "{date}  ·  {time}",
    "calendar.finished": "Finito",

    "year.title": "Libri finiti nel {year}",
    "year.monthTitle": "{month} {year}  ·  {n} {books}",
    "book.finishedOn": "Finito il {date}",

    "about.version": "Versione {version}",
    "about.check": "Cerca aggiornamento",
    "about.install": "Installa {version}",
    "about.checking": "Chiedo a GitHub l'ultima versione…",
    "about.uptodate": "Questa è l'ultima versione.",
    "about.available": "È disponibile la versione {version}.",
    "about.downloading": "Scarico l'aggiornamento…",
    "about.ready": "Aggiornamento scaricato. ReadTrack si chiude e si riapre da solo — se non succede, aprilo dal menu delle applicazioni.",
    "about.privacy": "L'aggiornamento viene scaricato da GitHub via Wi-Fi, e solo quando premi il pulsante. Per il resto ReadTrack non si collega.",
    "about.log": "Ultimo tentativo:",

    "update.errNoNetwork": "Nessuna connessione. Attiva il Wi-Fi e riprova.",
    "update.errDownload": "Download non riuscito.",
    "update.errResponse": "GitHub ha risposto in modo inatteso.",
    "update.errNoAsset": "L'ultima versione non contiene un binario installabile.",
    "update.errUnsupported": "Questo firmware non offre modo di scaricare l'aggiornamento.",
    "update.errCorrupt": "Il file scaricato è danneggiato — non è stato cambiato nulla.",
    "update.errHandover": "Non è stato possibile sostituire l'applicazione. La nuova versione si trova qui:",

    "date.months": ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
    "date.monthsGen": ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"],
    "date.monthsShort": ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"],
    "date.weekdays": ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"],
    "date.dayMonth": "{d} {monthGen}",

    "time.hm": "{h} h {m} min",
    "time.m": "{m} min",

    "plural.days": ["giorno", "giorni"],
    "plural.books": ["libro", "libri"]
};
