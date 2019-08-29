/**
 * 清理psd文档原始数据
 * 
 * 减小psd文件  由于原始数据和智能对象的关系导致psd文件过大 
 * 
 * @author boru   微信:JackdawTing
 * 
 * @date 2019-08-28 
 * @date 2019-08-29  修改选中图层的方式   当前缺少获取锁定图层功能
 */
main = function () {

    whatApp = String(app.name);//String version of the app name

    if (whatApp.search("Photoshop") > 0) { //Check for photoshop specifically, or this will cause errors

        //Function Scrubs Document Ancestors from Files

        if (!documents.length) {

            alert("没有打开的文档,请打开一个文件以运行此脚本。\nThere are no open documents. Please open a file to run this script.")

            return false;

        }

        //alert("PSD文件 原始数据 MXP 清理完成");
        cleanMetadata();//先清理下当前的psd 文件数据
        app.activeDocument.saveAs(app.activeDocument.path);//保存一次
        cleanDocumentMetadata();
        //alert("PSD文件 原始数据 MXP 清理完成");
    }

}






/**
 * 清理文档的原始数据 包含智能对象内
 * 
 */
var cleanDocumentMetadata = function () {

    var aDoc = app.activeDocument;
    var layers = aDoc.layers;
    var arr = [];//保存隐藏图层的 数组

    cleanMetadata();
    getLayersVisibleArr(layers, arr);//获取所有隐藏图层
    //获取所有锁定图层  当前缺少的功能 

    for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];
        if (layer.typename == "LayerSet" && layer.layers.length > 0) {
            layerSetFor(layer);
        }
        if (layer.kind == "LayerKind.SMARTOBJECT") {//如果是智能对象 
            smartObjectLocked(layer); //解锁图层 包含图层移动解锁
            editSmartObject(layer);//编辑智能对象


        }

    }
    restoreLayersVisible(layers, arr);//最后执行
}

/**
 * 遍历图层组下的图层
 * @param {*} layer 图层组
 */
var layerSetFor = function (layer) {
    //var layers = layer.layers;
    $.writeln("当前位置 (" + layer.name + ") 组中做遍历图层");
    var layers = layer.layers;
    for (var i = 0, len = layers.length; i < len; i++) {

        var layer = layers[i]
        if (layer.typename == "LayerSet" && layer.layers.length > 0) {//判断 是否是 画板或图层组 如果是就向下遍历

            layerSetFor(layer);

        }
        if (layer.kind == "LayerKind.SMARTOBJECT") {//如果是智能对象 
            smartObjectLocked(layer); //解锁图层 包含图层移动解锁
            editSmartObject(layer);//编辑智能对象
        }
    }
}


/**
 * 智能对象全解锁 清理版
 * 
 * @param {*} layer 
 */
var smartObjectLocked = function (layer) {

    if (layer.allLocked === true) { //锁定判断
        //解开全全锁
        layer.allLocked = false;

        if (layer.positionLocked === true) {
            //解开移动锁
            layer.positionLocked = false;

        }

        //打开智能对象
    }
    if (layer.positionLocked === true) {
        //解开移动锁
        layer.positionLocked = false;

    }

}



/**
 * 保存并且关闭文档 
 * 
 * @param {*} document 文档  这里应该是当前激活文档 app.activeDocument
 */
var saveClose = function (document) {
    if (document.name.substr(-4) == ".jpg") {//jpg 智能对象 保存会有弹窗            条件位置保存当前文档前
        $.writeln("======保存jpeg类型文件=====");
        jpegSave(document);//jpg 格式保存关闭

    } else {
        $.writeln("======保存其它类型文件=====");
        document.close(SaveOptions.SAVECHANGES);//保存关闭当前文档
    }
}
/**
 * JPEG 处理
 *  @param {*} document 文档
 */
var jpegSave = function (document) {
    var saveIn = document.path;//当前激活文档路径
    var extensionType = Extension.LOWERCASE;//后缀小写
    var asCopy = false;//是否已副本的方式
    var jpegOptions = new JPEGSaveOptions();//embedColorProfile,formatOptions,matte,quality,scans,typename
    jpegOptions.quality = 12;//图片品质 0-12 
    jpegOptions.embedColorProfile = true;//false 嵌入颜色配置文件
    jpegOptions.matte = MatteType.NONE;//BACKGROUND,BLACK,FOREGROUND,NETSCAPE,NONE,SEMIGRAY,WHITE
    jpegOptions.formatOptions = FormatOptions.STANDARDBASELINE;//基线（”标准”）

    //document.saveAs(saveIn, jpegOptions, asCopy, extensionType);//保存当经激活文档
    document.close(document.saveAs(saveIn, jpegOptions, asCopy, extensionType));//保存关闭当前文档

}
/**
 * 编辑智能对象
 * 
 * @param {*} layer 图层 
 */
