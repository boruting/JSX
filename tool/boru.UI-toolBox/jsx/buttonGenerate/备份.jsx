
/**
 * 动作 复制粘贴图层
 */
var duplicateAni = function () {
    var idcopy = charIDToTypeID("copy");
    executeAction(idcopy, undefined, DialogModes.NO);
    var idpast = charIDToTypeID("past");
    executeAction(idpast, undefined, DialogModes.NO);
    var doc = app.activeDocument;
    var layer = doc.activeLayer;
   
    return layer;
}