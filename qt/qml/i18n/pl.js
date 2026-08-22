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
    "nav.streak": "Seria",
    "nav.calendar": "Kalendarz",
    "nav.year": "Rok",

    "overview.progress": "Postęp: {percent} %",
    "overview.read": "Przeczytano: {time}",
    "overview.left": "Zostało ok. {time}",
    "overview.noBook": "Nie otwarto jeszcze książki",
    "overview.today": "Przeczytane dziś",
    "overview.minPerSession": "min na sesję",
    "overview.pagesPerMinute": "stron na minutę",
    "overview.allBooks": "WSZYSTKIE KSIĄŻKI",
    "overview.donutCaption": "twoich książek przeczytanych",
    "overview.booksFinished": "Przeczytane książki",
    "overview.totalHours": "Godzin łącznie",

    "streak.current": "{days} obecnej serii",
    "streak.best": "{days} najlepszej serii {year}",
    "streak.readingDays": "{n} {daysCaps} CZYTANIA W {year}",
    "streak.none": "Nie ma jeszcze serii czytania — dziś jest dobry dzień, aby ją zacząć.",
    "streak.longest": "Twoja najdłuższa seria zaczęła się {when} i trwała {n} {days}.",
    "streak.trackingSince": "Dane o czytaniu są zapisywane od {date}.",
    "streak.legendNotRead": "brak czytania",
    "streak.legendRead": "czytanie",
    "streak.legendFinished": "książka przeczytana",

    "calendar.dayTitle": "{date}  ·  {time}",
    "calendar.finished": "Przeczytana",

    "year.title": "Książki przeczytane w {year}",
    "year.monthTitle": "{month} {year}  ·  {n} {books}",
    "book.finishedOn": "Przeczytana {date}",

    "about.version": "Wersja {version}",
    "about.check": "Sprawdź aktualizację",
    "about.install": "Zainstaluj {version}",
    "about.checking": "Pytam GitHub o najnowsze wydanie…",
    "about.uptodate": "To jest najnowsza wersja.",
    "about.available": "Dostępna jest wersja {version}.",
    "about.downloading": "Pobieram aktualizację…",
    "about.ready": "Aktualizacja pobrana. ReadTrack zamknie się i uruchomi ponownie sam — jeśli nie, otwórz go z menu aplikacji.",
    "about.privacy": "Aktualizacja jest pobierana z GitHub przez Wi-Fi, wyłącznie po naciśnięciu przycisku. Poza tym ReadTrack nie łączy się z siecią.",
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
    "plural.books": ["książka", "książki", "książek"]
};
