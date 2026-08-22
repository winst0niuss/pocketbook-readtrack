.pragma library

/* Turkish catalog. One noun form; the array holds it twice. */

function plural(n) {
    return n === 1 ? 0 : 1;
}

var strings = {
    "app.title": "İstatistikler",

    "nav.overview": "Genel bakış",
    "nav.streak": "Seri",
    "nav.calendar": "Takvim",
    "nav.year": "Yıl",

    "overview.progress": "İlerleme: %{percent}",
    "overview.read": "Okunan: {time}",
    "overview.left": "Yaklaşık {time} kaldı",
    "overview.noBook": "Henüz kitap açılmadı",
    "overview.today": "Bugün okunan",
    "overview.minPerSession": "oturum başına dk",
    "overview.pagesPerMinute": "dakikada sayfa",
    "overview.allBooks": "TÜM KİTAPLAR",
    "overview.donutCaption": "cihazdaki kitapların",
    "overview.booksFinished": "Bitirilen kitaplar",
    "overview.totalHours": "Toplam saat",

    "streak.current": "{days} güncel seri",
    "streak.best": "{days} en iyi seri {year}",
    "streak.readingDays": "{year} YILINDA {n} {daysCaps} OKUMA",
    "streak.none": "Henüz okuma serisi yok — bugün başlamak için iyi bir gün.",
    "streak.longest": "En uzun seriniz {when} başladı ve {n} {days} sürdü.",
    "streak.trackingSince": "Okuma verileri {date} tarihinden beri kaydediliyor.",
    "streak.legendNotRead": "okuma yok",
    "streak.legendRead": "okuma",
    "streak.legendFinished": "kitap bitti",

    "calendar.dayTitle": "{date}  ·  {time}",
    "calendar.finished": "Bitirildi",

    "year.title": "{year} yılında bitirilen kitaplar",
    "year.monthTitle": "{month} {year}  ·  {n} {books}",
    "book.finishedOn": "{date} tarihinde bitirildi",

    "about.version": "Sürüm {version}",
    "about.check": "Güncelleme denetle",
    "about.install": "{version} sürümünü kur",
    "about.checking": "GitHub'a son sürüm soruluyor…",
    "about.uptodate": "Bu en son sürüm.",
    "about.available": "{version} sürümü mevcut.",
    "about.downloading": "Güncelleme indiriliyor…",
    "about.ready": "Güncelleme indirildi. ReadTrack kapanıp kendi kendine açılır — açılmazsa uygulamalar menüsünden başlatın.",
    "about.privacy": "Güncelleme yalnızca düğmeye bastığınızda Wi-Fi üzerinden GitHub'dan indirilir. Başka zaman ReadTrack ağa çıkmaz.",
    "about.log": "Son deneme:",

    "update.errNoNetwork": "Bağlantı yok. Wi-Fi'yi açıp yeniden deneyin.",
    "update.errDownload": "İndirme başarısız oldu.",
    "update.errResponse": "GitHub beklenmedik bir yanıt verdi.",
    "update.errNoAsset": "Son sürümde kurulabilir dosya yok.",
    "update.errUnsupported": "Bu ürün yazılımı güncellemeyi indiremiyor.",
    "update.errCorrupt": "İndirilen dosya bozuk — hiçbir şey değiştirilmedi.",
    "update.errHandover": "Uygulama değiştirilemedi. Yeni sürüm burada:",

    "date.months": ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
    "date.monthsGen": ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
    "date.monthsShort": ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"],
    "date.weekdays": ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"],
    "date.dayMonth": "{d} {monthGen}",

    "time.hm": "{h} sa {m} dk",
    "time.m": "{m} dk",

    "plural.days": ["gün", "gün"],
    "plural.books": ["kitap", "kitap"]
};
