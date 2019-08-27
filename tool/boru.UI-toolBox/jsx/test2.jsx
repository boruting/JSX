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

//JPG格式文件的智能对象保存有弹窗
//缺少记录图层原有属性信息
/**
 * 条件  
 * 条件 1 图层是否 隐藏
 * 条件 2 图层是否 锁定
 * 条件 
 * 
 */
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
if (layer.kind == "LayerKind.SMARTOBJECT") {//如果是智能对象 
    // 1 锁定的图层 layer.allLocked === true
    if (layer.allLocked === true) {

    }
    // 2 隐藏 && 锁定 layer.visible === false && layer.allLocked === true
    if (layer.visible === false && layer.allLocked === true) {

    }
    // 3 隐藏的图层 layer.visible === false
    if (layer.visible === false) {

    }
    // 4 正常的图层 

}
if (app.activeDocument.name.substr(-4) == ".jpg") {//jpg 智能对象 保存会有弹窗            条件位置保存当前文档前

    app.activeDocument.close(SaveOptions.SAVECHANGES);//保存关闭当前文档
    //处理jpg格式保存弹窗问题

}
/**
 * JPEG 处理
 */
var jpegSave = function (Document) {
    var saveIn = Document.path;//当前激活文档路径
    var extensionType = Extension.LOWERCASE;//后缀小写
    var asCopy = false;//是否已副本的方式
    var jpegOptions = new JPEGSaveOptions();//embedColorProfile,formatOptions,matte,quality,scans,typename
    jpegOptions.quality = 12;//图片品质 0-12 
    jpegOptions.embedColorProfile = true;//false 嵌入颜色配置文件
    jpegOptions.matte = MatteType.NONE;//BACKGROUND,BLACK,FOREGROUND,NETSCAPE,NONE,SEMIGRAY,WHITE
    jpegOptions.formatOptions = FormatOptions.STANDARDBASELINE;//基线（”标准”）

    Document.saveAs(saveIn, jpegOptions, asCopy, extensionType);//保存当经激活文档
}