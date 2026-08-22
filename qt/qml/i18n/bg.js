.pragma library

/* Bulgarian catalog. Two plural forms. */

function plural(n) {
    return n === 1 ? 0 : 1;
}

var strings = {
    "app.title": "Статистика",

    "nav.overview": "Преглед",
    "nav.streak": "Серия",
    "nav.calendar": "Календар",
    "nav.year": "Година",

    "overview.progress": "Напредък: {percent} %",
    "overview.read": "Прочетено: {time}",
    "overview.left": "Остават ок. {time}",
    "overview.noBook": "Още няма отворена книга",
    "overview.today": "Прочетено днес",
    "overview.minPerSession": "мин на сесия",
    "overview.pagesPerMinute": "страници в минута",
    "overview.allBooks": "ВСИЧКИ КНИГИ",
    "overview.donutCaption": "от книгите ви дочетени",
    "overview.booksFinished": "Дочетени книги",
    "overview.totalHours": "Часа общо",

    "streak.current": "{days} текуща серия",
    "streak.best": "{days} най-добра серия {year}",
    "streak.readingDays": "{n} {daysCaps} С ЧЕТЕНЕ ПРЕЗ {year}",
    "streak.none": "Още няма серия на четене — днес е добър ден да я започнете.",
    "streak.longest": "Най-дългата ви серия започна на {when} и продължи {n} {days}.",
    "streak.trackingSince": "Данните за четене се записват от {date}.",
    "streak.legendNotRead": "без четене",
    "streak.legendRead": "четене",
    "streak.legendFinished": "дочетена книга",

    "calendar.dayTitle": "{date}  ·  {time}",
    "calendar.finished": "Дочетена",

    "year.title": "Книги, дочетени през {year}",
    "year.monthTitle": "{month} {year}  ·  {n} {books}",
    "book.finishedOn": "Дочетена на {date}",

    "about.version": "Версия {version}",
    "about.check": "Проверка за обновление",
    "about.install": "Инсталиране на {version}",
    "about.checking": "Питам GitHub за последната версия…",
    "about.uptodate": "Това е последната версия.",
    "about.available": "Налична е версия {version}.",
    "about.downloading": "Изтеглям обновлението…",
    "about.ready": "Обновлението е изтеглено. ReadTrack ще се затвори и ще се стартира сам — ако не стане, отворете го от менюто с приложения.",
    "about.privacy": "Обновлението се изтегля от GitHub през Wi-Fi и само когато натиснете бутона. Иначе ReadTrack не излиза в мрежата.",
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
    "date.monthsShort": ["яну", "фев", "мар", "апр", "май", "юни", "юли", "авг", "сеп", "окт", "ное", "дек"],
    "date.weekdays": ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"],
    "date.dayMonth": "{d} {monthGen}",

    "time.hm": "{h} ч {m} мин",
    "time.m": "{m} мин",

    "plural.days": ["ден", "дни"],
    "plural.books": ["книга", "книги"]
};
