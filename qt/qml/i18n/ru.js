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
    "app.title": "Статистика",

    "nav.overview": "Обзор",
    "nav.calendar": "Календарь",

    "overview.left": "Осталось около {time}",
    "overview.noBook": "Книга ещё не открыта",
    "overview.bookProgress": "Прогресс книги: {percent} %",
    "overview.hoursOfReading": "часов чтения",
    "overview.minPerSession": "мин за сессию",
    "overview.allBooks": "ВСЕ КНИГИ",
    "overview.donutCaption": "книг на устройстве прочитано",
    "overview.booksFinished": "Книг прочитано",
    "overview.totalHours": "Часов всего",
    "overview.pagesPerHour": "страниц в час",


    "calendar.dayTitle": "{date}  ·  {time}",
    "calendar.finished": "Дочитано",
    "calendar.trackingSince": "Данные о чтении собираются с {date}.",
    "book.finishedOn": "Дочитано {date}",
    "calendar.monthSummary": "{n} {days} · {time}",


    "about.version": "Версия {version}",
    "about.check": "Проверить обновление",
    "about.install": "Установить {version}",
    "about.checking": "Спрашиваю GitHub о последнем релизе\u2026",
    "about.uptodate": "Установлена последняя версия.",
    "about.available": "Доступна версия {version}.",
    "about.downloading": "Загружаю обновление\u2026",
    "about.ready": "Обновление загружено. {app} закроется и запустится сам — если этого не произошло, откройте его из меню приложений.",
    "about.privacy": "Обновление скачивается с GitHub по Wi-Fi и только по нажатию кнопки. В остальное время {app} в сеть не выходит.",

    "about.shim": "Учёт с момента открытия книги",
    "about.shimHint": "Открытие EPUB, FB2 или PDF запускает учёт и передаёт книгу обычной читалке. Без этого открывайте приложение после включения ридера.",
    "about.shimOn": "Включить",
    "about.shimOff": "Выключить",
    "about.log": "Последняя попытка:",

    "update.errNoNetwork": "Нет соединения. Включите Wi-Fi и повторите.",
    "update.errDownload": "Не удалось загрузить.",
    "update.errResponse": "GitHub ответил неожиданно.",
    "update.errNoAsset": "В последнем релизе нет готовой сборки.",
    "update.errUnsupported": "Прошивка не даёт способа загрузить обновление.",
    "update.errCorrupt": "Загруженный файл повреждён — ничего не изменено.",
    "update.errHandover": "Не удалось подменить приложение. Новая версия лежит здесь:",

    "date.months": ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль",
                    "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    "date.monthsGen": ["января", "февраля", "марта", "апреля", "мая", "июня", "июля",
                       "августа", "сентября", "октября", "ноября", "декабря"],
    "date.weekdays": ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    "date.dayMonth": "{d} {monthGen}",

    "time.hm": "{h} ч {m} мин",
    "time.m": "{m} мин",

    "plural.days": ["день", "дня", "дней"]
};
