pragma Singleton
import QtQuick

import "i18n/de.js" as De
import "i18n/en.js" as En
import "i18n/ru.js" as Ru

/* Key-based localization. To add a language: copy a catalog in i18n/, list it
 * in readtrack.qrc, then add one import above and one case below — call sites
 * never change. A key a catalog is missing falls back to English, and so does
 * a device language no catalog covers. */
QtObject {
    readonly property var catalog: {
        var raw = (typeof deviceLang === "undefined") ? "" : (deviceLang || "");
        switch (raw.substring(0, 2).toLowerCase()) {
        case "de": return De;
        case "ru": return Ru;
        default:   return En;
        }
    }

    /* Raw catalog entry: a string, or the form array of a "plural.*" key. */
    function entry(key) {
        var v = catalog.strings[key];
        return v !== undefined ? v : En.strings[key];
    }

    /* Localized text, with {placeholder} filled in from `values`. */
    function t(key, values) {
        var s = entry(key);
        if (s === undefined)
            return key; // untranslated keys stay visible instead of blank
        if (values === undefined)
            return s;
        return s.replace(/\{(\w+)\}/g, function (match, name) {
            return values[name] !== undefined ? values[name] : match;
        });
    }

    /* The noun inflected for n, without the number: "день" / "дня" / "дней". */
    function plural(key, n) {
        var forms = entry(key);
        if (forms === undefined)
            return "";
        return forms[Math.min(catalog.plural(n), forms.length - 1)];
    }

    function pluralUpper(key, n) {
        return plural(key, n).toUpperCase();
    }

    readonly property var monthsFull: entry("date.months")
    readonly property var monthsShort: entry("date.monthsShort")
    readonly property var weekdaysShort: entry("date.weekdays")

    /* Day and month in the order the language writes them, with the month in
     * whatever form that order needs (Russian wants the genitive). */
    function fmtDayMonth(d) {
        return t("date.dayMonth", { d: d.getDate(),
                                    month: entry("date.months")[d.getMonth()],
                                    monthGen: entry("date.monthsGen")[d.getMonth()] });
    }

    /* Reading time: "1h 05m" / "1 ч 05 мин" / "12 min" */
    function fmtHM(secs) {
        var s = secs || 0;
        var h = Math.floor(s / 3600);
        var m = Math.floor((s % 3600) / 60);
        if (h > 0)
            return t("time.hm", { h: h, m: (m < 10 ? "0" : "") + m });
        return t("time.m", { m: m });
    }
}
