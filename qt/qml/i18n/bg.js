.pragma library

/* Bulgarian catalog. Two plural forms. */

function plural(n) {
    return n === 1 ? 0 : 1;
}

var strings = {
    "app.title": "Статистика",

    "nav.overview": "Преглед",
    "nav.calendar": "Календар",

    "overview.left": "Остават ок. {time}",
    "overview.noBook": "Още няма отворена книга",
    "overview.bookProgress": "Напредък: {percent} %",
    "overview.allBooks": "ВСИЧКИ КНИГИ",
    "overview.booksFinished": "Дочетени книги",
    "overview.totalHours": "Часа общо",
    "overview.pagesPerHour": "страници на час",


    "calendar.dayTitle": "{date}  ·  {time}",
    "calendar.finished": "Дочетена",
    "calendar.trackingSince": "Данните за четене се записват от {date}.",
    "book.finishedOn": "Дочетена на {date}",
    "calendar.monthSummary": "{n} {days} · {time}",


    "about.version": "Версия {version}",
    "about.check": "Проверка за обновление",
    "about.install": "Инсталиране на {version}",
    "about.checking": "Питам GitHub за последната версия…",
    "about.uptodate": "Това е последната версия.",
    "about.available": "Налична е версия {version}.",
    "about.downloading": "Изтеглям обновлението…",
    "about.ready": "Обновлението е изтеглено. {app} ще се затвори и ще се стартира сам — ако не стане, отворете го от менюто с приложения.",
    "about.log": "Последен опит:",

    "update.errNoNetwork": "Няма връзка. Включете Wi-Fi и опитайте отново.",
    "update.errDownload": "Изтеглянето не успя.",
    "update.errResponse": "GitHub отговори неочаквано.",
    "update.errNoAsset": "Последната версия няма готов файл за инсталиране.",
    "update.errUnsupported": "Този фърмуер не позволява изтегляне на обновлението.",
    "update.errCorrupt": "Изтегленият файл е повреден — нищо не е променено.",
    "update.errHandover": "Приложението не можа да бъде заменено. Новата версия е тук:",

    "date.months": ["Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"],
    "date.monthsGen": ["януари", "февруари", "март", "април", "май", "юни", "юли", "август", "септември", "октомври", "ноември", "декември"],
    "date.weekdays": ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"],
    "date.dayMonth": "{d} {monthGen}",

    "time.hm": "{h} ч {m} мин",
    "time.m": "{m} мин",

    "plural.days": ["ден", "дни"]
};
