.pragma library

/* Romanian catalog. Three plural forms: 1 carte, 2 cărți, 20 de cărți. */

function plural(n) {
    var m100 = n % 100;
    if (n === 1)
        return 0;
    if (n === 0 || (m100 >= 1 && m100 <= 19))
        return 1;
    return 2;
}

var strings = {
    "app.title": "Statistici",

    "nav.overview": "Prezentare",
    "nav.calendar": "Calendar",

    "overview.left": "Au rămas cca {time}",
    "overview.noBook": "Nicio carte deschisă încă",
    "overview.bookProgress": "Progres carte: {percent} %",
    "overview.hoursOfReading": "ore de citit",
    "overview.minPerSession": "min pe sesiune",
    "overview.allBooks": "TOATE CĂRȚILE",
    "overview.donutCaption": "din cărțile de pe dispozitiv",
    "overview.booksFinished": "Cărți terminate",
    "overview.totalHours": "Ore în total",
    "overview.pagesPerHour": "pagini pe oră",


    "calendar.dayTitle": "{date}  ·  {time}",
    "calendar.finished": "Terminată",
    "calendar.trackingSince": "Datele de lectură sunt înregistrate din {date}.",
    "book.finishedOn": "Terminată pe {date}",
    "calendar.monthSummary": "{n} {days} · {time}",


    "about.version": "Versiunea {version}",
    "about.check": "Caută actualizare",
    "about.install": "Instalează {version}",
    "about.checking": "Întreb GitHub de ultima versiune…",
    "about.uptodate": "Aceasta este cea mai nouă versiune.",
    "about.available": "Versiunea {version} este disponibilă.",
    "about.downloading": "Descarc actualizarea…",
    "about.ready": "Actualizare descărcată. {app} se închide și pornește singur din nou — dacă nu, deschide-l din meniul de aplicații.",
    "about.privacy": "Actualizarea este adusă de pe GitHub prin Wi-Fi, doar când apeși butonul. În rest, {app} nu se conectează la rețea.",
    "about.log": "Ultima încercare:",

    "update.errNoNetwork": "Fără conexiune. Pornește Wi-Fi și încearcă din nou.",
    "update.errDownload": "Descărcarea a eșuat.",
    "update.errResponse": "GitHub a răspuns neașteptat.",
    "update.errNoAsset": "Ultima versiune nu conține un fișier instalabil.",
    "update.errUnsupported": "Acest firmware nu poate descărca actualizarea.",
    "update.errCorrupt": "Fișierul descărcat este deteriorat — nu s-a schimbat nimic.",
    "update.errHandover": "Aplicația nu a putut fi înlocuită. Noua versiune se află aici:",

    "date.months": ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"],
    "date.monthsGen": ["ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie"],
    "date.weekdays": ["Lun", "Mar", "Mie", "Joi", "Vin", "Sâm", "Dum"],
    "date.dayMonth": "{d} {monthGen}",

    "time.hm": "{h} h {m} min",
    "time.m": "{m} min",

    "plural.days": ["zi", "zile", "de zile"]
};
