var arrAllLocked = [];
/**
 * 清理文档原始数据
 */
var deleteDocumentAncestorsMetadata = function () {

    whatApp = String(app.name);//String version of the app name

    if (whatApp.search("Photoshop") > 0) { //Check for photoshop specifically, or this will cause errors

        //Function Scrubs Document Ancestors from Files

        if (!documents.length) {

            alert("There are no open documents. Please open a file to run this script.")

            return;

        }

        if (ExternalObject.AdobeXMPScript == undefined) ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");

        var xmp = new XMPMeta(activeDocument.xmpMetadata.rawData);

        // Begone foul Document Ancestors!

        xmp.deleteProperty(XMPConst.NS_PHOTOSHOP, "DocumentAncestors");

        app.activeDocument.xmpMetadata.rawData = xmp.serialize();
        //alert("PSD文件 原始数据 MXP 清理完成");
        //app.activeDocument.close(SaveOptions.SAVECHANGES);//保存关闭当前文档
    }

}
/**
 * 清理psd文档原始数据 并对带有智能对象或连接对象的文件编辑处理
 * 
 * @param {*} layers 
 */
function layersAncestorsMetadata(layers) {
    $.writeln("清理");
    deleteDocumentAncestorsMetadata();

    for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];
        if (layer.typename == "LayerSet") {
            layerSetFor(layer.layers);
        }
        if (layer.kind == "LayerKind.SMARTOBJECT") { //判单图层是否是智能对象或连接对象

            smartObjectEdit(layer);
        }

    }
    $.writeln("保存关闭当前文档");
    app.activeDocument.close(SaveOptions.SAVECHANGES);//保存关闭当前文档



}
function layerSetFor(layers) {
    //var layers = layer.layers;

    for (var i = 0, len = layers.length; i < len; i++) {

        var layer = layers[i]
        if (layer.typename == "LayerSet") {//判断 是否是 画板或图层组 如果是就向下遍历

            layerSetFor(layer.layers);

        }
        if (layer.kind == "LayerKind.SMARTOBJECT") { //判单图层是否是智能对象或连接对象
            smartObjectEdit(layer);
        }

    }
}
/**
 * 编辑(打开)智能对象 清理智能对象下的原始数据
 */
function openSmart() {
    executeAction(stringIDToTypeID("placedLayerEditContents"), undefined, DialogModes.NO);
    layersAncestorsMetadata(app.activeDocument.layers);

}
function smartObjectEdit(layer) {
    activeDocument.activeLayer = layer;//选中当前激活文档的当前图层


    if (layer.allLocked === true) {

        layer.allLocked = false;
        arrAllLocked.push(layer.itemIndex);
        //layer.allLocked = true;
        openSmart();
    }
    openSmart();
}
layersAncestorsMetadata(app.activeDocument.layers);
//alert("PSD文件 原始数据 MXP 清理完成");
$.writeln(arrAllLocked);

$.writeln("aaa");

/**
 * 基础条件 图层是否  智能对象或连接对象 layer.kind == "LayerKind.SMARTOBJECT" 
 * 
 * 如果 基础条件 达成 
 * 
 * 1 图层是否 锁定  (锁定的智能对象不能编辑内容"也就是打开")
 * 
 * 2 图层是否 隐藏  原本隐藏的图层 还需要隐藏 (编辑图层智能对象需要选中(activeDocument.activeLayer = layer;)后才能操作  选中后图层的 visible 会变为true ) 
 * 
 * 1 和 2 条件 会出现在 同一个 智能对象图层 也可能出现在 2个不同的 智能对象图层
 * 
 * 
 * 
 */
//      
/**
 * 智能对象编辑条件
 * 1 图层是否全锁定
 * 2 图层移动是否锁定 layer.positionLocked   全部锁定 移动锁定不可选
 * 
 * 
 * 
 * 先解开全锁  在判断是否有位移锁
 */
/**
 * 智能对象全解锁 清理版
 * @param {*} layer 
 */
var smartObjectLocked = function (layer) {
    if (layer.kind == "LayerKind.SMARTOBJECT") {//如果是智能对象 
        if (layer.allLocked === true) {
            //解开全全锁
            layer.allLocked === false;

            if (layer.positionLocked = true) {
                //解开移动锁
                layer.positionLocked = false;

            }


        }
        //打开智能对象
    }
}
