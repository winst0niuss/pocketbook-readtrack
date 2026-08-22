.pragma library

/* Dutch catalog. Two plural forms. */

function plural(n) {
    return n === 1 ? 0 : 1;
}

var strings = {
    "app.title": "Statistieken",

    "nav.overview": "Overzicht",
    "nav.streak": "Reeks",
    "nav.calendar": "Kalender",
    "nav.year": "Jaar",

    "overview.progress": "Voortgang: {percent} %",
    "overview.read": "Gelezen: {time}",
    "overview.left": "Nog ong. {time}",
    "overview.noBook": "Nog geen boek geopend",
    "overview.today": "Vandaag gelezen",
    "overview.minPerSession": "min per sessie",
    "overview.pagesPerMinute": "pagina's per minuut",
    "overview.allBooks": "ALLE BOEKEN",
    "overview.donutCaption": "van je boeken uitgelezen",
    "overview.booksFinished": "Boeken uitgelezen",
    "overview.totalHours": "Uren totaal",

    "streak.current": "{days} huidige reeks",
    "streak.best": "{days} beste reeks {year}",
    "streak.readingDays": "{n} {daysCaps} GELEZEN IN {year}",
    "streak.none": "Nog geen leesreeks — vandaag is een goede dag om er een te beginnen.",
    "streak.longest": "Je langste reeks begon op {when} en duurde {n} {days}.",
    "streak.trackingSince": "Leesgegevens worden vastgelegd sinds {date}.",
    "streak.legendNotRead": "niet gelezen",
    "streak.legendRead": "gelezen",
    "streak.legendFinished": "boek uit",

    "calendar.dayTitle": "{date}  ·  {time}",
    "calendar.finished": "Uitgelezen",

    "year.title": "Boeken uitgelezen in {year}",
    "year.monthTitle": "{month} {year}  ·  {n} {books}",
    "book.finishedOn": "Uitgelezen op {date}",

    "about.version": "Versie {version}",
    "about.check": "Controleren op update",
    "about.install": "{version} installeren",
    "about.checking": "GitHub om de nieuwste release vragen…",
    "about.uptodate": "Dit is de nieuwste versie.",
    "about.available": "Versie {version} is beschikbaar.",
    "about.downloading": "Update downloaden…",
    "about.ready": "Update gedownload. ReadTrack sluit en start vanzelf opnieuw — zo niet, open het dan via het menu.",
    "about.privacy": "De update komt via wifi van GitHub, en alleen als je op de knop drukt. Verder gaat ReadTrack nooit online.",
    "about.log": "Laatste poging:",

    "update.errNoNetwork": "Geen verbinding. Zet wifi aan en probeer opnieuw.",
    "update.errDownload": "Downloaden mislukt.",
    "update.errResponse": "GitHub gaf een onverwacht antwoord.",
    "update.errNoAsset": "De nieuwste release bevat geen installeerbare build.",
    "update.errUnsupported": "Deze firmware biedt geen manier om de update te downloaden.",
    "update.errCorrupt": "Het gedownloade bestand is beschadigd — er is niets gewijzigd.",
    "update.errHandover": "De nieuwe versie kon niet worden geplaatst. Ze staat hier:",

    "date.months": ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"],
    "date.monthsGen": ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
    "date.monthsShort": ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"],
    "date.weekdays": ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"],
    "date.dayMonth": "{d} {monthGen}",

    "time.hm": "{h} u {m} min",
    "time.m": "{m} min",

    "plural.days": ["dag", "dagen"],
    "plural.books": ["boek", "boeken"]
};
