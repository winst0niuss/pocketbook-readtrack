.pragma library

/* Polish catalog. Three plural forms: 1 książka, 2 książki, 5 książek. */

function plural(n) {
    var m10 = n % 10, m100 = n % 100;
    if (n === 1)
        return 0;
    if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14))
        return 1;
    return 2;
}

var strings = {
    "app.title": "Statystyki",

    "nav.overview": "Przegląd",
    "nav.calendar": "Kalendarz",
    "nav.about": "Info",

    "overview.left": "Zostało ok. {time}",
    "overview.noBook": "Nie otwarto jeszcze książki",
    "overview.bookProgress": "Postęp książki: {percent} %",
    "overview.hoursOfReading": "godzin czytania",
    "overview.minPerSession": "min na sesję",
    "overview.allBooks": "WSZYSTKIE KSIĄŻKI",
    "overview.donutCaption": "książek na urządzeniu",
    "overview.booksFinished": "Przeczytane książki",
    "overview.totalHours": "Godzin łącznie",
    "overview.pagesPerHour": "stron na godzinę",


    "calendar.dayTitle": "{date}  ·  {time}",
    "calendar.finished": "Przeczytana",
    "calendar.trackingSince": "Dane o czytaniu są zapisywane od {date}.",
    "book.finishedOn": "Przeczytana {date}",
    "calendar.monthSummary": "{n} {days} · {time}",


    "about.version": "Wersja {version}",
    "about.check": "Sprawdź aktualizację",
    "about.install": "Zainstaluj {version}",
    "about.checking": "Pytam GitHub o najnowsze wydanie…",
    "about.uptodate": "To jest najnowsza wersja.",
    "about.available": "Dostępna jest wersja {version}.",
    "about.downloading": "Pobieram aktualizację…",
    "about.ready": "Aktualizacja pobrana. {app} zamknie się i uruchomi ponownie sam — jeśli nie, otwórz go z menu aplikacji.",
    "about.privacy": "Aktualizacja jest pobierana z GitHub przez Wi-Fi, wyłącznie po naciśnięciu przycisku. Poza tym {app} nie łączy się z siecią.",
    "about.log": "Ostatnia próba:",

    "update.errNoNetwork": "Brak połączenia. Włącz Wi-Fi i spróbuj ponownie.",
    "update.errDownload": "Pobieranie nie powiodło się.",
    "update.errResponse": "GitHub odpowiedział nieoczekiwanie.",
    "update.errNoAsset": "Najnowsze wydanie nie zawiera gotowej wersji.",
    "update.errUnsupported": "To oprogramowanie nie pozwala pobrać aktualizacji.",
    "update.errCorrupt": "Pobrany plik jest uszkodzony — nic nie zmieniono.",
    "update.errHandover": "Nie udało się podmienić aplikacji. Nowa wersja jest tutaj:",

    "date.months": ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],
    "date.monthsGen": ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia"],
    "date.monthsShort": ["sty", "lut", "mar", "kwi", "maj", "cze", "lip", "sie", "wrz", "paź", "lis", "gru"],
    "date.weekdays": ["Pon", "Wto", "Śro", "Czw", "Pią", "Sob", "Nie"],
    "date.dayMonth": "{d} {monthGen}",

    "time.hm": "{h} godz {m} min",
    "time.m": "{m} min",

    "plural.days": ["dzień", "dni", "dni"],
    "plural.books": ["książka", "książki", "książek"],
    "plural.pages": ["strona", "strony", "stron"]
};
