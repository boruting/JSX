/**
 * @author boru
 * @name  界面效果标注
 * @weixin JackdawTin
 * @date 2020-07-31 功能尝试 现有 未知BUG 文本层的段落对齐方式左对齐方式创建的自己获取不到 justification 返回NaN 
 *                   缺少返回颜色ID功能
 */
$.evalFile(File($.fileName).path + "/lib/Bounds.jsx");
$.evalFile(File($.fileName).path + "/importLnkd.jsx");


var doc = app.activeDocument;
//var layer = doc.activeLayer;
var textLayer = doc.activeLayer;
//var textLCR = layer.textItem.justification;

/**
 * 生成文本图层 paragraph
HistoryState
 */
var main = function() {
    var layers = app.activeDocument.layers;
    var txtRCL = textParagraph(textLayer.textItem.justification); //返回文字段落对齐方式
    var group = nameGetLayer(layers);
    //var layerSet = doc.layerSets.add(); //创建图层组

    var txt = doc.artLayers.add();
    txt.kind = LayerKind.TEXT;
    var textItem = txt.textItem;
    textItem.font = "SimHei";
    textItem.size = 30;
    textItem.color.rgb["hexValue"] = "000000";
    var textSize = textLayer.textItem.size + "";
    //textItem.contents = "3 "+textSize.split(" ")[0]+"px "+ txtRCL; //填充给内容
    textItem.contents = textSize.split(" ")[0] + "px " + txtRCL; //填充给内容

    if (group != undefined) {
        var textLayer_ = getLayerBounds(textLayer, "boundsNoEffects");
        layerMove(textLayer_.x, textLayer_.y); //移动图层
        txt.move(group, ElementPlacement.INSIDE); //图层放入图层组
    }

    //rasterizeLayer();




}
if (textLayer.kind == "LayerKind.TEXT") {
    main();
}

function nameGetLayer(layers) {

    for (var i = 0, len = layers.length; i < len; i++) {
        var layer = layers[i];
        if (layer.typename == "LayerSet" && layer.name == "标注") {

            return layer;
        }
        if (layer.typename == "LayerSet" && layer.layers.length > 0) {

            return nameGetLayer(layer.layers);
        }

    }

}
/**
*

*/
function textParagraph(textLCR) {

    switch (textLCR) {

        case Justification.LEFT:
            $.writeln(textLCR + "  左对齐");
            var txt = "左对齐";
            return txt;
        case Justification.CENTER:
            $.writeln(textLCR + "  居中");
            var txt = "居中";
            return txt;
        case Justification.RIGHT:
            $.writeln(textLCR + "  右对齐");
            var txt = "右对齐";
            return txt;
        case Justification.LEFTJUSTIFIED:
            $.writeln(textLCR + "  两侧对齐,最后一行左对齐");
            var txt = "两侧-左";
            return txt;
        case Justification.CENTERJUSTIFIED:
            $.writeln(textLCR + "  两侧对齐,最后一行居中");
            var txt = "两侧-中";
            return txt;
        case Justification.RIGHTJUSTIFIED:
            $.writeln(textLCR + "  两侧对齐,最后一行右对齐");
            var txt = "两侧-右";
            return txt;
        case Justification.FULLYJUSTIFIED:
            $.writeln(textLCR + "  两侧对齐,全部对齐");
            var txt = "两侧-全部";
            return txt;
        default:
            $.writeln(textLCR + "  错误");
            break;
    }
}
// if (layer.kind == "LayerKind.TEXT") {

//     var textItem = layer.textItem;
//     textItem.size.convert("px");
//     var txtSize = textItem.size.value;
//     var txtColor = textItem.color.rgb["hexValue"];

//     switch (txtColor) {
//         case "E9E2B5":
//             $.writeln(textItem.contents + "  1号字色");
//             var colorID = "1号字色";
//             newText();
//             break;
//         case "13D73D":
//             $.writeln(textItem.contents + "  2号字色");
//             break;
//         case "137DD7":
//             $.writeln(textItem.contents + "  3号字色");
//             break;
//         case "D7B813":
//             $.writeln(textItem.contents + "  4号字色");
//             break;
//         case "D79013":
//             $.writeln(textItem.contents + "  5号字色");
//             break;
//         case "D72113":
//             $.writeln(textItem.contents + "  6号字色");
//             break;
//         case "B6A579":
//             $.writeln(textItem.contents + "  7号字色");
//             break;
//         case "7E7E7E":
//             $.writeln(textItem.contents + "  灰显");
//             break;
//         default:
//             break;
//     }
//     // $.writeln(textItem.size.value);
//     // $.writeln(textItem.color.rgb["hexValue"]);
// }