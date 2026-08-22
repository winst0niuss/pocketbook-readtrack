.pragma library

/* Greek catalog. Two plural forms. */

function plural(n) {
    return n === 1 ? 0 : 1;
}

var strings = {
    "app.title": "Στατιστικά",

    "nav.overview": "Επισκόπηση",
    "nav.streak": "Σερί",
    "nav.calendar": "Ημερολόγιο",
    "nav.year": "Έτος",

    "overview.progress": "Πρόοδος: {percent} %",
    "overview.read": "Διαβάστηκε: {time}",
    "overview.left": "Απομένουν περ. {time}",
    "overview.noBook": "Δεν έχει ανοιχτεί ακόμη βιβλίο",
    "overview.today": "Διαβάστηκε σήμερα",
    "overview.minPerSession": "λεπτά ανά συνεδρία",
    "overview.pagesPerMinute": "σελίδες ανά λεπτό",
    "overview.allBooks": "ΟΛΑ ΤΑ ΒΙΒΛΙΑ",
    "overview.donutCaption": "από τα βιβλία σας ολοκληρώθηκαν",
    "overview.booksFinished": "Ολοκληρωμένα βιβλία",
    "overview.totalHours": "Ώρες συνολικά",

    "streak.current": "{days} τρέχον σερί",
    "streak.best": "{days} καλύτερο σερί {year}",
    "streak.readingDays": "{n} {daysCaps} ΑΝΑΓΝΩΣΗΣ ΤΟ {year}",
    "streak.none": "Δεν υπάρχει ακόμη σερί ανάγνωσης — σήμερα είναι καλή μέρα να ξεκινήσετε.",
    "streak.longest": "Το μεγαλύτερο σερί σας ξεκίνησε στις {when} και κράτησε {n} {days}.",
    "streak.trackingSince": "Τα δεδομένα ανάγνωσης καταγράφονται από {date}.",
    "streak.legendNotRead": "χωρίς ανάγνωση",
    "streak.legendRead": "ανάγνωση",
    "streak.legendFinished": "βιβλίο ολοκληρώθηκε",

    "calendar.dayTitle": "{date}  ·  {time}",
    "calendar.finished": "Ολοκληρώθηκε",

    "year.title": "Βιβλία που ολοκληρώθηκαν το {year}",
    "year.monthTitle": "{month} {year}  ·  {n} {books}",
    "book.finishedOn": "Ολοκληρώθηκε {date}",

    "about.version": "Έκδοση {version}",
    "about.check": "Έλεγχος ενημέρωσης",
    "about.install": "Εγκατάσταση {version}",
    "about.checking": "Ρωτάω το GitHub για την τελευταία έκδοση…",
    "about.uptodate": "Αυτή είναι η τελευταία έκδοση.",
    "about.available": "Η έκδοση {version} είναι διαθέσιμη.",
    "about.downloading": "Λήψη ενημέρωσης…",
    "about.ready": "Η ενημέρωση κατέβηκε. Το ReadTrack κλείνει και ξεκινά μόνο του — αν δεν ξεκινήσει, ανοίξτε το από το μενού εφαρμογών.",
    "about.privacy": "Η ενημέρωση κατεβαίνει από το GitHub μέσω Wi-Fi, και μόνο όταν πατήσετε το κουμπί. Κατά τα άλλα το ReadTrack δεν συνδέεται.",
    "about.log": "Τελευταία προσπάθεια:",

    "update.errNoNetwork": "Καμία σύνδεση. Ενεργοποιήστε το Wi-Fi και δοκιμάστε ξανά.",
    "update.errDownload": "Η λήψη απέτυχε.",
    "update.errResponse": "Το GitHub απάντησε απροσδόκητα.",
    "update.errNoAsset": "Η τελευταία έκδοση δεν περιλαμβάνει εκτελέσιμο αρχείο.",
    "update.errUnsupported": "Αυτό το firmware δεν μπορεί να κατεβάσει την ενημέρωση.",
    "update.errCorrupt": "Το αρχείο που κατέβηκε είναι κατεστραμμένο — δεν άλλαξε τίποτα.",
    "update.errHandover": "Η εφαρμογή δεν μπόρεσε να αντικατασταθεί. Η νέα έκδοση βρίσκεται εδώ:",

    "date.months": ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"],
    "date.monthsGen": ["Ιανουαρίου", "Φεβρουαρίου", "Μαρτίου", "Απριλίου", "Μαΐου", "Ιουνίου", "Ιουλίου", "Αυγούστου", "Σεπτεμβρίου", "Οκτωβρίου", "Νοεμβρίου", "Δεκεμβρίου"],
    "date.monthsShort": ["Ιαν", "Φεβ", "Μαρ", "Απρ", "Μάι", "Ιουν", "Ιουλ", "Αυγ", "Σεπ", "Οκτ", "Νοε", "Δεκ"],
    "date.weekdays": ["Δε", "Τρ", "Τε", "Πε", "Πα", "Σα", "Κυ"],
    "date.dayMonth": "{d} {monthGen}",

    "time.hm": "{h} ώ {m} λ",
    "time.m": "{m} λεπτά",

    "plural.days": ["ημέρα", "ημέρες"],
    "plural.books": ["βιβλίο", "βιβλία"]
};
