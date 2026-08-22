import QtQuick
import com.pocketbook.controls

/* Line-art icons for the bottom navigation, drawn rather than typed: the
 * firmware fonts have no dingbats we can rely on, and an emoji would render as
 * a blank box on some devices. Stroke width stays constant with size so they
 * sit at the same weight as the firmware's own icons. */
Canvas {
    id: icon

    // "home" | "flame" | "calendar" | "books" | "bars" | "info"
    property string kind: "home"
    property bool active: false
    property color ink: GlobalValues.defaultTextColor

    /* Stroke weight as a share of the icon's size. The bar draws the active
     * icon heavier; the header overrides this with a thinner line so the info
     * glyph matches the firmware's own home button beside it. */
    property real strokeRatio: active ? 0.1 : 0.075

    /* Inactive icons are the text colour at reduced opacity rather than the
     * theme's disabled grey, which on e-ink is nearly white and made the whole
     * bar look switched off. Opacity keeps them legible in both themes. */
    opacity: active ? 1.0 : 0.6

    antialiasing: true
    onKindChanged: requestPaint()
    onActiveChanged: requestPaint()
    onStrokeRatioChanged: requestPaint()
    onInkChanged: requestPaint()

    onPaint: {
        var ctx = getContext("2d");
        ctx.reset();

        var w = width, h = height;
        var s = Math.min(w, h);
        var pad = s * 0.1;
        var x0 = (w - s) / 2 + pad, y0 = (h - s) / 2 + pad, d = s - 2 * pad;

        ctx.strokeStyle = ink;
        ctx.fillStyle = ink;
        // The active icon is drawn heavier as well as darker: on a mono screen
        // weight reads faster than shade.
        ctx.lineWidth = Math.max(1.5, s * strokeRatio);
        ctx.lineJoin = "round";
        ctx.lineCap = "round";

        if (kind === "home") {
            ctx.beginPath();
            ctx.moveTo(x0, y0 + d * 0.45);
            ctx.lineTo(x0 + d / 2, y0 + d * 0.06);
            ctx.lineTo(x0 + d, y0 + d * 0.45);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x0 + d * 0.14, y0 + d * 0.42);
            ctx.lineTo(x0 + d * 0.14, y0 + d * 0.95);
            ctx.lineTo(x0 + d * 0.86, y0 + d * 0.95);
            ctx.lineTo(x0 + d * 0.86, y0 + d * 0.42);
            ctx.stroke();
        } else if (kind === "flame") {
            // A streak: one flame outline, no inner tongue — it turns to mush
            // at 40 px on a mono screen.
            ctx.beginPath();
            ctx.moveTo(x0 + d * 0.5, y0 + d * 0.04);
            ctx.bezierCurveTo(x0 + d * 0.86, y0 + d * 0.34,
                              x0 + d * 0.92, y0 + d * 0.66,
                              x0 + d * 0.5, y0 + d * 0.97);
            ctx.bezierCurveTo(x0 + d * 0.08, y0 + d * 0.66,
                              x0 + d * 0.14, y0 + d * 0.34,
                              x0 + d * 0.5, y0 + d * 0.04);
            ctx.stroke();
        } else if (kind === "calendar") {
            ctx.strokeRect(x0, y0 + d * 0.14, d, d * 0.82);
            ctx.beginPath();
            ctx.moveTo(x0, y0 + d * 0.38);
            ctx.lineTo(x0 + d, y0 + d * 0.38);
            ctx.moveTo(x0 + d * 0.28, y0 + d * 0.02);
            ctx.lineTo(x0 + d * 0.28, y0 + d * 0.24);
            ctx.moveTo(x0 + d * 0.72, y0 + d * 0.02);
            ctx.lineTo(x0 + d * 0.72, y0 + d * 0.24);
            ctx.stroke();
        } else if (kind === "books") {
            // Two volumes side by side, the right one leaning.
            ctx.strokeRect(x0 + d * 0.06, y0 + d * 0.12, d * 0.34, d * 0.8);
            ctx.save();
            ctx.translate(x0 + d * 0.66, y0 + d * 0.52);
            ctx.rotate(0.16);
            ctx.strokeRect(-d * 0.17, -d * 0.4, d * 0.34, d * 0.8);
            ctx.restore();
        } else if (kind === "bars") {
            var bw = d * 0.22;
            var heights = [0.38, 0.62, 0.92];
            for (var i = 0; i < 3; i++) {
                var bx = x0 + d * 0.06 + i * (bw + d * 0.11);
                var bh = d * heights[i];
                ctx.strokeRect(bx, y0 + d - bh, bw, bh);
            }
        } else if (kind === "info") {
            ctx.beginPath();
            ctx.arc(x0 + d / 2, y0 + d / 2, d / 2, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(x0 + d / 2, y0 + d * 0.28, Math.max(1, d * 0.05), 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(x0 + d / 2, y0 + d * 0.44);
            ctx.lineTo(x0 + d / 2, y0 + d * 0.76);
            ctx.stroke();
        }
    }
}
