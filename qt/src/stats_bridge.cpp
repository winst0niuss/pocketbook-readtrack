#include "stats_bridge.h"

#include <QDate>
#include <QDateTime>
#include <QDir>
#include <QFile>
#include <QHash>
#include <QRegularExpression>
#include <QUrl>
#include <QVariantList>
#include <QVector>

#include "epub_cover.h"

extern "C" {
#include "daemon.h"
#include "stats_db.h"
#include "tracker.h"
}

StatsBridge::StatsBridge(QObject *parent) : QObject(parent)
{
    if (sqlite3_open(stats_db_path(), &db_) == SQLITE_OK)
        sqlite3_busy_timeout(db_, 2000);
}

StatsBridge::~StatsBridge()
{
    if (db_)
        sqlite3_close(db_);
}

namespace {

/* Cover for the key stored in our own books table. Rows written before v0.7
 * hold <storageid><hash>; newer ones hold the bare hash, because the storage
 * id came from files and vanished with the file. */
QString coverUrlForKey(sqlite3 *expdb, const QString &key);

sqlite3 *openExplorer()
{
    sqlite3 *db = nullptr;
    if (sqlite3_open_v2(explorer_db_path(), &db, SQLITE_OPEN_READONLY,
                        nullptr) != SQLITE_OK) {
        if (db)
            sqlite3_close(db);
        return nullptr;
    }
    sqlite3_busy_timeout(db, 1000);
    return db;
}

/* The firmware names its cover files <storageid><hash>.png, and the same book
 * can be indexed on several storages (internal, cloud, SD). */
QList<int> storageIds(sqlite3 *expdb)
{
    QList<int> ids;
    sqlite3_stmt *st = nullptr;
    if (sqlite3_prepare_v2(expdb, "SELECT id FROM storages ORDER BY id", -1,
                           &st, nullptr) == SQLITE_OK) {
        while (sqlite3_step(st) == SQLITE_ROW)
            ids.append(sqlite3_column_int(st, 0));
    }
    sqlite3_finalize(st);
    if (ids.isEmpty())
        ids << 1; /* internal storage, the only one that always exists */
    return ids;
}

/* Copies a firmware cover into our own cache under "fw_<hash>". Kept apart
 * from the EPUB extraction's key so a book whose file is still around can
 * later be upgraded to the better image, and kept at all because the firmware
 * drops its cache entry when the book is deleted — this copy is what a
 * finished-and-deleted book has left. */
QString adoptedCover(const QString &hash, const QList<int> &storages)
{
    if (hash.isEmpty())
        return QString();
    const QString mine =
        QStringLiteral(OWN_COVER_DIR "/fw_%1.png").arg(hash);
    if (QFile::exists(mine))
        return QUrl::fromLocalFile(mine).toString();

    for (int storage : storages) {
        const QString source =
            QStringLiteral(COVER_DIR "/%1%2.png").arg(storage).arg(hash);
        if (!QFile::exists(source))
            continue;
        QDir().mkpath(QLatin1String(OWN_COVER_DIR));
        if (QFile::copy(source, mine))
            return QUrl::fromLocalFile(mine).toString();
        return QUrl::fromLocalFile(source).toString(); /* copy failed, show it anyway */
    }
    return QString();
}

QString coverUrlForKey(sqlite3 *expdb, const QString &key)
{
    if (key.isEmpty())
        return QString();
    const QString hash = key.size() == 33 ? key.mid(1) : key;
    const QString cached = epubCover(QString(), hash);
    if (!cached.isEmpty())
        return QUrl::fromLocalFile(cached).toString();
    return expdb ? adoptedCover(hash, storageIds(expdb)) : QString();
}

/* Cover for a title, in the order that survives the book being deleted:
 *   1. our own cache, written by any earlier lookup — outlives everything;
 *   2. the EPUB itself, the best image, but only while the file is there
 *      (the firmware cache holds ad pages instead of the cover for some
 *      Calibre books, so it never wins over an extraction);
 *   3. the firmware's cache, copied into ours on the way out.
 *
 * The hash comes from books_fast_hashes, not from files: files only lists what
 * is physically present, which on a well-used reader is a handful of books out
 * of hundreds, and every deleted book would fall through to a bare letter. */
QString resolveCoverUrl(sqlite3 *expdb, const QString &title)
{
    if (!expdb || title.isEmpty())
        return QString();
    const char *sql =
        "SELECT lower(hex(h.fast_hash)),"
        " IFNULL(fo.name,'') || '/' || IFNULL(f.filename,'')"
        " FROM books_impl b"
        " JOIN books_fast_hashes h ON h.book_id = b.id"
        " LEFT JOIN files f ON f.book_id = b.id"
        " LEFT JOIN folders fo ON fo.id = f.folder_id"
        " WHERE lower(trim(b.title)) = lower(trim(?1))"
        " ORDER BY (f.filename IS NOT NULL) DESC, f.modification_time DESC,"
        "          f.storageid ASC";
    sqlite3_stmt *st = nullptr;
    if (sqlite3_prepare_v2(expdb, sql, -1, &st, nullptr) != SQLITE_OK)
        return QString();
    sqlite3_bind_text(st, 1, title.toUtf8().constData(), -1, SQLITE_TRANSIENT);

    struct Candidate { QString hash, path; };
    QList<Candidate> candidates;
    while (sqlite3_step(st) == SQLITE_ROW) {
        Candidate c;
        c.hash = QString::fromUtf8(
            reinterpret_cast<const char *>(sqlite3_column_text(st, 0)));
        c.path = QString::fromUtf8(
            reinterpret_cast<const char *>(sqlite3_column_text(st, 1)));
        if (c.path.endsWith(QLatin1Char('/')))
            c.path.clear(); /* no files row: the join left an empty filename */
        candidates.append(c);
    }
    sqlite3_finalize(st);

    /* 1. anything we cached earlier, extraction or adoption */
    for (const Candidate &c : candidates) {
        const QString cached = epubCover(QString(), c.hash);
        if (!cached.isEmpty())
            return QUrl::fromLocalFile(cached).toString();
    }
    /* 2. the file itself */
    for (const Candidate &c : candidates) {
        if (c.path.isEmpty())
            continue;
        const QString extracted = epubCover(c.path, c.hash);
        if (!extracted.isEmpty())
            return QUrl::fromLocalFile(extracted).toString();
    }
    /* 3. the firmware cache, adopted into ours */
    const QList<int> storages = storageIds(expdb);
    for (const Candidate &c : candidates) {
        const QString adopted = adoptedCover(c.hash, storages);
        if (!adopted.isEmpty())
            return adopted;
    }
    return QString();
}

struct FinishedBook {
    QDate day;
    QString title;
    QString author;
    QString coverUrl;
    QStringList words; /* normalized title, for the dedupe below */
    bool hasFile = false;
};

/* Title as lowercase words, punctuation dropped. */
QStringList titleWords(const QString &title)
{
    static const QRegularExpression sep(QStringLiteral("[^\\p{L}\\p{N}]+"));
    return title.toLower().split(sep, Qt::SkipEmptyParts);
}

/* Same book if one word list is a prefix of the other. Catches the variants
 * books_impl accumulates ("… : Roman", punctuation) without merging series
 * volumes or "Die Nacht" vs "Die Nachtigall". */
bool sameBook(const QStringList &a, const QStringList &b)
{
    const int n = qMin(a.size(), b.size());
    if (n == 0)
        return false;
    for (int i = 0; i < n; i++)
        if (a[i] != b[i])
            return false;
    return true;
}

/* Finished books straight from the firmware DB: completed_ts is set by the
 * firmware exactly on "mark as read" (DB trigger). Cover extraction is the
 * expensive part, so callers that only need dates/counts skip it. */
QList<FinishedBook> finishedBooks(bool withCovers)
{
    QList<FinishedBook> out;
    sqlite3 *db = openExplorer();
    if (!db)
        return out;
    /* One row per entry, oldest finish first; books_impl keeps stale rows
     * after delete/re-add, so the merge below folds them together. */
    const char *sql =
        "SELECT date(s.completed_ts,'unixepoch','localtime'), IFNULL(b.title,'?'),"
        " EXISTS(SELECT 1 FROM files f WHERE f.book_id = b.id),"
        " IFNULL(b.author,'')"
        " FROM books_settings s JOIN books_impl b ON b.id = s.bookid"
        " WHERE s.completed = 1 AND s.completed_ts > 0"
        " ORDER BY s.completed_ts";
    sqlite3_stmt *st = nullptr;
    if (sqlite3_prepare_v2(db, sql, -1, &st, nullptr) == SQLITE_OK) {
        while (sqlite3_step(st) == SQLITE_ROW) {
            const QDate day = QDate::fromString(
                QString::fromUtf8(reinterpret_cast<const char *>(
                    sqlite3_column_text(st, 0))),
                Qt::ISODate);
            if (!day.isValid())
                continue;
            const QString title = QString::fromUtf8(
                reinterpret_cast<const char *>(sqlite3_column_text(st, 1)));
            const bool hasFile = sqlite3_column_int(st, 2) != 0;
            const QString author = QString::fromUtf8(
                reinterpret_cast<const char *>(sqlite3_column_text(st, 3)));
            const QStringList words = titleWords(title);

            int at = -1;
            for (int i = 0; i < out.size() && at < 0; i++)
                if (sameBook(out[i].words, words))
                    at = i;
            if (at < 0) {
                FinishedBook fb;
                fb.day = day; /* first row of a group = first finish date */
                fb.title = title;
                fb.author = author;
                fb.words = words;
                fb.hasFile = hasFile;
                out.append(fb);
            } else if (hasFile && !out[at].hasFile) {
                /* the variant that still has a file wins: the cover lookup
                 * matches on the exact title */
                out[at].title = title;
                out[at].words = words;
                out[at].hasFile = true;
                if (!author.isEmpty())
                    out[at].author = author;
            }
        }
    }
    sqlite3_finalize(st);
    if (withCovers) {
        for (FinishedBook &fb : out)
            fb.coverUrl = resolveCoverUrl(db, fb.title);
    }
    sqlite3_close(db);
    return out;
}

} // namespace

