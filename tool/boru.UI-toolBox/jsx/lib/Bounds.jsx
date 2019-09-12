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