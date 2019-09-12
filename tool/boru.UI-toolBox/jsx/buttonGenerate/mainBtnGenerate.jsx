/**
 * 1. 移动图层  将当前选中图层 智能对象图层 放入一个新建组中                         btn_public0
 * 2. 创建图层  创建组类型图层 重命名这个图层组为 上面智能对象的名字 加 .png              btn_public0.png
 * 3. 复制图层  btn_public0 这个图层  (复制后的图层需要在一个组内) 重命名这个图层为        btn_public0_hover
 * 4. 修改坐标  btn_public0_hover 这个图层 的位子 x = btn_public0.x  y = btn_public0.y + btn_public0.height
 * 5. 变亮图层  修改图层的 亮度对比度 +45
 * 5. 复制图层  btn_public0 这个图层  (复制后的图层需要在一个组内) 重命名这个图层为       btn_public0_down
 * 6. 修改坐标  btn_public0_down 这个图层 的位子 x = btn_public0.x  y = btn_public0.y + (btn_public0.height*2)
 * 7. 变暗图层  修改图层的 亮度对比度 -40
 * 8. 创建蒙版  真对组 btn_public0.png 这个图层 创建一个蒙版 蒙版的大小等于 btn_public0 宽高 乘以 3 位子等于btn_public0
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
 * 创建图层对象
 * 
 */
LayerObject = function (layer) {
    var boundsInfo = BoundsObj.getLayerBounds(layer, "boundsNoEffects");
    this.name = layer.name;
    this.height = boundsInfo.h;
    this.width = boundsInfo.w;
    this.x = boundsInfo.x;
    this.y = boundsInfo.y;

}

/**
 * 移动图层
 * 
 */
var doc = app.activeDocument;
var layer = doc.activeLayer;
var layerObj = new LayerObject(layer);
var layerSet = doc.layerSets.add();//创建图层组
layerSet.name = layer.name + ".png";
layer.move(layerSet, ElementPlacement.INSIDE);//图层放入图层组
var newLayer = layer.duplicate();
newLayer.name = layerObj.name + "_hover";
newLayer.move(layerSet,ElementPlacement.PLACEATEND);
var boundsInfo = BoundsObj.getLayerBounds(newLayer, "boundsNoEffects");
var valueX =  parseFloat(layerObj.x);
var valueY = parseFloat(layerObj.y)+parseFloat(layerObj.height);
var x =0-(parseFloat(boundsInfo.x)-valueX);
var y =0-(parseFloat(boundsInfo.y)-valueY);
newLayer.translate(x, y);
newLayer.adjustBrightnessContrast(45,0);



















