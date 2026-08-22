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

    /* Tab bar. Each tab is only as wide as its own label, and the leftover
     * width is split into equal gaps — including before the first tab and
     * after the last — so the spacing between "Обзор" and "Календарь" is the
     * same as between "Календарь" and "Год". Equal-width cells put equal boxes
     * around unequal words, which is what made the gaps look wrong.
     *
     * Every label is measured in its bold form, the one the active tab uses,
     * so switching tabs cannot shift its neighbours sideways. */
    Item {
        id: tabBar

        anchors.top: appHeader.bottom
        anchors.left: parent.left
        anchors.right: parent.right
        height: GlobalValues.defaultListItemHeight

        property int current: 0

        readonly property var labels: [Tr.t("nav.overview"), Tr.t("nav.streak"),
                                       Tr.t("nav.calendar"), Tr.t("nav.year")]
        // The last tab is the info glyph rather than a word.
        readonly property int infoIndex: labels.length
        readonly property real infoSize: Global.dp(34)
        readonly property real gap:
            Math.max(Global.dp(16),
                     (width - metrics.implicitWidth - infoSize)
                     / (labels.length + 2))

        // Off-screen twin of the row, used only for its width. Bold throughout:
        // see the note above.
        Row {
            id: metrics

            visible: false
            spacing: 0

            Repeater {
                model: tabBar.labels

                StyledText {
                    required property string modelData
                    styledFont: FontStyles.BodyLBold
                    text: modelData
                }
            }
        }

        Row {
            anchors.left: parent.left
            anchors.leftMargin: tabBar.gap
            height: parent.height
            spacing: tabBar.gap

            Repeater {
                model: tabBar.labels

                Item {
                    required property string modelData
                    required property int index

                    readonly property bool active: index === tabBar.current

                    width: boldLabel.implicitWidth
                    height: tabBar.height

                    // Present but hidden when inactive: it owns the width.
                    StyledText {
                        id: boldLabel

                        anchors.centerIn: parent
                        visible: parent.active
                        styledFont: FontStyles.BodyLBold
                        color: GlobalValues.defaultTextColor
                        text: modelData
                    }

                    StyledText {
                        anchors.centerIn: parent
                        visible: !parent.active
                        styledFont: FontStyles.BodyL
                        color: GlobalValues.defaultDisabledTextColor
                        text: modelData
                    }

                    Rectangle {
                        visible: parent.active
                        anchors.bottom: parent.bottom
                        anchors.horizontalCenter: parent.horizontalCenter
                        width: parent.width + Global.dp(8)
                        height: Global.dp(4)
                        color: GlobalValues.defaultTextColor
                    }

                    MouseArea {
                        // Reaches past the label into half the gap on each
                        // side, so a tab stays easy to hit on e-ink.
                        anchors.fill: parent
                        anchors.margins: -tabBar.gap / 2
                        onClicked: tabBar.current = index
                    }
                }

            }
        }

        // Info tab: an "i" in a circle, drawn rather than typed — the glyph
        // U+24D8 is not in every firmware font.
        Item {
            id: infoTab

            readonly property bool active: tabBar.current === tabBar.infoIndex

            anchors.right: parent.right
            anchors.rightMargin: tabBar.gap
            width: tabBar.infoSize
            height: tabBar.height

            Rectangle {
                anchors.centerIn: parent
                width: tabBar.infoSize
                height: width
                radius: width / 2
                color: "transparent"
                border.width: Math.max(1, Global.dp(2))
                border.color: infoTab.active
                              ? GlobalValues.defaultTextColor
                              : GlobalValues.defaultDisabledTextColor

                StyledText {
                    anchors.centerIn: parent
                    styledFont: infoTab.active ? FontStyles.BodyLBold
                                               : FontStyles.BodyL
                    color: infoTab.active
                           ? GlobalValues.defaultTextColor
                           : GlobalValues.defaultDisabledTextColor
                    text: "i"
                }
            }

            Rectangle {
                visible: infoTab.active
                anchors.bottom: parent.bottom
                anchors.horizontalCenter: parent.horizontalCenter
                width: parent.width + Global.dp(8)
                height: Global.dp(4)
                color: GlobalValues.defaultTextColor
            }

            MouseArea {
                anchors.fill: parent
                anchors.margins: -tabBar.gap / 2
                onClicked: tabBar.current = tabBar.infoIndex
            }
        }

        Rectangle {
            anchors.bottom: parent.bottom
            anchors.left: parent.left
            anchors.right: parent.right
            height: GlobalValues.defaultSolidSeparatorThickness
            color: GlobalValues.defaultBorderColor
        }
    }

    FocusScope {
        anchors.top: tabBar.bottom
        anchors.bottom: parent.bottom
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
            visible: tabBar.current === 0
        }

        StreakTab {
            anchors.fill: parent
            visible: tabBar.current === 1
        }

        CalendarTab {
            anchors.fill: parent
            visible: tabBar.current === 2
        }

        YearTab {
            anchors.fill: parent
            visible: tabBar.current === 3
        }

        AboutTab {
            anchors.fill: parent
            visible: tabBar.current === tabBar.infoIndex
        }
    }
}