QVariantMap StatsBridge::overall()
{
    overall_stats o;
    stats_overall(db_, &o);
    QVariantMap m;
    m[QStringLiteral("todaySecs")] = o.today_secs;
    m[QStringLiteral("todayPages")] = o.today_pages;
    m[QStringLiteral("weekSecs")] = o.week_secs;
    m[QStringLiteral("avgSessionMin")] = o.avg_session_min;
    m[QStringLiteral("pagesPerMin")] = o.pages_per_min;
    m[QStringLiteral("totalHours")] = o.total_hours;
    /* The donut answers "how much of what I have have I read", so both halves
     * count the books currently on the device — download twenty more and it
     * halves. Titles, not book_ids: the same book sits in books_impl several
     * times over, once per copy.
     *
     * The tile beside it is the all-time count instead, which is why the two
     * disagree: finished books are usually deleted and leave the library. */
    int libraryTotal = 0;
    int libraryFinished = 0;
    if (sqlite3 *exp = openExplorer()) {
        sqlite3_stmt *st = nullptr;
        const char *sql =
            "SELECT COUNT(*), IFNULL(SUM(fin),0) FROM ("
            "  SELECT MAX(IFNULL(s.completed,0)) AS fin"
            "  FROM books_impl b"
            "  JOIN files f ON f.book_id = b.id"
            "  LEFT JOIN books_settings s ON s.bookid = b.id"
            "  GROUP BY lower(trim(IFNULL(b.title,'?'))))";
        if (sqlite3_prepare_v2(exp, sql, -1, &st, nullptr) == SQLITE_OK
                && sqlite3_step(st) == SQLITE_ROW) {
            libraryTotal = sqlite3_column_int(st, 0);
            libraryFinished = sqlite3_column_int(st, 1);
        }
        sqlite3_finalize(st);
        sqlite3_close(exp);
    }
    m[QStringLiteral("booksTotal")] = libraryTotal;
    m[QStringLiteral("booksOnDeviceFinished")] = libraryFinished;
    m[QStringLiteral("booksFinished")] = finishedBooks(false).size();
    m[QStringLiteral("finishedFrac")] =
        libraryTotal > 0 ? double(libraryFinished) / libraryTotal : 0.0;
    m[QStringLiteral("streakDays")] = o.streak_days;
    return m;
}

