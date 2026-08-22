#pragma once

#include <QObject>
#include <QVariantMap>

struct sqlite3;

/* Bridge between QML and the existing C modules (tracker/stats_db). */
class StatsBridge : public QObject {
    Q_OBJECT

public:
    explicit StatsBridge(QObject *parent = nullptr);
    ~StatsBridge() override;

    Q_INVOKABLE QVariantMap overall();
    Q_INVOKABLE QVariantMap currentBook();
    Q_INVOKABLE QVariantMap month(int year, int mon);

private:
    /* Reads the firmware's current state and folds it into our DB before a
     * screen aggregates it, so a tab never shows what the daemon last happened
     * to poll. */
    void catchUp();

    sqlite3 *db_ = nullptr;
};
