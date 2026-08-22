import QtQuick
import com.pocketbook.controls
import "."

/* Version and the manual update check. The bridge blocks while the firmware
 * talks to GitHub, so the button states here are what tells the user the app
 * is busy rather than stuck. */
Item {
    id: tab

    readonly property bool busy: updater.state === "checking"
                                 || updater.state === "downloading"
                                 || updater.state === "ready"

    // Tapping a tab-sized target is the whole interaction here, so the button
    // follows the firmware's list-item height instead of a text-sized box.
    component ActionButton: Rectangle {
        id: btn

        property alias text: label.text

        signal clicked()

        width: Global.dp(340)
        height: GlobalValues.defaultListItemHeight
        color: GlobalValues.defaultBackgroundColor
        border.width: GlobalValues.dialogBorderWidth
        border.color: btn.enabled ? GlobalValues.defaultTextColor
                                  : GlobalValues.defaultDisabledTextColor

        StyledText {
            id: label

            anchors.centerIn: parent
            styledFont: FontStyles.BodyLBold
            color: btn.enabled ? GlobalValues.defaultTextColor
                               : GlobalValues.defaultDisabledTextColor
        }

        MouseArea {
            anchors.fill: parent
            onClicked: btn.clicked()
        }
    }

    Column {
        anchors.top: parent.top
        anchors.left: parent.left
        anchors.right: parent.right
        anchors.leftMargin: GlobalValues.defaultViewSideMargin
        anchors.rightMargin: GlobalValues.defaultViewSideMargin
        spacing: Global.dp(20)

        Item { width: 1; height: Global.dp(24) }

        StyledText {
            width: parent.width
            // Heading3, not Heading2: the repository name is long enough that
            // the larger size runs off a 758 px screen.
            styledFont: FontStyles.Heading3
            color: GlobalValues.defaultTextColor
            // The repository name: this is where an update comes from, so it
            // is the name worth showing next to the version.
            text: "pocketbook-statistics"
            elide: Text.ElideRight
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
                case "ready":       return Tr.t("about.ready");
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

        StyledText {
            width: parent.width
            wrapMode: Text.Wrap
            styledFont: FontStyles.BodyS
            color: GlobalValues.defaultDisabledTextColor
            text: Tr.t("about.privacy")
        }

        // What the last attempt managed to do. Worth the screen space while
        // the update path is young: if the firmware takes the process down,
        // this is all that is left of the run.
        StyledText {
            width: parent.width
            visible: updater.diagnostics !== ""
            wrapMode: Text.Wrap
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
