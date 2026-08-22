.pragma library

/* French catalog. Two plural forms; 0 stays singular. */

function plural(n) {
    return n <= 1 ? 0 : 1;
}

var strings = {
    "app.title": "Statistiques",

    "nav.overview": "Aperçu",
    "nav.calendar": "Calendrier",

    "overview.left": "Reste env. {time}",
    "overview.noBook": "Aucun livre ouvert pour l'instant",
    "overview.bookProgress": "Progression : {percent} %",
    "overview.hoursOfReading": "heures de lecture",
    "overview.minPerSession": "min par séance",
    "overview.allBooks": "TOUS LES LIVRES",
    "overview.donutCaption": "des livres sur l'appareil",
    "overview.booksFinished": "Livres terminés",
    "overview.totalHours": "Heures au total",
    "overview.pagesPerHour": "pages par heure",


    "calendar.dayTitle": "{date}  ·  {time}",
    "calendar.finished": "Terminé",
    "calendar.trackingSince": "Les données de lecture sont enregistrées depuis le {date}.",
    "book.finishedOn": "Terminé le {date}",
    "calendar.monthSummary": "{n} {days} · {time}",


    "about.version": "Version {version}",
    "about.check": "Rechercher une mise à jour",
    "about.install": "Installer {version}",
    "about.checking": "Interrogation de GitHub sur la dernière version…",
    "about.uptodate": "C'est la dernière version.",
    "about.available": "La version {version} est disponible.",
    "about.downloading": "Téléchargement de la mise à jour…",
    "about.ready": "Mise à jour téléchargée. {app} se ferme et redémarre tout seul — sinon, ouvrez-le depuis le menu des applications.",
    "about.privacy": "La mise à jour est récupérée sur GitHub par Wi-Fi, uniquement quand vous appuyez sur le bouton. Le reste du temps, {app} ne se connecte pas.",
    "about.log": "Dernière tentative :",

    "update.errNoNetwork": "Pas de connexion. Activez le Wi-Fi et réessayez.",
    "update.errDownload": "Échec du téléchargement.",
    "update.errResponse": "GitHub a répondu de façon inattendue.",
    "update.errNoAsset": "La dernière version ne contient aucun binaire installable.",
    "update.errUnsupported": "Ce micrologiciel n'offre aucun moyen de télécharger la mise à jour.",
    "update.errCorrupt": "Le fichier téléchargé est endommagé — rien n'a été modifié.",
    "update.errHandover": "Impossible de remplacer l'application. La nouvelle version se trouve ici :",

    "date.months": ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
    "date.monthsGen": ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
    "date.weekdays": ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
    "date.dayMonth": "{d} {monthGen}",

    "time.hm": "{h} h {m} min",
    "time.m": "{m} min",

    "plural.days": ["jour", "jours"]
};
