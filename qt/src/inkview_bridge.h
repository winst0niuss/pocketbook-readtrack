#pragma once

#include <QString>

struct ScreenSize {
    int width = 0;
    int height = 0;
    int panelHeight = 0;
};

/* Initializes InkView (TASK_MAKEACTIVE) and returns the panel metrics.
 * inkview.h stays in this one TU; its macros collide with Qt. */
ScreenSize openInkViewScreen();
QString inkViewFontFamily();
QString inkViewLang(); /* e.g. "de", "en" */

/* --- Network, for the update check only ---------------------------------
 * The firmware owns the network stack (Wi-Fi association, TLS, certificates),
 * so the updater never opens a socket itself. Both calls block for as long as
 * the firmware takes; callers must repaint before entering them. */

/* Returned when the firmware exports no usable download function at all. */
constexpr int kInkViewNetUnsupported = -1000;

/* Brings Wi-Fi up if it isn't already. False means no connection. */
bool inkViewNetworkUp();

/* Downloads `url` to `dest`, following redirects. Returns 0 on success or a
 * negative InkView NET_E* code; `inkViewNetErrorText` renders one for the UI. */
int inkViewDownload(const QString &url, const QString &dest);
QString inkViewNetErrorText(int code);
