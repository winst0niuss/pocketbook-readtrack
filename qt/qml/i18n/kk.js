.pragma library

/* Kazakh catalog. Two plural forms; the noun stays singular after a number. */

function plural(n) {
    return n === 1 ? 0 : 1;
}

var strings = {
    "app.title": "Статистика",

    "nav.overview": "Шолу",
    "nav.streak": "Серия",
    "nav.calendar": "Күнтізбе",
    "nav.year": "Жыл",

    "overview.progress": "Барысы: {percent} %",
    "overview.read": "Оқылды: {time}",
    "overview.left": "Шамамен {time} қалды",
    "overview.noBook": "Әзірге кітап ашылмаған",
    "overview.today": "Бүгін оқылды",
    "overview.minPerSession": "бір сеансқа мин",
    "overview.pagesPerMinute": "минутына бет",
    "overview.allBooks": "БАРЛЫҚ КІТАПТАР",
    "overview.donutCaption": "кітабыңыз оқып бітті",
    "overview.booksFinished": "Оқып бітірген кітаптар",
    "overview.totalHours": "Барлығы сағат",

    "streak.current": "{days} ағымдағы серия",
    "streak.best": "{days} үздік серия {year}",
    "streak.readingDays": "{year} ЖЫЛЫ {n} ОҚУ {daysCaps}",
    "streak.none": "Оқу сериясы әзірге жоқ — бүгін оны бастауға жақсы күн.",
    "streak.longest": "Ең ұзақ сериямыз {when} басталып, {n} {days} созылды.",
    "streak.trackingSince": "Оқу деректері {date} бастап жиналуда.",
    "streak.legendNotRead": "оқу жоқ",
    "streak.legendRead": "оқу",
    "streak.legendFinished": "кітап оқылды",

    "calendar.dayTitle": "{date}  ·  {time}",
    "calendar.finished": "Оқып бітті",

    "year.title": "{year} жылы оқып бітірген кітаптар",
    "year.monthTitle": "{month} {year}  ·  {n} {books}",
    "book.finishedOn": "{date} оқып бітті",

    "about.version": "Нұсқа {version}",
    "about.check": "Жаңартуды тексеру",
    "about.install": "{version} орнату",
    "about.checking": "GitHub-тан соңғы шығарылымды сұраудамын…",
    "about.uptodate": "Бұл ең соңғы нұсқа.",
    "about.available": "{version} нұсқасы қолжетімді.",
    "about.downloading": "Жаңарту жүктелуде…",
    "about.ready": "Жаңарту жүктелді. ReadTrack жабылып, өзі қайта іске қосылады — қосылмаса, оны қолданбалар мәзірінен ашыңыз.",
    "about.privacy": "Жаңарту Wi-Fi арқылы GitHub-тан және тек түймені басқанда жүктеледі. Басқа уақытта ReadTrack желіге шықпайды.",
    "about.log": "Соңғы әрекет:",

    "update.errNoNetwork": "Байланыс жоқ. Wi-Fi қосып, қайталап көріңіз.",
    "update.errDownload": "Жүктеу сәтсіз аяқталды.",
    "update.errResponse": "GitHub күтпеген жауап берді.",
    "update.errNoAsset": "Соңғы шығарылымда орнатылатын файл жоқ.",
    "update.errUnsupported": "Бұл микробағдарлама жаңартуды жүктей алмайды.",
    "update.errCorrupt": "Жүктелген файл бүлінген — ештеңе өзгертілген жоқ.",
    "update.errHandover": "Қолданбаны ауыстыру мүмкін болмады. Жаңа нұсқа мұнда:",

    "date.months": ["Қаңтар", "Ақпан", "Наурыз", "Сәуір", "Мамыр", "Маусым", "Шілде", "Тамыз", "Қыркүйек", "Қазан", "Қараша", "Желтоқсан"],
    "date.monthsGen": ["қаңтар", "ақпан", "наурыз", "сәуір", "мамыр", "маусым", "шілде", "тамыз", "қыркүйек", "қазан", "қараша", "желтоқсан"],
    "date.monthsShort": ["қаң", "ақп", "нау", "сәу", "мам", "мау", "шіл", "там", "қыр", "қаз", "қар", "жел"],
    "date.weekdays": ["Дс", "Сс", "Ср", "Бс", "Жм", "Сн", "Жс"],
    "date.dayMonth": "{d} {monthGen}",

    "time.hm": "{h} сағ {m} мин",
    "time.m": "{m} мин",

    "plural.days": ["күн", "күн"],
    "plural.books": ["кітап", "кітап"]
};
