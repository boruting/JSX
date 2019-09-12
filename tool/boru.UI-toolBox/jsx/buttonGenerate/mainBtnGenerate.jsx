/**
 * 1. 移动图层  将当前选中图层 智能对象图层 放入一个新建组中                         btn_public0
 * 2. 创建图层  创建组类型图层 重命名这个图层组为 上面智能对象的名字 加 .png              btn_public0.png
 * 3. 复制图层  btn_public0 这个图层  (复制后的图层需要在一个组内) 重命名这个图层为        btn_public0_hover
 * 4. 修改坐标  btn_public0_hover 这个图层 的位子 x = btn_public0.x  y = btn_public0.y + btn_public0.height
 * 5. 变亮图层  修改图层的 亮度对比度 +45
 * 5. 复制图层  btn_public0 这个图层  (复制后的图层需要在一个组内) 重命名这个图层为       btn_public0_down
 * 6. 修改坐标  btn_public0_down 这个图层 的位子 x = btn_public0.x  y = btn_public0_hover.y + (btn_public0_hover.height)
 * 7. 变暗图层  修改图层的 亮度对比度 -40
 * @. 创建蒙版  真对组 btn_public0.png 这个图层 创建一个蒙版 蒙版的大小等于 btn_public0 宽高 乘以 3 位子等于btn_public0 (未使用)
 */

var BoundsObj = {};
BoundsObj._value = function (value, defaultValue) {
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
BoundsObj.getLayerBounds = function (layer, getType) {

    var boundsInfo = { x: null, y: null, w: null, h: null, right: null, bottom: null }
    var classStr = BoundsObj._value(getType, "boundsNoEffects");//"bounds"、"boundsNoMask"
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
 * @name 创建图层对象
 * 根据当前图层创建一个新的图层对象
 * name   图层的名字
 * height 图层的高度
 * width  图层的宽度
 * x      图层的x坐标
 * y      图层的y坐标
 */
var LayerObject = function (layer) {
    var boundsInfo = BoundsObj.getLayerBounds(layer, "boundsNoEffects");
    this.name = layer.name;
    this.height = boundsInfo.h;
    this.width = boundsInfo.w;
    this.x = boundsInfo.x;
    this.y = boundsInfo.y;

}
/**
 * 移动图层
 * @param {*} layerObj  图层对象
 * @param {*} layer  需要移动的图层
 */
BoundsObj.moveLayer = function (layerObj, layer) {
    var boundsInfo = BoundsObj.getLayerBounds(layer, "boundsNoEffects");
    var valueX = parseFloat(layerObj.x);
    var valueY = parseFloat(layerObj.y) + parseFloat(layerObj.height);
    var x = 0 - (parseFloat(boundsInfo.x) - valueX);
    var y = 0 - (parseFloat(boundsInfo.y) - valueY);
    layer.translate(x, y);
}
/**
 * @author boru 
 * @name 按钮生成脚本
 * @description 利用一个 链接对象图层 制作出 悬停帧 和 按下帧 效果并且排列好位置 统一放入一个 图层组 内 修改图层组的名字作为切图用
 * @date 2019-09-12 初步功能实现  后续 可能需要 考虑添加蒙版控制 图层组的切图尺寸 
 */
var main = function () {
    var doc = app.activeDocument;
    var layer = doc.activeLayer;
    var layerObj = new LayerObject(layer);
    var layerSet = doc.layerSets.add();//创建图层组
    layerSet.name = layer.name + ".png";
    layer.move(layerSet, ElementPlacement.INSIDE);//图层放入图层组
    //hover
    var layer_hover = layer.duplicate();
    layer_hover.name = layerObj.name + "_hover";
    layer_hover.move(layerSet, ElementPlacement.PLACEATEND);

    BoundsObj.moveLayer(layerObj, layer_hover);
    layer_hover.adjustBrightnessContrast(45, 0);
    //down
    var layer_down = layer.duplicate();
    layer_down.name = layerObj.name + "_down";
    layer_down.move(layerSet, ElementPlacement.PLACEATEND);
    var layerH = new LayerObject(layer_hover);
    BoundsObj.moveLayer(layerH, layer_down);
    layer_down.adjustBrightnessContrast(-40, 0);

}
main();















