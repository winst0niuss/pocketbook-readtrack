#include "update_log.h"

#include <QByteArray>
#include <QDateTime>
#include <QDir>
#include <QFile>
#include <QStringList>

extern "C" {
#include "daemon.h"
}

namespace {

constexpr const char *kLogPath = STATS_DIR "/update.log";
/* A few kilobytes is more than the whole trace of one attempt. */
constexpr qint64 kMaxSize = 16 * 1024;

} // namespace

void updateLog(const QString &line)
{
    QDir().mkpath(QString::fromLatin1(STATS_DIR));
    QFile f(QString::fromLatin1(kLogPath));
    if (f.size() > kMaxSize)
        f.remove();
    if (!f.open(QIODevice::WriteOnly | QIODevice::Append))
        return;
    const QString stamp =
        QDateTime::currentDateTime().toString(QStringLiteral("MM-dd hh:mm:ss"));
    f.write((stamp + QLatin1Char(' ') + line + QLatin1Char('\n')).toUtf8());
    f.flush();
    f.close();
}

QString updateLogTail(int lines)
{
    QFile f(QString::fromLatin1(kLogPath));
    if (!f.open(QIODevice::ReadOnly))
        return {};
    const QStringList all = QString::fromUtf8(f.readAll())
                                .split(QLatin1Char('\n'), Qt::SkipEmptyParts);
    f.close();
    return all.mid(qMax(0, all.size() - lines)).join(QLatin1Char('\n'));
}

void updateLogClear()
{
    QFile::remove(QString::fromLatin1(kLogPath));
}
