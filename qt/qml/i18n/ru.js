.pragma library

/* Russian catalog. Three plural forms: 1 книга, 2 книги, 5 книг. */

function plural(n) {
    var mod10 = n % 10;
    var mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11)
        return 0;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14))
        return 1;
    return 2;
}

var strings = {
    "nav.overview": "Обзор",
    "nav.streak": "Серия",
    "nav.calendar": "Календарь",
    "nav.year": "Год",

    "overview.progress": "Прогресс: {percent} %",
    "overview.read": "Прочитано: {time}",
    "overview.left": "Осталось ок. {time}",
    "overview.noBook": "Книга ещё не открыта",
    "overview.today": "Прочитано сегодня",
    "overview.minPerSession": "мин за сессию",
    "overview.pagesPerMinute": "страниц в минуту",
    "overview.allBooks": "ВСЕ КНИГИ",
    "overview.donutCaption": "ваших книг прочитано",
    "overview.booksFinished": "Книг прочитано",
    "overview.totalHours": "Часов всего",

    "streak.current": "{days} текущей серии",
    "streak.best": "{days} лучшей серии {year}",
    "streak.readingDays": "{n} {daysCaps} ЧТЕНИЯ В {year}",
    "streak.none": "Серии чтения пока нет — сегодня хороший день, чтобы её начать.",
    "streak.longest": "Ваша самая длинная серия началась {when} и длилась {n} {days}.",
    "streak.trackingSince": "Данные о чтении собираются с {date}.",
    "streak.legendNotRead": "нет чтения",
    "streak.legendRead": "есть чтение",
    "streak.legendFinished": "книга дочитана",

    "calendar.dayTitle": "{date}  ·  {time}",

    "year.title": "Книг прочитано за {year}",
    "year.monthTitle": "{month} {year}  ·  {n} {books}",

    "date.months": ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль",
                    "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    "date.monthsGen": ["января", "февраля", "марта", "апреля", "мая", "июня", "июля",
                       "августа", "сентября", "октября", "ноября", "декабря"],
    "date.monthsShort": ["янв", "фев", "мар", "апр", "май", "июн",
                         "июл", "авг", "сен", "окт", "ноя", "дек"],
    "date.weekdays": ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    "date.dayMonth": "{d} {monthGen}",

    "time.hm": "{h} ч {m} мин",
    "time.m": "{m} мин",

    "plural.days": ["день", "дня", "дней"],
    "plural.books": ["книга", "книги", "книг"]
};