QVariantMap StatsBridge::currentBook()
{
    QVariantMap m;
    pb_state s;
    if (tracker_read_state(explorer_db_path(), &s) != 0) {
        m[QStringLiteral("ok")] = false;
        return m;
    }
    m[QStringLiteral("ok")] = true;
    m[QStringLiteral("title")] = QString::fromUtf8(s.title);
    m[QStringLiteral("author")] = QString::fromUtf8(s.author);
    double prog = s.completed ? 1.0
                              : (s.npage > 0 ? double(s.cpage) / s.npage : 0.0);
    m[QStringLiteral("percent")] = int(prog * 100 + 0.5);
    m[QStringLiteral("completed")] = s.completed != 0;

    QString coverUrl;
    if (sqlite3 *exp = openExplorer()) {
        coverUrl = resolveCoverUrl(exp, QString::fromUtf8(s.title));
        sqlite3_close(exp);
    }
    if (coverUrl.isEmpty()) {
        if (sqlite3 *exp = openExplorer()) {
            coverUrl = coverUrlForKey(exp, QString::fromUtf8(s.cover));
            sqlite3_close(exp);
        }
    }
    m[QStringLiteral("coverUrl")] = coverUrl;

    int64_t bsecs = 0;
    double bppm = 0;
    stats_book(db_, s.bookid, &bsecs, &bppm);
    if (bppm <= 0) {
        overall_stats o;
        stats_overall(db_, &o);
        bppm = o.pages_per_min;
    }
    m[QStringLiteral("bookSecs")] = qlonglong(bsecs);
    qlonglong left = 0;
    if (bppm > 0 && s.npage > s.cpage && !s.completed)
        left = qlonglong((s.npage - s.cpage) / bppm * 60.0);
    m[QStringLiteral("leftSecs")] = left;
    return m;
}


