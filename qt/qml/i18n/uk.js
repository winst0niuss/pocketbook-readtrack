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
    "nav.calendar": "Календар",

    "overview.left": "Залишилось бл. {time}",
    "overview.noBook": "Книгу ще не відкрито",
    "overview.bookProgress": "Прогрес книги: {percent} %",
    "overview.hoursOfReading": "годин читання",
    "overview.minPerSession": "хв за сеанс",
    "overview.allBooks": "УСІ КНИГИ",
    "overview.donutCaption": "книг на пристрої дочитано",
    "overview.booksFinished": "Книг прочитано",
    "overview.totalHours": "Годин усього",
    "overview.totalHoursEst": "Годин усього, з книжками до встановлення",
    "overview.pagesPerHour": "сторінок за годину",


    "calendar.dayTitle": "{date}  ·  {time}",
    "calendar.finished": "Дочитано",
    "calendar.trackingSince": "Дані про читання збираються з {date}.",
    "book.finishedOn": "Дочитано {date}",
    "calendar.monthSummary": "{n} {days} · {time}",


    "about.version": "Версія {version}",
    "about.check": "Перевірити оновлення",
    "about.install": "Встановити {version}",
    "about.checking": "Запитую GitHub про останній реліз…",
    "about.uptodate": "Встановлено останню версію.",
    "about.available": "Доступна версія {version}.",
    "about.downloading": "Завантажую оновлення…",
    "about.ready": "Оновлення завантажено. {app} закриється і запуститься сам — якщо цього не сталося, відкрийте його з меню програм.",
    "about.privacy": "Оновлення завантажується з GitHub через Wi-Fi і лише після натискання кнопки. В інший час {app} не виходить у мережу.",
    "about.shim": "Облік з моменту відкриття книги",
    "about.shimHint": "Відкриття EPUB, FB2 чи PDF запускає облік і передає книгу звичайній читалці. Без цього відкривайте застосунок після ввімкнення рідера.",
    "about.shimOn": "Увімкнути",
    "about.shimOff": "Вимкнути",
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
    "date.weekdays": ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"],
    "date.dayMonth": "{d} {monthGen}",

    "time.hm": "{h} год {m} хв",
    "time.m": "{m} хв",

    "plural.days": ["день", "дні", "днів"]
};
