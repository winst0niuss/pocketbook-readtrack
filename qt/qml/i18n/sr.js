.pragma library

/* Serbian catalog. Three plural forms: 1 књига, 2 књиге, 5 књига. */

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

    "nav.overview": "Преглед",
    "nav.streak": "Низ",
    "nav.calendar": "Календар",
    "nav.year": "Година",

    "overview.progress": "Напредак: {percent} %",
    "overview.read": "Прочитано: {time}",
    "overview.left": "Остало око {time}",
    "overview.noBook": "Још ниједна књига није отворена",
    "overview.today": "Прочитано данас",
    "overview.minPerSession": "мин по сесији",
    "overview.pagesPerMinute": "страна у минути",
    "overview.allBooks": "СВЕ КЊИГЕ",
    "overview.donutCaption": "књига на уређају",
    "overview.booksFinished": "Прочитане књиге",
    "overview.totalHours": "Сати укупно",

    "streak.current": "{days} тренутног низа",
    "streak.best": "{days} најбољег низа {year}",
    "streak.readingDays": "{n} {daysCaps} ЧИТАЊА {year}",
    "streak.none": "Још нема низа читања — данас је добар дан да га започнете.",
    "streak.longest": "Ваш најдужи низ почео је {when} и трајао {n} {days}.",
    "streak.trackingSince": "Подаци о читању бележе се од {date}.",
    "streak.legendNotRead": "без читања",
    "streak.legendRead": "читање",
    "streak.legendFinished": "књига прочитана",

    "calendar.dayTitle": "{date}  ·  {time}",
    "calendar.finished": "Прочитана",

    "year.title": "Књиге прочитане {year}",
    "year.monthTitle": "{month} {year}  ·  {n} {books}",
    "book.finishedOn": "Прочитана {date}",

    "about.version": "Верзија {version}",
    "about.check": "Провери ажурирање",
    "about.install": "Инсталирај {version}",
    "about.checking": "Питам GitHub за најновије издање…",
    "about.uptodate": "Ово је најновија верзија.",
    "about.available": "Доступна је верзија {version}.",
    "about.downloading": "Преузимам ажурирање…",
    "about.ready": "Ажурирање је преузето. ReadTrack ће се затворити и сам поново покренути — ако не, отворите га из менија апликација.",
    "about.privacy": "Ажурирање се преузима са GitHub-а преко Wi-Fi мреже, и само када притиснете дугме. Иначе ReadTrack не излази на мрежу.",
    "about.log": "Последњи покушај:",

    "update.errNoNetwork": "Нема везе. Укључите Wi-Fi и покушајте поново.",
    "update.errDownload": "Преузимање није успело.",
    "update.errResponse": "GitHub је одговорио неочекивано.",
    "update.errNoAsset": "Најновије издање нема датотеку за инсталирање.",
    "update.errUnsupported": "Овај фирмвер не може да преузме ажурирање.",
    "update.errCorrupt": "Преузета датотека је оштећена — ништа није промењено.",
    "update.errHandover": "Апликација није могла да се замени. Нова верзија је овде:",

    "date.months": ["Јануар", "Фебруар", "Март", "Април", "Мај", "Јун", "Јул", "Август", "Септембар", "Октобар", "Новембар", "Децембар"],
    "date.monthsGen": ["јануара", "фебруара", "марта", "априла", "маја", "јуна", "јула", "августа", "септембра", "октобра", "новембра", "децембра"],
    "date.monthsShort": ["јан", "феб", "мар", "апр", "мај", "јун", "јул", "авг", "сеп", "окт", "нов", "дец"],
    "date.weekdays": ["Пон", "Уто", "Сре", "Чет", "Пет", "Суб", "Нед"],
    "date.dayMonth": "{d}. {monthGen}",

    "time.hm": "{h} ч {m} мин",
    "time.m": "{m} мин",

    "plural.days": ["дан", "дана", "дана"],
    "plural.books": ["књига", "књиге", "књига"]
};
