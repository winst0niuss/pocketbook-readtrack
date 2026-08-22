.pragma library

/* Azerbaijani catalog. Two plural forms; the noun stays singular after a number. */

function plural(n) {
    return n === 1 ? 0 : 1;
}

var strings = {
    "app.title": "Statistika",

    "nav.overview": "İcmal",
    "nav.streak": "Seriya",
    "nav.calendar": "Təqvim",
    "nav.year": "İl",

    "overview.progress": "İrəliləyiş: {percent} %",
    "overview.read": "Oxunub: {time}",
    "overview.left": "Təxminən {time} qalıb",
    "overview.noBook": "Hələ heç bir kitab açılmayıb",
    "overview.today": "Bu gün oxunub",
    "overview.minPerSession": "seans başına dəq",
    "overview.pagesPerMinute": "dəqiqədə səhifə",
    "overview.allBooks": "BÜTÜN KİTABLAR",
    "overview.donutCaption": "kitabınız bitirilib",
    "overview.booksFinished": "Bitirilmiş kitablar",
    "overview.totalHours": "Ümumi saat",

    "streak.current": "{days} cari seriya",
    "streak.best": "{days} ən yaxşı seriya {year}",
    "streak.readingDays": "{year} İLİNDƏ {n} OXU {daysCaps}",
    "streak.none": "Hələ oxu seriyası yoxdur — bu gün ona başlamaq üçün yaxşı gündür.",
    "streak.longest": "Ən uzun seriyanız {when} başladı və {n} {days} davam etdi.",
    "streak.trackingSince": "Oxu məlumatları {date} tarixindən yazılır.",
    "streak.legendNotRead": "oxu yoxdur",
    "streak.legendRead": "oxu",
    "streak.legendFinished": "kitab bitirilib",

    "calendar.dayTitle": "{date}  ·  {time}",
    "calendar.finished": "Bitirilib",

    "year.title": "{year} ilində bitirilən kitablar",
    "year.monthTitle": "{month} {year}  ·  {n} {books}",
    "book.finishedOn": "{date} tarixində bitirilib",

    "about.version": "Versiya {version}",
    "about.check": "Yeniləməni yoxla",
    "about.install": "{version} quraşdır",
    "about.checking": "GitHub-dan son buraxılış soruşulur…",
    "about.uptodate": "Bu ən son versiyadır.",
    "about.available": "{version} versiyası mövcuddur.",
    "about.downloading": "Yeniləmə endirilir…",
    "about.ready": "Yeniləmə endirildi. ReadTrack bağlanıb özü yenidən açılacaq — açılmasa, onu proqramlar menyusundan başladın.",
    "about.privacy": "Yeniləmə yalnız düyməyə basdıqda Wi-Fi vasitəsilə GitHub-dan endirilir. Başqa vaxt ReadTrack şəbəkəyə çıxmır.",
    "about.log": "Son cəhd:",

    "update.errNoNetwork": "Bağlantı yoxdur. Wi-Fi-ı açıb yenidən cəhd edin.",
    "update.errDownload": "Endirmə alınmadı.",
    "update.errResponse": "GitHub gözlənilməz cavab verdi.",
    "update.errNoAsset": "Son buraxılışda quraşdırıla bilən fayl yoxdur.",
    "update.errUnsupported": "Bu proqram təminatı yeniləməni endirə bilmir.",
    "update.errCorrupt": "Endirilən fayl zədələnib — heç nə dəyişdirilmədi.",
    "update.errHandover": "Proqramı əvəz etmək mümkün olmadı. Yeni versiya buradadır:",

    "date.months": ["Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun", "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"],
    "date.monthsGen": ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avqust", "sentyabr", "oktyabr", "noyabr", "dekabr"],
    "date.monthsShort": ["yan", "fev", "mar", "apr", "may", "iyn", "iyl", "avq", "sen", "okt", "noy", "dek"],
    "date.weekdays": ["B.e", "Ç.a", "Çər", "C.a", "Cüm", "Şən", "Baz"],
    "date.dayMonth": "{d} {monthGen}",

    "time.hm": "{h} saat {m} dəq",
    "time.m": "{m} dəq",

    "plural.days": ["gün", "gün"],
    "plural.books": ["kitab", "kitab"]
};
