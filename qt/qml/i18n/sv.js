.pragma library

/* Swedish catalog. Two plural forms. */

function plural(n) {
    return n === 1 ? 0 : 1;
}

var strings = {
    "app.title": "Statistik",

    "nav.overview": "Översikt",
    "nav.streak": "Svit",
    "nav.calendar": "Kalender",
    "nav.year": "År",

    "overview.progress": "Framsteg: {percent} %",
    "overview.read": "Läst: {time}",
    "overview.left": "Ca {time} kvar",
    "overview.noBook": "Ingen bok öppnad ännu",
    "overview.today": "Läst i dag",
    "overview.minPerSession": "min per pass",
    "overview.pagesPerMinute": "sidor per minut",
    "overview.allBooks": "ALLA BÖCKER",
    "overview.donutCaption": "av böckerna på enheten",
    "overview.booksFinished": "Utlästa böcker",
    "overview.totalHours": "Timmar totalt",

    "streak.current": "{days} nuvarande svit",
    "streak.best": "{days} bästa svit {year}",
    "streak.readingDays": "{n} {daysCaps} MED LÄSNING {year}",
    "streak.none": "Ingen lässvit ännu — i dag är en bra dag att börja en.",
    "streak.longest": "Din längsta svit började {when} och varade {n} {days}.",
    "streak.trackingSince": "Läsdata har registrerats sedan {date}.",
    "streak.legendNotRead": "ingen läsning",
    "streak.legendRead": "läsning",
    "streak.legendFinished": "bok utläst",

    "calendar.dayTitle": "{date}  ·  {time}",
    "calendar.finished": "Utläst",

    "year.title": "Böcker utlästa {year}",
    "year.monthTitle": "{month} {year}  ·  {n} {books}",
    "book.finishedOn": "Utläst {date}",

    "about.version": "Version {version}",
    "about.check": "Sök efter uppdatering",
    "about.install": "Installera {version}",
    "about.checking": "Frågar GitHub efter senaste versionen…",
    "about.uptodate": "Detta är den senaste versionen.",
    "about.available": "Version {version} finns tillgänglig.",
    "about.downloading": "Hämtar uppdateringen…",
    "about.ready": "Uppdateringen är hämtad. ReadTrack stängs och startar om av sig själv — annars öppnar du den från menyn.",
    "about.privacy": "Uppdateringen hämtas från GitHub över wifi, och bara när du trycker på knappen. I övrigt går ReadTrack aldrig ut på nätet.",
    "about.log": "Senaste försöket:",

    "update.errNoNetwork": "Ingen anslutning. Slå på wifi och försök igen.",
    "update.errDownload": "Hämtningen misslyckades.",
    "update.errResponse": "GitHub svarade oväntat.",
    "update.errNoAsset": "Den senaste versionen innehåller ingen installerbar fil.",
    "update.errUnsupported": "Den här firmwaren kan inte hämta uppdateringen.",
    "update.errCorrupt": "Den hämtade filen är skadad — inget har ändrats.",
    "update.errHandover": "Det gick inte att byta ut appen. Den nya versionen finns här:",

    "date.months": ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"],
    "date.monthsGen": ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"],
    "date.monthsShort": ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec"],
    "date.weekdays": ["Mån", "Tis", "Ons", "Tor", "Fre", "Lör", "Sön"],
    "date.dayMonth": "{d} {monthGen}",

    "time.hm": "{h} tim {m} min",
    "time.m": "{m} min",

    "plural.days": ["dag", "dagar"],
    "plural.books": ["bok", "böcker"]
};