QVariantMap StatsBridge::year(int y)
{
    QVariantMap m;
    const QDate jan1(y, 1, 1);
    const int ndays = jan1.daysInYear();

    QVector<int> heat(ndays, 0);

    /* Nothing was measured before the app was installed, and the firmware keeps
     * no session history, so those days are unknown rather than "not read".
     * Finish markers still stand: the firmware does date those. */
    const qint64 since = stats_tracking_since(db_);
    const QDate sinceDate = since > 0
        ? QDateTime::fromSecsSinceEpoch(since).date() : QDate();
    int trackedFrom = 0;
    if (sinceDate.isValid()) {
        if (sinceDate.year() > y)
            trackedFrom = ndays;
        else if (sinceDate.year() == y)
            trackedFrom = sinceDate.dayOfYear() - 1;
    }

    /* Lesetage */
    sqlite3_stmt *st = nullptr;
    const char *readSql =
        "SELECT date(end_time,'unixepoch','localtime') d FROM sessions"
        " WHERE strftime('%Y', end_time,'unixepoch','localtime') = printf('%04d',?1)"
        AND_TRACKED
        " GROUP BY d HAVING SUM(active_seconds) >= 60";
    if (sqlite3_prepare_v2(db_, readSql, -1, &st, nullptr) == SQLITE_OK) {
        sqlite3_bind_int(st, 1, y);
        while (sqlite3_step(st) == SQLITE_ROW) {
            QDate d = QDate::fromString(
                QString::fromUtf8(reinterpret_cast<const char *>(
                    sqlite3_column_text(st, 0))),
                Qt::ISODate);
            if (d.isValid() && d.year() == y)
                heat[d.dayOfYear() - 1] = 1;
        }
    }
    sqlite3_finalize(st);

    /* Mark finish days (native marking from the firmware DB) */
    const QList<FinishedBook> finished = finishedBooks(false);
    for (const FinishedBook &fb : finished) {
        if (fb.day.year() == y)
            heat[fb.day.dayOfYear() - 1] = 2;
    }

    /* Streaks */
    int daysRead = 0, best = 0, run = 0;
    QDate bestStart;
    for (int i = trackedFrom; i < ndays; i++) {
        if (heat[i] > 0) {
            daysRead++;
            run++;
            if (run > best) {
                best = run;
                bestStart = jan1.addDays(i - run + 1);
            }
        } else {
            run = 0;
        }
    }
    /* Current streak comes from stats_overall(): reading days only, and not
     * cut off at the year boundary like the per-year heat array would be. */
    int current = 0;
    if (QDate::currentDate().year() == y) {
        overall_stats o;
        stats_overall(db_, &o);
        current = o.streak_days;
    }

    QVariantList heatList;
    for (int i = 0; i < ndays; i++)
        heatList.append(heat[i]);
    m[QStringLiteral("heat")] = heatList;
    m[QStringLiteral("startWeekday")] = jan1.dayOfWeek() - 1; /* 0 = Montag */
    m[QStringLiteral("ndays")] = ndays;
    m[QStringLiteral("daysRead")] = daysRead;
    m[QStringLiteral("currentStreak")] = current;
    m[QStringLiteral("bestStreak")] = best;
    m[QStringLiteral("bestStreakStart")] =
        bestStart.isValid() ? bestStart.toString(Qt::ISODate) : QString();
    m[QStringLiteral("trackedFrom")] = trackedFrom;
    m[QStringLiteral("trackingSince")] =
        sinceDate.isValid() ? sinceDate.toString(Qt::ISODate) : QString();
    return m;
}

