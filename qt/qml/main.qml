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

    /* Info sits in the header, opposite the firmware's home button: it is a
     * detour from the app rather than one of its screens, and the bottom bar
     * is for the screens. Drawn over AppHeader, which leaves its right side
     * empty, and matched to the home button beside it — same height share of
     * the bar, full-strength ink, and a line as thin as the firmware's own
     * icons rather than the heavier weight the bottom bar uses. */
    Item {
        id: infoButton

        anchors.right: appHeader.right
        anchors.rightMargin: GlobalValues.defaultViewSideMargin
        anchors.verticalCenter: appHeader.verticalCenter
        // A square the height of the header, so the touch target matches the
        // firmware button's without the glyph growing with it.
        width: appHeader.height
        height: appHeader.height
        z: 1

        NavIcon {
            anchors.centerIn: parent
            width: Math.round(appHeader.height * 0.42)
            height: width
            kind: "info"
            // A header icon is never "inactive": the firmware's home button is
            // solid black whatever screen you are on.
            opacity: 1.0
            strokeRatio: 0.055
        }

        MouseArea {
            anchors.fill: parent
            // Tapping it again goes back where you were, so the button is a
            // toggle rather than a one-way door.
            onClicked: nav.current = nav.current === nav.infoIndex
                       ? nav.lastScreen : nav.infoIndex
        }
    }

    /* Navigation along the bottom edge, icon over label — the screens only;
     * info lives in the header. Equal cells are honest here: the icons are all
     * the same width, unlike the word-sized tabs this replaced. */
    Item {
        id: nav

        anchors.bottom: parent.bottom
        anchors.left: parent.left
        anchors.right: parent.right
        height: Global.dp(70)

        property int current: 0
        // Where the info button returns to.
        property int lastScreen: 0
        onCurrentChanged: if (current !== infoIndex) lastScreen = current

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
                model: nav.labels.length

                Item {
                    id: navCell

                    required property int index

                    readonly property bool active: index === nav.current

                    width: nav.width / nav.labels.length
                    height: nav.height

                    Column {
                        anchors.horizontalCenter: parent.horizontalCenter
                        anchors.top: parent.top
                        spacing: Global.dp(2)

                        NavIcon {
                            anchors.horizontalCenter: parent.horizontalCenter
                            width: Global.dp(32)
                            height: Global.dp(32)
                            kind: nav.icons[navCell.index]
                            active: navCell.active
                        }

                        StyledText {
                            anchors.horizontalCenter: parent.horizontalCenter
                            // One size only: a bold variant would change the
                            // label's width and shuffle the row on every tap.
                            styledFont: FontStyles.BodyXS
                            color: GlobalValues.defaultTextColor
                            opacity: navCell.active ? 1.0 : 0.6
                            text: nav.labels[navCell.index]
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
