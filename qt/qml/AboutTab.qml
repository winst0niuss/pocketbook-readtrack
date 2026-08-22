import QtQuick
import com.pocketbook.controls
import "."

/* Version and the manual update check. The bridge blocks while the firmware
 * talks to GitHub, so the button states here are what tells the user the app
 * is busy rather than stuck. */
Item {
    id: tab

    /* There is no scrolling on this screen — the column has to fit. It grew
     * past the bottom edge once and painted over the navigation bar, so the
     * content is clipped as a backstop and the texts are kept short. */
    clip: true

    readonly property bool busy: updater.state === "checking"
                                 || updater.state === "downloading"
                                 || updater.state === "ready"

    /* Whether the open-book shim is installed. Read on show rather than bound:
     * it lives in two files on the user partition, and nothing signals a
     * change but our own buttons. */
    property bool shimOn: false

    function refresh() { shimOn = shim.installed(); }

    Component.onCompleted: refresh()
    onVisibleChanged: if (visible) refresh()

    /* The screen's only interactive element, so it is worth drawing properly:
     * the theme's own button height and corner radius rather than a hand-picked
     * box, full column width so the three of them line up, and a fill that
     * inverts on press — on e-ink an inversion is the one state change that is
     * unmistakable at a glance.
     *
     * "primary" fills the button instead of outlining it, for the action the
     * screen is actually offering (installing an update); the rest stay
     * outlined so a page of solid black slabs does not shout. */
    component ActionButton: Rectangle {
        id: btn

        property alias text: label.text
        property bool primary: false
        readonly property bool filled: primary !== area.pressed

        signal clicked()

        width: parent.width
        height: GlobalValues.defaultTextButtonHeight
        radius: GlobalValues.defaultElementBorderRadius
        color: btn.filled && btn.enabled ? GlobalValues.defaultTextColor
                                         : GlobalValues.defaultBackgroundColor
        border.width: btn.filled && btn.enabled
                      ? 0
                      : Math.max(1, Math.round(
                            GlobalValues.defaultSolidSeparatorThickness))
        border.color: btn.enabled ? GlobalValues.defaultTextColor
                                  : GlobalValues.defaultDisabledTextColor

        StyledText {
            id: label

            anchors.centerIn: parent
            width: parent.width - 2 * Global.dp(16)
            horizontalAlignment: Text.AlignHCenter
            elide: Text.ElideRight
            styledFont: btn.primary ? FontStyles.BodyLBold : FontStyles.BodyL
            color: !btn.enabled ? GlobalValues.defaultDisabledTextColor
                                : (btn.filled ? GlobalValues.defaultBackgroundColor
                                              : GlobalValues.defaultTextColor)
        }

        MouseArea {
            id: area

            anchors.fill: parent
            enabled: btn.enabled
            onClicked: btn.clicked()
        }
    }

    Column {
        anchors.top: parent.top
        anchors.left: parent.left
        anchors.right: parent.right
        anchors.leftMargin: GlobalValues.defaultViewSideMargin
        anchors.rightMargin: GlobalValues.defaultViewSideMargin
        spacing: Global.dp(16)

        Item { width: 1; height: Global.dp(24) }

        StyledText {
            width: parent.width
            styledFont: FontStyles.Heading3
            color: GlobalValues.defaultTextColor
            text: "pocketbook-statistics"
            elide: Text.ElideRight
        }

        StyledText {
            width: parent.width
            styledFont: FontStyles.BodyS
            color: GlobalValues.defaultTextColor
            opacity: 0.7
            text: "github.com/winst0niuss/pocketbook-statistics"
            elide: Text.ElideMiddle
        }

        StyledText {
            styledFont: FontStyles.BodyL
            color: GlobalValues.defaultTextColor
            text: Tr.t("about.version", { version: updater.currentVersion })
        }

        Item { width: 1; height: Global.dp(8) }

        ActionButton {
            text: Tr.t("about.check")
            enabled: !tab.busy
            onClicked: updater.check()
        }

        ActionButton {
            visible: updater.state === "available"
            primary: true
            text: Tr.t("about.install", { version: updater.latestVersion })
            enabled: !tab.busy
            onClicked: updater.install()
        }

        StyledText {
            width: parent.width
            wrapMode: Text.Wrap
            styledFont: FontStyles.BodyL
            color: GlobalValues.defaultTextColor
            visible: text !== ""
            text: {
                switch (updater.state) {
                case "checking":    return Tr.t("about.checking");
                case "uptodate":    return Tr.t("about.uptodate");
                case "available":   return Tr.t("about.available",
                                                { version: updater.latestVersion });
                case "downloading": return Tr.t("about.downloading");
                case "ready":       return Tr.t("about.ready", { app: Tr.t("app.title") });
                case "error":       return Tr.t(updater.errorKey);
                default:            return "";
                }
            }
        }

        StyledText {
            width: parent.width
            wrapMode: Text.Wrap
            styledFont: FontStyles.BodyS
            color: GlobalValues.defaultDisabledTextColor
            visible: updater.state === "error" && updater.errorDetail !== ""
            text: updater.errorDetail
        }

        Item { width: 1; height: Global.dp(12) }

        /* Nothing of ours starts at boot — the firmware has no place for that
         * outside its own partition. This is the way around it: the firmware
         * runs our shim when a book is opened, and the shim starts the daemon
         * before handing the book to the reader. */
        StyledText {
            width: parent.width
            wrapMode: Text.Wrap
            styledFont: FontStyles.BodyL
            color: GlobalValues.defaultTextColor
            text: Tr.t("about.shim")
        }

        StyledText {
            width: parent.width
            wrapMode: Text.Wrap
            styledFont: FontStyles.BodyS
            color: GlobalValues.defaultDisabledTextColor
            text: Tr.t("about.shimHint")
        }

        ActionButton {
            text: tab.shimOn ? Tr.t("about.shimOff") : Tr.t("about.shimOn")
            onClicked: {
                if (tab.shimOn)
                    shim.remove();
                else
                    shim.install();
                tab.refresh();
            }
        }


        StyledText {
            width: parent.width
            wrapMode: Text.Wrap
            styledFont: FontStyles.BodyS
            color: GlobalValues.defaultDisabledTextColor
            text: Tr.t("about.privacy", { app: Tr.t("app.title") })
        }

        // What the last attempt managed to do. Worth the screen space while
        // the update path is young: if the firmware takes the process down,
        // this is all that is left of the run.
        StyledText {
            width: parent.width
            visible: updater.diagnostics !== ""
            wrapMode: Text.Wrap
            // The log is up to a dozen lines and this screen does not scroll:
            // capped, because the last lines are the interesting ones and the
            // rest must not push the page over the navigation bar.
            maximumLineCount: 6
            elide: Text.ElideRight
            styledFont: FontStyles.BodyS
            color: GlobalValues.defaultDisabledTextColor
            text: Tr.t("about.log") + "\n" + updater.diagnostics
        }
    }

    /* The handover script is already waiting for this process to go away. */
    Timer {
        running: updater.state === "ready"
        interval: 2500
        onTriggered: Qt.quit()
    }
}
