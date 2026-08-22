#ifndef STATS_DB_H
#define STATS_DB_H

#include <stdint.h>
#include <sqlite3.h>

typedef struct {
    double total_hours;
    int session_count;
    double avg_session_min;
    double pages_per_min;      /* nur aus Sessions mit bekannten Seiten */
    int books_total, books_finished;
    int streak_days;
    int today_secs, today_pages;
    int week_secs, week_pages;
} overall_stats;

/* Sessions before this moment were reconstructed from the firmware's
 * last-open timestamps, not measured, so every history view filters them out.
 * Falls back to 0 (no filtering) on a database that predates the marker. */
#define TRACKED_SINCE_SQL \
    "(SELECT COALESCE((SELECT value FROM meta WHERE key='tracking_since'), 0))"
#define AND_TRACKED " AND end_time >= " TRACKED_SINCE_SQL

int stats_overall(sqlite3 *db, overall_stats *o);
/* Epoch second the marker holds, 0 if there is none. */
int64_t stats_tracking_since(sqlite3 *db);
/* Total time + speed for a book (speed <= 0 if unknown). */
void stats_book(sqlite3 *db, int64_t bookid, int64_t *secs, double *pages_per_min);

#endif