QVariantMap StatsBridge::yearBooks(int y)
{
    QVariantMap m;
    QVector<QVariantList> perMonth(13);
    int total = 0;

    const QList<FinishedBook> finished = finishedBooks(true);
    for (const FinishedBook &fb : finished) {
        if (fb.day.year() != y)
            continue;
        QVariantMap b;
        b[QStringLiteral("title")] = fb.title;
        b[QStringLiteral("author")] = fb.author;
        b[QStringLiteral("coverUrl")] = fb.coverUrl;
        b[QStringLiteral("dateStr")] = fb.day.toString(QStringLiteral("dd.MM."));
        /* The book card can be reached without the month heading that gives
         * the short date its year, so it carries the full one. */
        b[QStringLiteral("dateFull")] =
            fb.day.toString(QStringLiteral("dd.MM.yyyy"));
        perMonth[fb.day.month()].append(b);
        total++;
    }

    QVariantList months;
    for (int i = 1; i <= 12; i++)
        months.append(QVariant(perMonth[i]));
    m[QStringLiteral("months")] = months;
    m[QStringLiteral("total")] = total;
    return m;
}

QVariantMap StatsBridge::month(int year, int mon)
{
    QVariantMap m;
    const QDate first(year, mon, 1);
    const int ndays = first.daysInMonth();
    m[QStringLiteral("ndays")] = ndays;
    m[QStringLiteral("firstWeekday")] = first.dayOfWeek() - 1; /* 0 = Montag */

    /* Per day: books with reading time, sorted descending. */
    QVector<QVariantList> perDay(ndays + 1);
    QVector<qlonglong> daySecs(ndays + 1, 0);
    /* GROUP BY title instead of book_id: the same books exist as several file
     * copies and would otherwise appear twice. */
    const char *sql =
        "SELECT CAST(strftime('%d', s.end_time,'unixepoch','localtime') AS INTEGER),"
        " MIN(IFNULL(b.title,'?')), MAX(IFNULL(b.cover,'')), SUM(s.active_seconds),"
        " MAX(IFNULL(b.author,''))"
        " FROM sessions s LEFT JOIN books b ON b.book_id = s.book_id"
        " WHERE strftime('%Y-%m', s.end_time,'unixepoch','localtime')"
        "   = printf('%04d-%02d',?1,?2)"
        " AND s.end_time >= " TRACKED_SINCE_SQL
        " GROUP BY 1, lower(trim(IFNULL(b.title,'?')))"
        " HAVING SUM(s.active_seconds) >= 60"
        " ORDER BY 1, 4 DESC";
    sqlite3 *exp = openExplorer();
    QHash<QString, QString> coverCache; /* title -> URL, once per call */
    sqlite3_stmt *st = nullptr;
    if (sqlite3_prepare_v2(db_, sql, -1, &st, nullptr) == SQLITE_OK) {
        sqlite3_bind_int(st, 1, year);
        sqlite3_bind_int(st, 2, mon);
        while (sqlite3_step(st) == SQLITE_ROW) {
            int d = sqlite3_column_int(st, 0);
            if (d < 1 || d > ndays)
                continue;
            QVariantMap b;
            const QString title = QString::fromUtf8(
                reinterpret_cast<const char *>(sqlite3_column_text(st, 1)));
            b[QStringLiteral("title")] = title;
            const QString cover = QString::fromUtf8(
                reinterpret_cast<const char *>(sqlite3_column_text(st, 2)));
            if (!coverCache.contains(title)) {
                QString url = resolveCoverUrl(exp, title);
                if (url.isEmpty())
                    url = coverUrlForKey(exp, cover);
                coverCache.insert(title, url);
            }
            b[QStringLiteral("coverUrl")] = coverCache.value(title);
            b[QStringLiteral("author")] = QString::fromUtf8(
                reinterpret_cast<const char *>(sqlite3_column_text(st, 4)));
            qlonglong secs = sqlite3_column_int64(st, 3);
            b[QStringLiteral("secs")] = secs;
            perDay[d].append(b);
            daySecs[d] += secs;
        }
    }
    sqlite3_finalize(st);
    if (exp)
        sqlite3_close(exp);

    /* Finish dates come from the firmware, so they belong on the calendar even
     * for days before tracking started — the same exception the year heatmap
     * makes. They carry no reading time: the firmware dates the finish, it
     * does not say how long the day's reading was. */
    const QList<FinishedBook> finished = finishedBooks(true);
    for (const FinishedBook &fb : finished) {
        if (fb.day.year() != year || fb.day.month() != mon)
            continue;
        const int d = fb.day.day();
        if (d < 1 || d > ndays)
            continue;

        bool merged = false;
        for (QVariant &entry : perDay[d]) {
            QVariantMap b = entry.toMap();
            if (!sameBook(titleWords(b.value(QStringLiteral("title")).toString()),
                          fb.words))
                continue;
            b[QStringLiteral("finished")] = true;
            entry = b;
            merged = true;
            break;
        }
        if (merged)
            continue;

        QVariantMap b;
        b[QStringLiteral("title")] = fb.title;
        b[QStringLiteral("author")] = fb.author;
        b[QStringLiteral("coverUrl")] = fb.coverUrl;
        b[QStringLiteral("secs")] = 0;
        b[QStringLiteral("finished")] = true;
        perDay[d].append(b);
    }

    /* Days before the app was installed hold no measurement. The tab draws
     * them as unknown rather than as days without reading. */
    const qint64 since = stats_tracking_since(db_);
    const QDate sinceDate = since > 0
        ? QDateTime::fromSecsSinceEpoch(since).date() : QDate();
    int trackedFromDay = 0;
    if (sinceDate.isValid()) {
        if (sinceDate > first.addDays(ndays - 1))
            trackedFromDay = ndays + 1; /* the whole month predates tracking */
        else if (sinceDate > first)
            trackedFromDay = sinceDate.day();
    }
    m[QStringLiteral("trackedFromDay")] = trackedFromDay;
    m[QStringLiteral("trackingSince")] = sinceDate.isValid()
        ? sinceDate.toString(QStringLiteral("dd.MM.yyyy")) : QString();

    QVariantList days;
    for (int d = 1; d <= ndays; d++) {
        QVariantMap e;
        e[QStringLiteral("secs")] = daySecs[d];
        e[QStringLiteral("books")] = perDay[d];
        days.append(e);
    }
    m[QStringLiteral("days")] = days;
    return m;
}
