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

    function refresh() {
        shimOn = shim.installed();
        shimBox.checked = shimOn ? 1 : 0;
    }

    Component.onCompleted: refresh()
    onVisibleChanged: if (visible) refresh()

    /* Compact by design: these sit side by side, so they are sized by their
     * label rather than stretched across the page. Pressing inverts the fill —
     * on e-ink that is the one state change that reads instantly. */
    component ActionButton: Rectangle {
        id: btn

        property alias text: label.text
        property bool primary: false
        readonly property bool filled: primary !== area.pressed

        signal clicked()

        width: label.implicitWidth + Global.dp(28)
        height: Global.dp(52)
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
            styledFont: FontStyles.Body
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

    // The small print: same shape four times over, so it is one component.
    component Note: StyledText {
        width: parent ? parent.width : 0
        wrapMode: Text.Wrap
        styledFont: FontStyles.BodyS
        color: GlobalValues.defaultDisabledTextColor
    }

    Column {
        anchors.top: parent.top
        anchors.left: parent.left
        anchors.right: parent.right
        anchors.topMargin: Global.dp(10)
        anchors.leftMargin: GlobalValues.defaultViewSideMargin
        anchors.rightMargin: GlobalValues.defaultViewSideMargin
        spacing: Global.dp(12)

        // The launcher's own glyph beside the name, so the screen introduces
        // itself the way the tile does.
        Row {
            spacing: Global.dp(10)

            NavIcon {
                anchors.verticalCenter: parent.verticalCenter
                width: Global.dp(26)
                height: Global.dp(26)
                kind: "bars"
                active: true
            }

            StyledText {
                anchors.verticalCenter: parent.verticalCenter
                styledFont: FontStyles.Heading4
                // The serif the book title uses on the Overview: this is the
                // one place the app says its own name, and it can look like a
                // name rather than a path.
                font.family: "PT Serif"
                font.italic: true
                color: GlobalValues.defaultTextColor
                text: "pocketbook-statistics"
            }
        }

        Row {
            width: parent.width
            spacing: Global.dp(8)

            NavIcon {
                anchors.verticalCenter: parent.verticalCenter
                width: Global.dp(18)
                height: Global.dp(18)
                kind: "github"
                active: true
                opacity: 0.7
            }

            Note {
                anchors.verticalCenter: parent.verticalCenter
                width: parent.width - Global.dp(26)
                wrapMode: Text.NoWrap
                elide: Text.ElideMiddle
                text: "github.com/winst0niuss/pocketbook-statistics"
            }
        }

        StyledText {
            styledFont: FontStyles.Body
            color: GlobalValues.defaultTextColor
            text: Tr.t("about.version", { version: updater.currentVersion })
        }

        // Side by side: the second one only appears when there is something to
        // install, and the row must not push the page down when it does.
        Row {
            spacing: Global.dp(12)

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
        }

        StyledText {
            width: parent.width
            wrapMode: Text.Wrap
            styledFont: FontStyles.Body
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

        Note {
            visible: updater.state === "error" && updater.errorDetail !== ""
            text: updater.errorDetail
        }

        // Updating and tracking are separate concerns; the rule says so.
        Rectangle {
            width: parent.width
            height: Math.max(1, Math.round(
                GlobalValues.defaultSolidSeparatorThickness))
            color: GlobalValues.defaultTextColor
            opacity: 0.25
        }

        /* A setting, so it looks like one: the firmware's checkbox with the
         * explanation beside it, rather than a button that has to spell out
         * which way it is about to flip. */
        Row {
            width: parent.width
            spacing: Global.dp(12)

            CheckBox {
                id: shimBox

                anchors.verticalCenter: parent.verticalCenter
                onClicked: {
                    if (tab.shimOn)
                        shim.remove();
                    else
                        shim.install();
                    tab.refresh();
                }
            }

            Column {
                anchors.verticalCenter: parent.verticalCenter
                width: parent.width - shimBox.width - Global.dp(12)
                spacing: Global.dp(4)

                StyledText {
                    width: parent.width
                    wrapMode: Text.Wrap
                    styledFont: FontStyles.Body
                    color: GlobalValues.defaultTextColor
                    text: Tr.t("about.shim")
                }

                Note {
                    text: Tr.t("about.shimHint")
                }
            }
        }

        // What the last attempt managed to do. Worth the screen space while
        // the update path is young: if the firmware takes the process down,
        // this is all that is left of the run.
        Note {
            visible: updater.diagnostics !== ""
            // The log is up to a dozen lines and this screen does not scroll:
            // capped, because the last lines are the interesting ones and the
            // rest must not push the page over the navigation bar.
            maximumLineCount: 5
            elide: Text.ElideRight
            text: Tr.t("about.log") + "\n" + updater.diagnostics
        }
    }
}
