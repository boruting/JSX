$.evalFile(File($.fileName).path + "/tool/boru.UI-toolBox/jsx/lib/Bounds.jsx");

var doc = app.activeDocument;
// var layers = doc.layers;
// var layers = app.activeDocument.layers;
var layer = doc.activeLayer;
var layer1 = doc.layers[0].layers[0];
//layer.translate(1,1);
//layerMov(1, 1);
var sol = doc.artLayers.add();
//sol.kind = LayerKind.SOLIDFILL;

//layer.rasterize(RasterizeType.ENTIRELAYER);

var textItem = layer.textItem;


var R = Math.round(textItem.color.rgb["red"]);
var G = Math.round(textItem.color.rgb["green"]);
var B = Math.round(textItem.color.rgb["blue"]);
/**
*/

var solidfill = function(R,G,B) {
    var idMk = charIDToTypeID("Mk  ");
    var desc = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref = new ActionReference();
    var idcontentLayer = stringIDToTypeID("contentLayer");
    ref.putClass(idcontentLayer);
    desc.putReference(idnull, ref);
    var idUsng = charIDToTypeID("Usng");

    var desc10530 = new ActionDescriptor();
    var idType = charIDToTypeID("Type");

    var desc10531 = new ActionDescriptor();
    var idClr = charIDToTypeID("Clr ");
    var desc10532 = new ActionDescriptor();
    var idRd = charIDToTypeID("Rd  ");
    desc10532.putDouble(idRd, R);
    var idGrn = charIDToTypeID("Grn ");
    desc10532.putDouble(idGrn, G);
    var idBl = charIDToTypeID("Bl  ");
    desc10532.putDouble(idBl, B);
    var idRGBC = charIDToTypeID("RGBC");
    desc10531.putObject(idClr, idRGBC, desc10532);
    var idsolidColorLayer = stringIDToTypeID("solidColorLayer");
    desc10530.putObject(idType, idsolidColorLayer, desc10531);
    var idShp = charIDToTypeID("Shp ");

    var desc10533 = new ActionDescriptor();
    var idunitValueQuadVersion = stringIDToTypeID("unitValueQuadVersion");
    desc10533.putInteger(idunitValueQuadVersion, 1);
    var idTop = charIDToTypeID("Top ");
    var idPxl = charIDToTypeID("#Pxl");
    desc10533.putUnitDouble(idTop, idPxl, 50.000000);
    var idLeft = charIDToTypeID("Left");
    var idPxl = charIDToTypeID("#Pxl");
    desc10533.putUnitDouble(idLeft, idPxl, 50.000000);
    var idBtom = charIDToTypeID("Btom");
    var idPxl = charIDToTypeID("#Pxl");
    desc10533.putUnitDouble(idBtom, idPxl, 100.000000);
    var idRght = charIDToTypeID("Rght");
    var idPxl = charIDToTypeID("#Pxl");
    desc10533.putUnitDouble(idRght, idPxl, 100.000000);
    var idtopRight = stringIDToTypeID("topRight");
    var idPxl = charIDToTypeID("#Pxl");
    desc10533.putUnitDouble(idtopRight, idPxl, 0.000000);
    var idtopLeft = stringIDToTypeID("topLeft");
    var idPxl = charIDToTypeID("#Pxl");
    desc10533.putUnitDouble(idtopLeft, idPxl, 0.000000);
    var idbottomLeft = stringIDToTypeID("bottomLeft");
    var idPxl = charIDToTypeID("#Pxl");
    desc10533.putUnitDouble(idbottomLeft, idPxl, 0.000000);
    var idbottomRight = stringIDToTypeID("bottomRight");
    var idPxl = charIDToTypeID("#Pxl");
    desc10533.putUnitDouble(idbottomRight, idPxl, 0.000000);
    var idRctn = charIDToTypeID("Rctn");
    desc10530.putObject(idShp, idRctn, desc10533);

    var idstrokeStyle = stringIDToTypeID("strokeStyle");
    var desc10534 = new ActionDescriptor();
    var idstrokeStyleVersion = stringIDToTypeID("strokeStyleVersion");
    desc10534.putInteger(idstrokeStyleVersion, 2);
    var idstrokeEnabled = stringIDToTypeID("strokeEnabled");
    desc10534.putBoolean(idstrokeEnabled, false);
    var idfillEnabled = stringIDToTypeID("fillEnabled");
    desc10534.putBoolean(idfillEnabled, true);
    var idstrokeStyleLineWidth = stringIDToTypeID("strokeStyleLineWidth");
    var idPxl = charIDToTypeID("#Pxl");
    desc10534.putUnitDouble(idstrokeStyleLineWidth, idPxl, 1.000000);
    var idstrokeStyleLineDashOffset = stringIDToTypeID("strokeStyleLineDashOffset");
    var idPnt = charIDToTypeID("#Pnt");
    desc10534.putUnitDouble(idstrokeStyleLineDashOffset, idPnt, 0.000000);
    var idstrokeStyleMiterLimit = stringIDToTypeID("strokeStyleMiterLimit");
    desc10534.putDouble(idstrokeStyleMiterLimit, 100.000000);
    var idstrokeStyleLineCapType = stringIDToTypeID("strokeStyleLineCapType");
    var idstrokeStyleLineCapType = stringIDToTypeID("strokeStyleLineCapType");
    var idstrokeStyleButtCap = stringIDToTypeID("strokeStyleButtCap");
    desc10534.putEnumerated(idstrokeStyleLineCapType, idstrokeStyleLineCapType, idstrokeStyleButtCap);
    var idstrokeStyleLineJoinType = stringIDToTypeID("strokeStyleLineJoinType");
    var idstrokeStyleLineJoinType = stringIDToTypeID("strokeStyleLineJoinType");
    var idstrokeStyleMiterJoin = stringIDToTypeID("strokeStyleMiterJoin");
    desc10534.putEnumerated(idstrokeStyleLineJoinType, idstrokeStyleLineJoinType, idstrokeStyleMiterJoin);
    var idstrokeStyleLineAlignment = stringIDToTypeID("strokeStyleLineAlignment");
    var idstrokeStyleLineAlignment = stringIDToTypeID("strokeStyleLineAlignment");
    var idstrokeStyleAlignInside = stringIDToTypeID("strokeStyleAlignInside");
    desc10534.putEnumerated(idstrokeStyleLineAlignment, idstrokeStyleLineAlignment, idstrokeStyleAlignInside);
    var idstrokeStyleScaleLock = stringIDToTypeID("strokeStyleScaleLock");
    desc10534.putBoolean(idstrokeStyleScaleLock, false);
    var idstrokeStyleStrokeAdjust = stringIDToTypeID("strokeStyleStrokeAdjust");
    desc10534.putBoolean(idstrokeStyleStrokeAdjust, false);
    var idstrokeStyleLineDashSet = stringIDToTypeID("strokeStyleLineDashSet");
    var list332 = new ActionList();
    desc10534.putList(idstrokeStyleLineDashSet, list332);
    var idstrokeStyleBlendMode = stringIDToTypeID("strokeStyleBlendMode");
    var idBlnM = charIDToTypeID("BlnM");
    var idNrml = charIDToTypeID("Nrml");
    desc10534.putEnumerated(idstrokeStyleBlendMode, idBlnM, idNrml);
    var idstrokeStyleOpacity = stringIDToTypeID("strokeStyleOpacity");
    var idPrc = charIDToTypeID("#Prc");
    desc10534.putUnitDouble(idstrokeStyleOpacity, idPrc, 100.000000);
    var idstrokeStyleContent = stringIDToTypeID("strokeStyleContent");
    var desc10535 = new ActionDescriptor();
    var idClr = charIDToTypeID("Clr ");
    var desc10536 = new ActionDescriptor();
    var idRd = charIDToTypeID("Rd  ");
    desc10536.putDouble(idRd, 0.000000);
    var idGrn = charIDToTypeID("Grn ");
    desc10536.putDouble(idGrn, 0.000000);
    var idBl = charIDToTypeID("Bl  ");
    desc10536.putDouble(idBl, 0.000000);
    var idRGBC = charIDToTypeID("RGBC");
    desc10535.putObject(idClr, idRGBC, desc10536);
    var idsolidColorLayer = stringIDToTypeID("solidColorLayer");
    desc10534.putObject(idstrokeStyleContent, idsolidColorLayer, desc10535);
    var idstrokeStyleResolution = stringIDToTypeID("strokeStyleResolution");
    desc10534.putDouble(idstrokeStyleResolution, 72.000000);
    var idstrokeStyle = stringIDToTypeID("strokeStyle");
    desc10530.putObject(idstrokeStyle, idstrokeStyle, desc10534);
    var idcontentLayer = stringIDToTypeID("contentLayer");
    desc.putObject(idUsng, idcontentLayer, desc10530);
    var idLyrI = charIDToTypeID("LyrI");
    desc.putInteger(idLyrI, 12);
    var l = executeAction(idMk, desc, DialogModes.NO);
   return l;
}
var l =solidfill(R,G,B);
//l.getObjectValue(stringIDToTypeID("contentLayer"));
//l.getString(stringIDToTypeID("solidColorLayer"));
layer.merge(layer1);




























