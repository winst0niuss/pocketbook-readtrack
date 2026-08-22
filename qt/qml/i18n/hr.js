.pragma library

/* Croatian catalog. Three plural forms: 1 knjiga, 2 knjige, 5 knjiga. */

function plural(n) {
    var m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11)
        return 0;
    if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14))
        return 1;
    return 2;
}

var strings = {
    "app.title": "Statistika",

    "nav.overview": "Pregled",
    "nav.calendar": "Kalendar",
    "nav.about": "Info",

    "overview.left": "Preostalo oko {time}",
    "overview.noBook": "Nijedna knjiga još nije otvorena",
    "overview.bookProgress": "Napredak knjige: {percent} %",
    "overview.hoursOfReading": "sati čitanja",
    "overview.minPerSession": "min po sesiji",
    "overview.allBooks": "SVE KNJIGE",
    "overview.donutCaption": "knjiga na uređaju",
    "overview.booksFinished": "Pročitane knjige",
    "overview.totalHours": "Sati ukupno",
    "overview.pagesPerHour": "stranica na sat",


    "calendar.dayTitle": "{date}  ·  {time}",
    "calendar.finished": "Pročitana",
    "calendar.trackingSince": "Podaci o čitanju bilježe se od {date}.",
    "book.finishedOn": "Pročitana {date}",
    "calendar.monthSummary": "{n} {days} · {time}",


    "about.version": "Verzija {version}",
    "about.check": "Provjeri ažuriranje",
    "about.install": "Instaliraj {version}",
    "about.checking": "Pitam GitHub za najnovije izdanje…",
    "about.uptodate": "Ovo je najnovija verzija.",
    "about.available": "Dostupna je verzija {version}.",
    "about.downloading": "Preuzimam ažuriranje…",
    "about.ready": "Ažuriranje je preuzeto. {app} će se zatvoriti i sam ponovno pokrenuti — ako ne, otvorite ga iz izbornika aplikacija.",
    "about.privacy": "Ažuriranje se preuzima s GitHuba preko Wi-Fija, i samo kad pritisnete gumb. Inače {app} ne izlazi na mrežu.",
    "about.log": "Posljednji pokušaj:",

    "update.errNoNetwork": "Nema veze. Uključite Wi-Fi i pokušajte ponovno.",
    "update.errDownload": "Preuzimanje nije uspjelo.",
    "update.errResponse": "GitHub je odgovorio neočekivano.",
    "update.errNoAsset": "Najnovije izdanje nema datoteku za instalaciju.",
    "update.errUnsupported": "Ovaj firmver ne može preuzeti ažuriranje.",
    "update.errCorrupt": "Preuzeta datoteka je oštećena — ništa nije promijenjeno.",
    "update.errHandover": "Aplikaciju nije bilo moguće zamijeniti. Nova verzija je ovdje:",

    "date.months": ["Siječanj", "Veljača", "Ožujak", "Travanj", "Svibanj", "Lipanj", "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac"],
    "date.monthsGen": ["siječnja", "veljače", "ožujka", "travnja", "svibnja", "lipnja", "srpnja", "kolovoza", "rujna", "listopada", "studenoga", "prosinca"],
    "date.monthsShort": ["sij", "velj", "ožu", "tra", "svi", "lip", "srp", "kol", "ruj", "lis", "stu", "pro"],
    "date.weekdays": ["Pon", "Uto", "Sri", "Čet", "Pet", "Sub", "Ned"],
    "date.dayMonth": "{d}. {monthGen}",

    "time.hm": "{h} h {m} min",
    "time.m": "{m} min",

    "plural.days": ["dan", "dana", "dana"],
    "plural.books": ["knjiga", "knjige", "knjiga"],
    "plural.pages": ["stranica", "stranice", "stranica"]
};
