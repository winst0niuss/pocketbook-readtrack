#include "stats_db.h"
#include <string.h>

static double q_double(sqlite3 *db, const char *sql)
{
    sqlite3_stmt *st = NULL;
    double v = 0;
    if (sqlite3_prepare_v2(db, sql, -1, &st, NULL) == SQLITE_OK &&
        sqlite3_step(st) == SQLITE_ROW)
        v = sqlite3_column_double(st, 0);
    sqlite3_finalize(st);
    return v;
}

int stats_overall(sqlite3 *db, overall_stats *o)
{
    memset(o, 0, sizeof(*o));
    o->total_hours = q_double(db, "SELECT SUM(active_seconds)/3600.0 FROM sessions WHERE 1=1" AND_TRACKED);
    /* recovered = 1 is a wall-clock estimate, not measured reading: it stays in
     * the totals but must not skew the derived metrics. */
    o->session_count = (int)q_double(db,
        "SELECT COUNT(*) FROM sessions WHERE active_seconds >= 60 AND recovered = 0"
        AND_TRACKED);
    if (o->session_count > 0)
        o->avg_session_min = q_double(db,
            "SELECT AVG(active_seconds)/60.0 FROM sessions"
            " WHERE active_seconds >= 60 AND recovered = 0" AND_TRACKED);
    double mins = q_double(db,
        "SELECT SUM(active_seconds)/60.0 FROM sessions"
        " WHERE pages_start IS NOT NULL AND pages_end > pages_start"
        " AND active_seconds > 0 AND recovered = 0" AND_TRACKED);
    double pages = q_double(db,
        "SELECT SUM(pages_end - pages_start) FROM sessions"
        " WHERE pages_start IS NOT NULL AND pages_end > pages_start"
        " AND active_seconds > 0 AND recovered = 0" AND_TRACKED);
    if (mins > 0)
        o->pages_per_min = pages / mins;
    return 0;
}

int64_t stats_tracking_since(sqlite3 *db)
{
    return (int64_t)q_double(db,
        "SELECT COALESCE((SELECT value FROM meta WHERE key='tracking_since'), 0)");
}

void stats_book(sqlite3 *db, int64_t bookid, int64_t *secs, double *pages_per_min)
{
    *secs = 0;
    *pages_per_min = 0;
    sqlite3_stmt *st = NULL;
    const char *sql =
        "SELECT IFNULL(SUM(active_seconds),0),"
        " IFNULL(SUM(CASE WHEN pages_start IS NOT NULL AND pages_end > pages_start"
        "   AND recovered = 0 THEN pages_end - pages_start END),0),"
        " IFNULL(SUM(CASE WHEN pages_start IS NOT NULL AND pages_end > pages_start"
        "   AND recovered = 0 THEN active_seconds END),0)"
        " FROM sessions WHERE book_id = ?1" AND_TRACKED;
    if (sqlite3_prepare_v2(db, sql, -1, &st, NULL) == SQLITE_OK) {
        sqlite3_bind_int64(st, 1, bookid);
        if (sqlite3_step(st) == SQLITE_ROW) {
            *secs = sqlite3_column_int64(st, 0);
            double pages = sqlite3_column_double(st, 1);
            double s = sqlite3_column_double(st, 2);
            if (s > 0)
                *pages_per_min = pages / (s / 60.0);
        }
    }
    sqlite3_finalize(st);
}
