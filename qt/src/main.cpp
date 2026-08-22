#include <cstring>
#include <unistd.h>

extern "C" {
#include "daemon.h"
}

#include <QByteArray>
#include <QDateTime>
#include <QFile>
#include <QFont>
#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QQmlContext>
#include <QQuickWindow>
#include <QString>
#include <QUrl>

#include "inkview_bridge.h"
#include "installer.h"
#include "update_log.h"
#include "stats_bridge.h"
#include "shim.h"
#include "updater.h"

namespace {

constexpr const char *kPluginPath = "/ebrmain/plugins";
constexpr const char *kQmlPath = "/ebrmain/qml";
constexpr const char *kPlatformName = "pocketbook2";
constexpr const char *kSceneUrl = "qrc:/main.qml";

void selectPlatformPlugin()
{
    if (qEnvironmentVariableIsEmpty("QT_PLUGIN_PATH"))
        qputenv("QT_PLUGIN_PATH", QByteArray(kPluginPath));
    if (qEnvironmentVariableIsEmpty("QT_QPA_PLATFORM"))
        qputenv("QT_QPA_PLATFORM", QByteArray(kPlatformName));
}

} // namespace

/* Milliseconds since the process was handed control. Only the difference
 * matters; the clock is whatever the device has. */
static qint64 sinceStart()
{
    static const qint64 t0 = QDateTime::currentMSecsSinceEpoch();
    return QDateTime::currentMSecsSinceEpoch() - t0;
}

/* Milliseconds between the kernel creating this process and main() running:
 * everything the loader does before us — mapping QtQuick/QtQml/QtGui off flash
 * and relocating them. Field 22 of /proc/self/stat is the process start in
 * clock ticks since boot, and /proc/uptime is now. */
static qint64 msBeforeMain()
{
    QFile stat(QStringLiteral("/proc/self/stat"));
    QFile up(QStringLiteral("/proc/uptime"));
    if (!stat.open(QIODevice::ReadOnly) || !up.open(QIODevice::ReadOnly))
        return -1;
    /* The second field is the executable name in brackets and may contain
     * spaces, so split after the closing one. */
    const QString line = QString::fromLatin1(stat.readAll());
    const int close = line.lastIndexOf(QLatin1Char(')'));
    if (close < 0)
        return -1;
    const QStringList fields =
        line.mid(close + 2).split(QLatin1Char(' '), Qt::SkipEmptyParts);
    if (fields.size() < 20)
        return -1;
    bool ok = false;
    const qlonglong ticks = fields.at(19).toLongLong(&ok); /* field 22 overall */
    if (!ok)
        return -1;
    const double uptime =
        QString::fromLatin1(up.readAll()).section(QLatin1Char(' '), 0, 0).toDouble();
    const long hz = sysconf(_SC_CLK_TCK) > 0 ? sysconf(_SC_CLK_TCK) : 100;
    return qint64(uptime * 1000.0) - qint64(ticks * 1000 / hz);
}

/* Startup is slow enough on this hardware to be worth measuring rather than
 * guessing about: the loader maps QtQuick/QtQml/QtGui before main() is even
 * entered, the QML is compiled on every launch, and the daemon pays that same
 * price for a loop that only needs sqlite. These marks say which part it is. */
static void mark(const char *what)
{
    updateLog(QStringLiteral("boot: %1 at %2 ms")
                  .arg(QLatin1String(what))
                  .arg(sinceStart()));
}

int main(int argc, char *argv[])
{
    /* Daemon mode before any Qt: pure C loop, no UI. */
    if (argc > 1 && std::strcmp(argv[1], "--daemon") == 0) {
        mark("daemon entered main");
        return run_daemon();
    }

    mark("main");
    updateLog(QStringLiteral("boot: loader took %1 ms before main")
                  .arg(msBeforeMain()));
    selectPlatformPlugin();
    QCoreApplication::setSetuidAllowed(true);

    const ScreenSize screen = openInkViewScreen();
    mark("inkview screen");

    // Register the launcher icon on first run (idempotent, no-op afterwards).
    ensureRegistered();
    mark("registered");

    QQuickWindow::setGraphicsApi(QSGRendererInterface::Software);

    QGuiApplication app(argc, argv);
    mark("QGuiApplication");

    const QString fontFamily = inkViewFontFamily();
    if (!fontFamily.isEmpty())
        QGuiApplication::setFont(QFont(fontFamily));

    StatsBridge stats;
    Updater updater;
    Shim shim;
    /* An app update ships a new shim; nothing else would ever install it. */
    shim.refresh();
    spawn_daemon(QGuiApplication::applicationFilePath().toUtf8().constData());

    QQmlApplicationEngine engine;
    engine.addImportPath(QString::fromUtf8(kQmlPath));
    engine.rootContext()->setContextProperty(QStringLiteral("stats"), &stats);
    engine.rootContext()->setContextProperty(QStringLiteral("updater"), &updater);
    engine.rootContext()->setContextProperty(QStringLiteral("shim"), &shim);
    engine.rootContext()->setContextProperty(QStringLiteral("deviceLang"),
                                              inkViewLang());
    engine.rootContext()->setContextProperty(QStringLiteral("screenW"), screen.width);
    engine.rootContext()->setContextProperty(QStringLiteral("screenH"), screen.height);
    engine.rootContext()->setContextProperty(QStringLiteral("panelH"), screen.panelHeight);

    engine.load(QUrl(QString::fromUtf8(kSceneUrl)));
    mark("QML loaded");
    if (engine.rootObjects().isEmpty())
        return 1;

    /* The scene existing is not the app being on screen: the software renderer
     * still has to draw it and InkView to push it to the panel, and that
     * happens inside exec(). Time the first frame that reaches the display —
     * on e-ink it is the number the user actually waits for. */
    if (auto *window = qobject_cast<QQuickWindow *>(engine.rootObjects().first())) {
        QObject::connect(window, &QQuickWindow::frameSwapped, window, [] {
            static bool once = false;
            if (!once) {
                once = true;
                mark("first frame");
            }
        });
    }
    return app.exec();
}