var newText = function(doc, colorID) {
    var layerSet = doc.layerSets.add(); //创建图层组
    var txt = doc.artLayers.add();
    txt.kind = LayerKind.TEXT;
    var textItem = txt.textItem;
    textItem.contents = colorID;
    textItem.font = "SimHei";
    textItem.size = 30;
    txt.move(layerSet, ElementPlacement.INSIDE); //图层放入图层组
    rasterizeLayer();
    layerMov(1, 1);

}

if (layer.kind == "LayerKind.TEXT") {

    var textItem = layer.textItem;
    textItem.size.convert("px");
    var txtSize = textItem.size.value;
    var txtColor = textItem.color.rgb["hexValue"];

    switch (txtColor) {
        case "E9E2B5":
            $.writeln(textItem.contents + "  1号字色");
            var colorID = "1号字色";
            newText(doc, colorID);
            break;
        case "13D73D":
            $.writeln(textItem.contents + "  2号字色");
            break;
        case "137DD7":
            $.writeln(textItem.contents + "  3号字色");
            break;
        case "D7B813":
            $.writeln(textItem.contents + "  4号字色");
            break;
        case "D79013":
            $.writeln(textItem.contents + "  5号字色");
            break;
        case "D72113":
            $.writeln(textItem.contents + "  6号字色");
            break;
        case "B6A579":
            $.writeln(textItem.contents + "  7号字色");
            break;
        case "7E7E7E":
            $.writeln(textItem.contents + "  灰显");
            break;
        default:
            break;
    }
    // $.writeln(textItem.size.value);
    // $.writeln(textItem.color.rgb["hexValue"]);
}

function rasterizeLayer() {

    var idrasterizeLayer = stringIDToTypeID("rasterizeLayer");
    var desc = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref.putEnumerated(idLyr, idOrdn, idTrgt);
    desc.putReference(idnull, ref);
    var idWhat = charIDToTypeID("What");
    var idrasterizeItem = stringIDToTypeID("rasterizeItem");
    var idlayerStyle = stringIDToTypeID("layerStyle");
    desc.putEnumerated(idWhat, idrasterizeItem, idlayerStyle);
    executeAction(idrasterizeLayer, desc, DialogModes.NO);

}