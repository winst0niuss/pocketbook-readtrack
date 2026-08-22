.pragma library

/* Ukrainian catalog. Three plural forms: 1 книга, 2 книги, 5 книг. */

function plural(n) {
    var m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11)
        return 0;
    if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14))
        return 1;
    return 2;
}

var strings = {
    "app.title": "Статистика",

    "nav.overview": "Огляд",
    "nav.streak": "Серія",
    "nav.calendar": "Календар",
    "nav.year": "Рік",

    "overview.progress": "Прогрес: {percent} %",
    "overview.read": "Прочитано: {time}",
    "overview.left": "Залишилось бл. {time}",
    "overview.noBook": "Книгу ще не відкрито",
    "overview.today": "Прочитано сьогодні",
    "overview.minPerSession": "хв за сеанс",
    "overview.pagesPerMinute": "сторінок за хвилину",
    "overview.allBooks": "УСІ КНИГИ",
    "overview.donutCaption": "книг на пристрої дочитано",
    "overview.booksFinished": "Книг прочитано",
    "overview.totalHours": "Годин усього",

    "streak.current": "{days} поточної серії",
    "streak.best": "{days} найкращої серії {year}",
    "streak.readingDays": "{n} {daysCaps} ЧИТАННЯ У {year}",
    "streak.none": "Серії читання ще немає — сьогодні гарний день, щоб її почати.",
    "streak.longest": "Ваша найдовша серія почалася {when} і тривала {n} {days}.",
    "streak.trackingSince": "Дані про читання збираються з {date}.",
    "streak.legendNotRead": "немає читання",
    "streak.legendRead": "є читання",
    "streak.legendFinished": "книга дочитана",

    "calendar.dayTitle": "{date}  ·  {time}",
    "calendar.finished": "Дочитано",

    "year.title": "Книг прочитано за {year}",
    "year.monthTitle": "{month} {year}  ·  {n} {books}",
    "book.finishedOn": "Дочитано {date}",

    "about.version": "Версія {version}",
    "about.check": "Перевірити оновлення",
    "about.install": "Встановити {version}",
    "about.checking": "Запитую GitHub про останній реліз…",
    "about.uptodate": "Встановлено останню версію.",
    "about.available": "Доступна версія {version}.",
    "about.downloading": "Завантажую оновлення…",
    "about.ready": "Оновлення завантажено. ReadTrack закриється і запуститься сам — якщо цього не сталося, відкрийте його з меню програм.",
    "about.privacy": "Оновлення завантажується з GitHub через Wi-Fi і лише після натискання кнопки. В інший час ReadTrack не виходить у мережу.",
    "about.log": "Остання спроба:",

    "update.errNoNetwork": "Немає з'єднання. Увімкніть Wi-Fi і повторіть.",
    "update.errDownload": "Не вдалося завантажити.",
    "update.errResponse": "GitHub відповів неочікувано.",
    "update.errNoAsset": "В останньому релізі немає готової збірки.",
    "update.errUnsupported": "Ця прошивка не дає способу завантажити оновлення.",
    "update.errCorrupt": "Завантажений файл пошкоджено — нічого не змінено.",
    "update.errHandover": "Не вдалося замінити програму. Нова версія лежить тут:",

    "date.months": ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"],
    "date.monthsGen": ["січня", "лютого", "березня", "квітня", "травня", "червня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"],
    "date.monthsShort": ["січ", "лют", "бер", "кві", "тра", "чер", "лип", "сер", "вер", "жов", "лис", "гру"],
    "date.weekdays": ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"],
    "date.dayMonth": "{d} {monthGen}",

    "time.hm": "{h} год {m} хв",
    "time.m": "{m} хв",

    "plural.days": ["день", "дні", "днів"],
    "plural.books": ["книга", "книги", "книг"]
};
