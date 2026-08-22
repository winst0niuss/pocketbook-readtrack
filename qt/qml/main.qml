import QtQuick
import QtQuick.Window
import com.pocketbook.controls
import "."

Window {
    id: root

    visible: true
    width: screenW
    height: screenH - panelH
    color: GlobalValues.defaultBackgroundColor
    // The header says what the app is, in the reader's language;
    // AppHeader upper-cases it itself.
    title: Tr.t("app.title")

    AppHeader {
        id: appHeader

        anchors.top: parent.top
        anchors.left: parent.left
        anchors.right: parent.right

        title: root.title
        onClose: Qt.quit()
    }

    /* Navigation along the bottom edge, icon over label. Six equal zones: the
     * icons are the same width, so equal cells here are honest, unlike the
     * word-sized tabs this replaces. */
    Item {
        id: nav

        anchors.bottom: parent.bottom
        anchors.left: parent.left
        anchors.right: parent.right
        height: Global.dp(70)

        property int current: 0

        readonly property var labels: [Tr.t("nav.overview"), Tr.t("nav.calendar")]
        readonly property var icons: ["home", "calendar"]
        readonly property int infoIndex: labels.length

        Rectangle {
            anchors.top: parent.top
            anchors.left: parent.left
            anchors.right: parent.right
            height: Math.max(1, Math.round(GlobalValues.defaultSolidSeparatorThickness))
            color: GlobalValues.defaultBorderColor
        }

        Row {
            anchors.fill: parent
            anchors.topMargin: Global.dp(6)

            Repeater {
                model: nav.labels.length + 1

                Item {
                    id: navCell

                    required property int index

                    readonly property bool active: index === nav.current
                    readonly property bool isInfo: index === nav.infoIndex

                    width: nav.width / (nav.labels.length + 1)
                    height: nav.height

                    Column {
                        anchors.horizontalCenter: parent.horizontalCenter
                        anchors.top: parent.top
                        spacing: Global.dp(2)

                        NavIcon {
                            anchors.horizontalCenter: parent.horizontalCenter
                            width: Global.dp(32)
                            height: Global.dp(32)
                            kind: navCell.isInfo ? "info" : nav.icons[navCell.index]
                            active: navCell.active
                        }

                        StyledText {
                            anchors.horizontalCenter: parent.horizontalCenter
                            // One size only: a bold variant would change the
                            // label's width and shuffle the row on every tap.
                            styledFont: FontStyles.BodyXS
                            color: GlobalValues.defaultTextColor
                            opacity: navCell.active ? 1.0 : 0.6
                            text: navCell.isInfo ? Tr.t("nav.about")
                                                 : nav.labels[navCell.index]
                        }
                    }

                    MouseArea {
                        anchors.fill: parent
                        onClicked: nav.current = index
                    }
                }
            }
        }
    }

    FocusScope {
        anchors.top: appHeader.bottom
        anchors.bottom: nav.top
        anchors.left: parent.left
        anchors.right: parent.right
        focus: true

        Keys.onPressed: function (event) {
            if (event.key === Qt.Key_Back || event.key === Qt.Key_Escape
                    || event.key === Qt.Key_Home) {
                event.accepted = true;
                Qt.quit();
            }
        }

        OverviewTab {
            anchors.fill: parent
            visible: nav.current === 0
        }

        CalendarTab {
            anchors.fill: parent
            visible: nav.current === 1
        }

        AboutTab {
            anchors.fill: parent
            visible: nav.current === nav.infoIndex
        }
    }
}
