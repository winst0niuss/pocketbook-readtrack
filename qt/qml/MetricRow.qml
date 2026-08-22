import QtQuick
import com.pocketbook.controls

/* A framed row of figures, divided by hairlines — the reference design's main
 * device for grouping. On e-ink a border does the work a background tint would
 * do on a colour screen. */
Rectangle {
    id: box

    /* [{ v: "47", l: "минут сегодня" }, …] */
    property var items: []
    /* Empty means the theme's UI font; the Overview passes a serif so its
     * figures match the book above them. */
    property string figureFamily: ""
    property real cellHeight: Global.dp(84)

    height: cellHeight
    color: "transparent"
    border.width: Math.max(1, Math.round(GlobalValues.defaultSolidSeparatorThickness))
    border.color: GlobalValues.defaultBorderColor

    Row {
        anchors.fill: parent

        Repeater {
            model: box.items

            Item {
                required property var modelData
                required property int index

                width: box.width / Math.max(1, box.items.length)
                height: box.height

                Rectangle {
                    visible: index > 0
                    anchors.left: parent.left
                    anchors.top: parent.top
                    anchors.bottom: parent.bottom
                    anchors.topMargin: Global.dp(10)
                    anchors.bottomMargin: Global.dp(10)
                    width: Math.max(1, Math.round(GlobalValues.defaultSolidSeparatorThickness))
                    color: GlobalValues.defaultBorderColor
                }

                Column {
                    anchors.centerIn: parent
                    width: parent.width - Global.dp(16)
                    spacing: Global.dp(2)

                    StyledText {
                        anchors.horizontalCenter: parent.horizontalCenter
                        styledFont: FontStyles.Heading2
                        // Not "font.family" as the fallback — that binds the
                        // property to itself and loops.
                        font.family: box.figureFamily !== ""
                                     ? box.figureFamily
                                     : Qt.application.font.family
                        color: GlobalValues.defaultTextColor
                        text: modelData.v
                    }

                    StyledText {
                        width: parent.width
                        horizontalAlignment: Text.AlignHCenter
                        styledFont: FontStyles.BodyXS
                        color: GlobalValues.defaultDisabledTextColor
                        text: modelData.l
                        wrapMode: Text.Wrap
                        maximumLineCount: 2
                        elide: Text.ElideRight
                    }
                }
            }
        }
    }
}
