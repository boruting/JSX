var layer = app.activeDocument.activeLayer;
var pro = prompt("输入新的W,H,X,Y", "100,100,100,100", "图层坐标修改");
//var pro = "206,279"
$.writeln("    在" + pro);
var newW = pro.split(",")[0];
var newH = pro.split(",")[1];
var newX = pro.split(",")[2];
var newY = pro.split(",")[3];

$.writeln(newX + "  " + newY + "  " + newW + "  " + newH);
var _value = function (value, defaultValue) {
    if (value != undefined) {
        return value;
    } else {
        if (defaultValue != undefined) {
            return defaultValue;
        } else {
            return null;
        }
    }
}
/**
 * 
 * @param {*} layer 暂时是当前图层
 * @param {*} getType 获取边类型，默认为："boundsNoEffects"，还可以是："bounds"、"boundsNoMask"
 */
var getLayerBounds = function (layer, getType) {

    var boundsInfo = { x: null, y: null, w: null, h: null, right: null, bottom: null }
    var classStr = _value(getType, "boundsNoEffects");//"bounds"、"boundsNoMask"
    var bounds = layer[classStr];


    var reg = /[0-9]*/;
    boundsInfo.x = reg.exec(bounds[0]);
    boundsInfo.y = reg.exec(bounds[1]);
    boundsInfo.right = reg.exec(bounds[2]);
    boundsInfo.bottom = reg.exec(bounds[3]);
    boundsInfo.w = boundsInfo.right - boundsInfo.x;
    boundsInfo.h = boundsInfo.bottom - boundsInfo.y;

    return boundsInfo;

}
/**
 * 通过变形修改图层尺寸
 * @param {*} newW 新的宽
 * @param {*} newH 新的高
 */
var modifyLayerSize = function (newW, newH) {

    var boundsInfo = getLayerBounds(layer, "boundsNoEffects");
    var w = (newW / boundsInfo.w) * 100;
    var h = (newH / boundsInfo.h) * 100;

    var idTrnf = charIDToTypeID("Trnf");
    var desc = new ActionDescriptor();
    var idWdth = charIDToTypeID("Wdth");
    var idPrc = charIDToTypeID("#Prc");
    desc.putUnitDouble(idWdth, idPrc, w);
    var idHght = charIDToTypeID("Hght");
    var idPrc = charIDToTypeID("#Prc");
    desc.putUnitDouble(idHght, idPrc, h);//这里的数是当前尺寸百分比
    //$.writeln(h+"  "+w);
    executeAction(idTrnf, desc, DialogModes.NO);

}
/**
 * 通过 layer.translate 移动图层到新的位置
 * @param {*} newX 新的坐标X
 * @param {*} newY 新的坐标Y
 */

var layerMov = function (newX, newY) {
    var layer = app.activeDocument.activeLayer;
    var boundsInfo = getLayerBounds(layer, "boundsNoEffects");
    var x = 0 - (boundsInfo.x - newX);
    var y = 0 - (boundsInfo.y - newY);
    layer.translate(x, y);

}
if (newW && newH != undefined) {

    $.writeln(newW + "  " + newH);
    modifyLayerSize(newW, newH);


} if (newX && newY != undefined) {

    $.writeln(newX + "  " + newY);
    layerMov(newX, newY);

}