var editSmartObject = function (layer) {
    
    activeDocument.activeLayer = layer;//选中当前激活文档的当前图层

    executeAction(stringIDToTypeID("placedLayerEditContents"), undefined, DialogModes.NO);//编辑智能对象

    cleanDocumentMetadata();
    //cleanMetadata();

    saveClose(app.activeDocument);
}

/**
 * 获得当前文档的隐藏图层
 * @param {*} layers 文档图层数组
 * @param {*} arr  存放隐藏图层的数组
 */
var getLayersVisibleArr = function (layers, arr) {

    for (var i = 0; i < layers.length; i++) {

        var layer = layers[i];
        //$.writeln(layer.name);
        if (layer.layers) {//遍历子级

            getLayersVisibleArr(layer.layers, arr);

        }
        if (layer.visible === false) {
            //$.writeln("qian  "+arr+"   名字  "+layer.name);
            arr.push(layer.id);
            //$.writeln("hou  "+arr+"   名字  "+layer.name);
            layer.visible = true;
        }
        

        //layer.visible = true;

    }

}

/**
 * 还原文档最初的隐藏图层
 * @param {*} layers 文档图层数组
 * @param {*} arr    存放隐藏图层的数组
 */
var restoreLayersVisible = function (layers, arr) {

    for (var i = 0; i < layers.length; i++) {
        var layer = layers[i]
        if(layer.layers){
                restoreLayersVisible(layer.layers,arr);
                }
        for (var j = 0; j < arr.length; j++) {

            if (layer.id == arr[j]) {

                $.writeln("还原的图层是 " + layer.name);

                layer.visible = false;

            }
            
        }

    }
}
/**
 * 清理数据
 */
var cleanMetadata = function () {

    if (ExternalObject.AdobeXMPScript == undefined) ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");

    var xmp = new XMPMeta(activeDocument.xmpMetadata.rawData);

    // Begone foul Document Ancestors!

    xmp.deleteProperty(XMPConst.NS_PHOTOSHOP, "DocumentAncestors");

    app.activeDocument.xmpMetadata.rawData = xmp.serialize();

}


//main();









//====================================================未使用===================================
/**
 * 未使用 保留以后使用
 */
var smartObject = function (layer) {
    if (layer.kind == "LayerKind.SMARTOBJECT") {//如果是智能对象 
        // 1 锁定的图层 layer.allLocked === true
        if (layer.allLocked === true && layer.visible === true) {
            $.writeln("锁定图层: " + layer.name);
        }
        // 2 隐藏 && 锁定 layer.visible === false && layer.allLocked === true
        if (layer.visible === false && layer.allLocked === true) {
            $.writeln("隐藏 && 锁定: " + layer.name);

        }
        // 3 隐藏的图层 layer.visible === false
        if (layer.visible === false && layer.allLocked === false) {
            $.writeln("隐藏的图层: " + layer.name);

        }
        // 4 正常的图层 

    }
}
/**
 * 动作描述类型编辑智能对象
 * 
 * 动作描述可以保留图层原来的设置(例如是否是隐藏图层)
 * @param {*} layer 图层 
 */
var editSmartObject__________ = function (layer) {
    var name = layer.name;//图层名字
    var id = layer.id;//图层ID
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    var list = new ActionList();
    ref.putIdentifier(charIDToTypeID('Lyr '), id);//重名选中BUG
    desc.putReference(charIDToTypeID('null'), ref);
    desc.putBoolean(charIDToTypeID("MkVs"), false);
    list.putInteger(id);
    desc.putList(charIDToTypeID("LyrI"), list);
    executeAction(charIDToTypeID('slct'), desc, DialogModes.NO);//选中图层

   

    executeAction(stringIDToTypeID("placedLayerEditContents"), undefined, DialogModes.NO);//编辑智能对象

    cleanDocumentMetadata();
    //cleanMetadata();

    saveClose(app.activeDocument);
}