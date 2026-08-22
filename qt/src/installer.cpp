#include "installer.h"

#include <QByteArray>
#include <QDir>
#include <QFile>
#include <QJsonArray>
#include <QJsonDocument>
#include <QJsonObject>

#include "inkview_bridge.h"

namespace {

// The launcher resolves the app "path" as an absolute path, but the icon
// paths relative to the storage root (/mnt/ext1). Mixing them is required:
// an absolute icon path shows no icon, a relative app path won't launch.
constexpr const char *kAppPath = "/mnt/ext1/applications/ReadTrack.app";
constexpr const char *kIconDir = "/mnt/ext1/applications/icons";
constexpr const char *kIconRel = "applications/icons/readtrack.bmp";
constexpr const char *kIconFocusedRel = "applications/icons/readtrack_f.bmp";
// Absolute variants for writing the files to disk.
constexpr const char *kIconPath = "/mnt/ext1/applications/icons/readtrack.bmp";
constexpr const char *kIconFocusedPath =
    "/mnt/ext1/applications/icons/readtrack_f.bmp";
constexpr const char *kViewJson =
    "/mnt/ext1/system/config/desktop/view.json";
constexpr const char *kBackup =
    "/mnt/ext1/system/config/desktop/view.json.readtrack-backup";
constexpr const char *kAppId = "U_readtrack";

/* The launcher label. Every other user-facing string comes from the QML
 * catalogs in qt/qml/i18n/, but this one is written into the firmware's config
 * before any QML engine exists, so it carries its own small table — keep the
 * two in step. The device language is read on every launch, so switching the
 * reader's language relabels the tile on the next start. */
QString launcherTitle()
{
    const QString lang = inkViewLang().left(2).toLower();
    if (lang == QLatin1String("ru"))
        return QStringLiteral("Статистика");
    if (lang == QLatin1String("de"))
        return QStringLiteral("Statistik");
    return QStringLiteral("Statistics");
}

// Copies an embedded resource to a path on the device, but only when the file
// there differs — an app update ships new icons, and rewriting identical ones
// on every launch would be a pointless flash write.
void writeResourceIfChanged(const QString &resource, const QString &dest)
{
    QFile src(resource);
    if (!src.open(QIODevice::ReadOnly))
        return;
    const QByteArray wanted = src.readAll();

    QFile existing(dest);
    if (existing.open(QIODevice::ReadOnly) && existing.readAll() == wanted)
        return;
    existing.close();

    QFile out(dest);
    if (!out.open(QIODevice::WriteOnly | QIODevice::Truncate))
        return;
    // A half-written icon is worse than none: the launcher refuses to draw the
    // tile's image and its label slides up into the empty slot. Remove the file
    // so the tile falls back to the default user-app icon instead.
    if (out.write(wanted) != wanted.size() || !out.flush()) {
        out.close();
        QFile::remove(dest);
    }
}

// Adds our launcher entry to view.json. Idempotent, defensive: any failure
// (missing/unparseable/read-only file) is ignored so the app still starts.
void patchViewJson()
{
    const QString viewJsonPath = QLatin1String(kViewJson);
    QFile f(viewJsonPath);
    if (!f.open(QIODevice::ReadOnly))
        return;
    const QByteArray raw = f.readAll();
    f.close();

    QJsonParseError err;
    QJsonDocument doc = QJsonDocument::fromJson(raw, &err);
    if (err.error != QJsonParseError::NoError || !doc.isObject())
        return;

    QJsonObject root = doc.object();
    QJsonObject apps = root.value(QStringLiteral("applications")).toObject();
    const QString title = launcherTitle();

    if (apps.contains(QLatin1String(kAppId))) {
        // Registered already: the only thing that can still change is the
        // label, when the reader's language does.
        QJsonObject entry = apps.value(QLatin1String(kAppId)).toObject();
        if (entry.value(QStringLiteral("title")).toString() == title)
            return;
        entry[QStringLiteral("title")] = title;
        apps[QLatin1String(kAppId)] = entry;
        root[QStringLiteral("applications")] = apps;
    } else {
        // Back up the original once, before the first modification.
        if (!QFile::exists(QLatin1String(kBackup)))
            QFile::copy(QLatin1String(kViewJson), QLatin1String(kBackup));

        QJsonObject icon;
        icon[QStringLiteral("path")] = QLatin1String(kIconRel);
        QJsonObject iconFocused;
        iconFocused[QStringLiteral("path")] = QLatin1String(kIconFocusedRel);

        QJsonObject entry;
        entry[QStringLiteral("path")] = QLatin1String(kAppPath);
        entry[QStringLiteral("title")] = title;
        entry[QStringLiteral("icon")] = icon;
        entry[QStringLiteral("focused_icon")] = iconFocused;
        apps[QLatin1String(kAppId)] = entry;
        root[QStringLiteral("applications")] = apps;

        // Put the app id into the first launcher group so it shows up.
        QJsonObject view = root.value(QStringLiteral("view")).toObject();
        QJsonArray groups = view.value(QStringLiteral("groups")).toArray();
        if (!groups.isEmpty()) {
            QJsonObject g0 = groups.at(0).toObject();
            QJsonArray appList = g0.value(QStringLiteral("apps")).toArray();
            appList.append(QLatin1String(kAppId));
            g0[QStringLiteral("apps")] = appList;
            groups.replace(0, g0);
            view[QStringLiteral("groups")] = groups;
            root[QStringLiteral("view")] = view;
        }
    }

    if (!f.open(QIODevice::WriteOnly | QIODevice::Truncate))
        return;
    f.write(QJsonDocument(root).toJson(QJsonDocument::Indented));
    f.close();
}

} // namespace

void ensureRegistered()
{
    QDir().mkpath(QLatin1String(kIconDir));
    writeResourceIfChanged(QStringLiteral(":/readtrack.bmp"),
                           QLatin1String(kIconPath));
    writeResourceIfChanged(QStringLiteral(":/readtrack_f.bmp"),
                           QLatin1String(kIconFocusedPath));
    patchViewJson();
}
