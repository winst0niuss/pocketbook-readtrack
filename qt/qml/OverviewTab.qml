import QtQuick
import com.pocketbook.controls
import "."

/* Everything worth knowing on one screen, in the order a reader asks for it:
 * the book in hand, how it is going, then the library behind it. Modelled on
 * Kobo's reading-stats page — no sparkline, no streak, no second thought. */
Item {
    id: tab

    property var ov: ({})
    property var book: ({})

    function refresh() {
        ov = stats.overall();
        book = stats.currentBook();
    }

    Component.onCompleted: refresh()
    onVisibleChanged: if (visible) refresh()

    readonly property real sideMargin: GlobalValues.defaultViewSideMargin

    /* The firmware sets Roboto for its own UI and PT Serif for reading. The
     * reference page uses a serif for the book and its figures, which reads as
     * "this is about books" rather than "this is a settings screen". If the
     * family is missing, Qt falls back to the UI font and nothing breaks. */
    readonly property string serif: "PT Serif"

    Column {
        anchors.top: parent.top
        anchors.left: parent.left
        anchors.right: parent.right
        anchors.leftMargin: tab.sideMargin
        anchors.rightMargin: tab.sideMargin
        spacing: Global.dp(18)

        Item { width: 1; height: Global.dp(14) }

        // The book in hand
        Row {
            width: parent.width
            spacing: Global.dp(20)
            visible: tab.book.ok === true

            Image {
                id: cover

                source: tab.book.coverUrl || ""
                visible: (tab.book.coverUrl || "") !== ""
                width: Global.dp(145)
                height: Global.dp(218)
                fillMode: Image.PreserveAspectFit
            }

            Column {
                width: parent.width - (cover.visible ? cover.width + Global.dp(20) : 0)
                spacing: Global.dp(8)

                StyledText {
                    width: parent.width
                    styledFont: FontStyles.Heading3
                    font.family: tab.serif
                    font.italic: true
                    color: GlobalValues.defaultTextColor
                    text: tab.book.title || ""
                    wrapMode: Text.Wrap
                    maximumLineCount: 2
                    elide: Text.ElideRight
                }

                StyledText {
                    width: parent.width
                    styledFont: FontStyles.Body
                    color: GlobalValues.defaultTextColor
                    opacity: 0.7
                    text: tab.book.author || ""
                    elide: Text.ElideRight
                }

                Item { width: 1; height: Global.dp(4) }

                StyledText {
                    styledFont: FontStyles.Body
                    color: GlobalValues.defaultTextColor
                    text: Tr.t("overview.bookProgress", { percent: tab.book.percent || 0 })
                }

                Rectangle {
                    width: parent.width
                    height: Global.dp(12)
                    color: "transparent"
                    border.width: Math.max(1, Math.round(
                        GlobalValues.defaultSolidSeparatorThickness))
                    border.color: GlobalValues.defaultTextColor

                    Rectangle {
                        anchors.left: parent.left
                        anchors.top: parent.top
                        anchors.bottom: parent.bottom
                        anchors.margins: Global.dp(2)
                        // A started book always shows a mark: at 1 % the bar
                        // would otherwise look the same as an unopened one,
                        // which is exactly the case worth seeing.
                        width: (tab.book.percent || 0) > 0
                               ? Math.max(Global.dp(6),
                                          (parent.width - Global.dp(4))
                                          * tab.book.percent / 100)
                               : 0
                        color: GlobalValues.defaultTextColor
                    }
                }

                StyledText {
                    width: parent.width
                    visible: (tab.book.leftSecs || 0) > 0
                    styledFont: FontStyles.BodyS
                    color: GlobalValues.defaultTextColor
                    opacity: 0.7
                    text: Tr.t("overview.left", { time: Tr.fmtHM(tab.book.leftSecs) })
                }
            }
        }

        StyledText {
            visible: tab.book.ok !== true
            styledFont: FontStyles.Body
            color: GlobalValues.defaultTextColor
            opacity: 0.7
            text: Tr.t("overview.noBook")
        }

        // How the reading itself is going
        MetricRow {
            width: parent.width
            figureFamily: tab.serif
            items: [
                { v: ((tab.book.bookSecs || 0) / 3600).toFixed(1),
                  l: Tr.t("overview.hoursOfReading") },
                { v: Math.round(tab.ov.avgSessionMin || 0) + "",
                  l: Tr.t("overview.minPerSession") },
                // Per hour rather than per minute: a real pace is 0.6 pages a
                // minute, which reads as a broken counter.
                { v: Math.round(tab.ov.pagesPerHour || 0) + "",
                  l: Tr.t("overview.pagesPerHour") }
            ]
        }
    }

    // The library behind the book, along the bottom edge.
    Column {
        id: allBooks

        anchors.bottom: parent.bottom
        anchors.bottomMargin: Global.dp(16)
        anchors.left: parent.left
        anchors.right: parent.right
        anchors.leftMargin: tab.sideMargin
        anchors.rightMargin: tab.sideMargin
        spacing: Global.dp(14)

        Column {
            width: parent.width
            spacing: Global.dp(6)

            StyledText {
                styledFont: FontStyles.Caption1
                color: GlobalValues.defaultTextColor
                opacity: 0.7
                text: Tr.t("overview.allBooks")
            }

            Rectangle {
                width: parent.width
                height: Math.max(1, Math.round(
                    GlobalValues.defaultSolidSeparatorThickness))
                color: GlobalValues.defaultTextColor
                opacity: 0.25
            }
        }

        Row {
            width: parent.width
            spacing: Global.dp(16)

            Item {
                width: Global.dp(128)
                height: Global.dp(128)

                Canvas {
                    id: donut

                    anchors.fill: parent
                    antialiasing: true

                    readonly property real frac: tab.ov.finishedFrac || 0

                    onFracChanged: requestPaint()
                    onPaint: {
                        var ctx = getContext("2d");
                        ctx.reset();
                        var cx = width / 2, cy = height / 2;
                        var r = Math.min(cx, cy) - Global.dp(11);
                        ctx.lineWidth = Global.dp(22);

                        ctx.beginPath();
                        ctx.arc(cx, cy, r, 0, 2 * Math.PI);
                        // Not defaultBorderColor: it is black on this
                        // firmware, and the ring would vanish into its fill.
                        ctx.strokeStyle = GlobalValues.defaultTextColor;
                        ctx.globalAlpha = 0.22;
                        ctx.stroke();
                        ctx.globalAlpha = 1.0;

                        if (frac > 0) {
                            ctx.beginPath();
                            ctx.arc(cx, cy, r, -Math.PI / 2,
                                    -Math.PI / 2 + frac * 2 * Math.PI);
                            ctx.strokeStyle = GlobalValues.defaultTextColor;
                            ctx.stroke();
                        }
                    }
                }

                StyledText {
                    anchors.centerIn: parent
                    styledFont: FontStyles.Heading4
                    font.family: tab.serif
                    color: GlobalValues.defaultTextColor
                    text: Math.round((tab.ov.finishedFrac || 0) * 100) + " %"
                }
            }

            StyledText {
                anchors.verticalCenter: parent.verticalCenter
                width: Global.dp(150)
                styledFont: FontStyles.BodyS
                color: GlobalValues.defaultTextColor
                opacity: 0.7
                text: Tr.t("overview.donutCaption")
                wrapMode: Text.Wrap
            }

            Repeater {
                model: [
                    { v: (tab.ov.booksFinished || 0) + "", l: Tr.t("overview.booksFinished") },
                    { v: (tab.ov.totalHours || 0).toFixed(1), l: Tr.t("overview.totalHours") }
                ]

                Column {
                    required property var modelData

                    anchors.verticalCenter: parent.verticalCenter
                    width: (parent.width - Global.dp(112) - Global.dp(150)
                            - 3 * Global.dp(16)) / 2
                    spacing: Global.dp(2)

                    StyledText {
                        styledFont: FontStyles.Heading2
                        font.family: tab.serif
                        color: GlobalValues.defaultTextColor
                        text: modelData.v
                    }

                    StyledText {
                        width: parent.width
                        styledFont: FontStyles.BodyS
                        color: GlobalValues.defaultTextColor
                        opacity: 0.7
                        text: modelData.l
                        wrapMode: Text.Wrap
                    }
                }
            }
        }
    }
}
