﻿/**
 * @author boru
 * @name 清理psd文档原始数据
 * @description 减小psd文件  由于原始数据和智能对象的关系导致psd文件过大
 * @weixin JackdawTing
 * @date 2019-08-28 
 * @date 2019-08-29  修改选中图层的方式   当前缺少获取锁定图层功能
 * @date 2019-09-09  添加获取锁定类型 和 先判断打开的文档是不是jpg格式  缺少判断背景层
 * @date 2019-09-11  修改背景层解锁问题(临时忽略处理) layersInfo.record {layer.positionLocked === true}
 * @date 2019-09-20  BGU  layersInfo.restore 方法遍历子级传参遗漏
 *                   添加psd保存类型(另存为) 
 *                   AI文件 嵌入的智能对象忽略处理           
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
        //app.activeDocument.saveAs(app.activeDocument.path);//保存一次
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
    //var arr = [];//保存隐藏图层的 数组
    var visibleArr = [];//图层隐藏属性数组
    var posLockedArr = [];//图层移动锁定属性数组
    var allLockedArr = [];//图层全锁定属性数组


    cleanMetadata();
    //记录图层信息
    layersInfo.record(app.activeDocument.layers, visibleArr, allLockedArr, posLockedArr);

    $.writeln("隐藏的图层ID: [" + visibleArr + "] 全锁定的图层ID: [" + allLockedArr + "] 移动锁定的图层ID: [" + posLockedArr + "]");

    //getLayersVisibleArr(layers, arr);//获取所有隐藏图层
    //获取所有锁定图层  当前缺少的功能 

    for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];
        if (layer.typename == "LayerSet" && layer.layers.length > 0) {
            layerSetFor(layer);
        }
        if (layer.kind == "LayerKind.SMARTOBJECT") {//如果是智能对象 
            //smartObjectLocked(layer); //解锁图层 包含图层移动解锁
            editSmartObject(layer);//编辑智能对象


        }

    }
    //还原
    $.writeln(aDoc.name)
    if (posLockedArr || allLockedArr || visibleArr) {
        layersInfo.restore(layers, posLockedArr, allLockedArr, visibleArr);
    }

    //$.writeln("111")
    //restoreLayersVisible(layers, arr);//最后执行



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
            //smartObjectLocked(layer); //解锁图层 包含图层移动解锁

            editSmartObject(layer);//编辑智能对象
        }
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
        return;
    } if (document.name.substr(-4) == ".psd") {
        $.writeln("======保存PSD类型文件=====");
        psdSave(document);
        return;
    } else {
        $.writeln("======保存其它类型文件=====");
        document.close(SaveOptions.SAVECHANGES);//保存关闭当前文档
    }
}
/**
 * PSD  处理
 * @param {*} document 
 */
var psdSave = function (document) {
    var fileOut = new File(document.path + "/" + "newCopy_" + document.name);//文件保存的路径和名字(在源文件名前加了newCopy_)
    var psd = PhotoshopSaveOptions;//psd格式保存
    var asCopy = true;//用来指定以副本的方式保存。
    var extensionType = Extension.LOWERCASE;//后缀小写
    document.saveAs(fileOut, psd, asCopy, extensionType);//另存为一个文档
    $.writeln("文件保存到:  "+decodeURI(fileOut));
    document.close(SaveOptions.DONOTSAVECHANGES);//关闭原始文档(不保存)
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
 * 返回一个智能对象的引用类型
 */
var smartObjectType = function () {
    var r = new ActionReference();
    var d = new ActionDescriptor();

    r.putEnumerated(stringIDToTypeID("layer"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"));
    d.putReference(charIDToTypeID('null'), r);
    var options = executeAction(charIDToTypeID("getd"), d, DialogModes.NO);
    options = options.getObjectValue(stringIDToTypeID("smartObject"));
    var SmartName = options.getString(stringIDToTypeID("fileReference"));
    $.writeln(SmartName);
    return SmartName;


}
/**
 * 编辑智能对象
 * 
 * @param {*} layer 图层 
 */
var editSmartObject = function (layer) {

    activeDocument.activeLayer = layer;//选中当前激活文档的当前图层
    var smartName = smartObjectType();
    if (smartName.substr(-2) == "ai") {
        $.writeln("这条图层是个AI智能对象 " + smartName);
        return;
    }


    executeAction(stringIDToTypeID("placedLayerEditContents"), undefined, DialogModes.NO);//编辑智能对象

    if (app.activeDocument.name.substr(-4) == ".jpg") {
        cleanMetadata();
        saveClose(app.activeDocument);
        return;
    } else {
        cleanDocumentMetadata();
        //cleanMetadata();

        saveClose(app.activeDocument);
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
/**
 * 图层信息
 */
var layersInfo = {}

/**
 * 记录文档中打开时 图层的信息
 * 1.图层是否是隐藏状态
 * 2.图层是否锁定了移动属性
 * 3.图层是否全锁定了
 */
layersInfo.record = function (layers, visibleArr, allLockedArr, posLockedArr) {

    for (var i = 0; i < layers.length; i++) {

        var layer = layers[i];
        //$.writeln(layer.name);
        if (layer.layers) {//遍历子级

            layersInfo.record(layer.layers, visibleArr, allLockedArr, posLockedArr);

        }
        if (layer.visible === false) {
            //$.writeln("qian  "+arr+"   名字  "+layer.name);
            visibleArr.push(layer.id);
            //$.writeln("hou  "+arr+"   名字  "+layer.name);
            layer.visible = true;
        }
        if (layer.allLocked === true) {
            //$.writeln("qian  "+arr+"   名字  "+layer.name);
            allLockedArr.push(layer.id);
            //$.writeln("hou  "+arr+"   名字  "+layer.name);
            layer.allLocked = false;
            if (layer.positionLocked === true) {
                //解开移动锁
                if (layer.id != 1) {//处理忽略背景层  背景从的 id:1 无论存在与否 id:1都是倍占用的
                    posLockedArr.push(layer.id);
                    layer.positionLocked = false;

                }

            }
        }
        if (layer.positionLocked === true) {
            //解开移动锁
            if (layer.id != 1) {//处理忽略背景层  背景从的 id:1 无论存在与否 id:1都是倍占用的
                posLockedArr.push(layer.id);
                layer.positionLocked = false;

            }


        }


        //layer.visible = true;

    }


}
/**
 * 还原文档中图层属性到 文档打开是后
 * 1.还原图层 移动锁定
 * 2.还原图层 全锁定
 * 3.还原图层 隐藏
 * 还原顺序需要 先还原 移动锁定 在还原 全锁定 最后还原 隐藏 
 */
layersInfo.restore = function (layers, posLockedArr, allLockedArr, visibleArr) {
    for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];
        if (layer.layers) {
            layersInfo.restore(layer.layers, posLockedArr, allLockedArr, visibleArr);
        }
        if (posLockedArr) {
            layersInfo.restoreLayer(layer, posLockedArr, layersInfo.layerPositionLocked);
        }
        if (allLockedArr) {
            layersInfo.restoreLayer(layer, allLockedArr, layersInfo.layerAllLocked);
        }
        if (visibleArr) {
            layersInfo.restoreLayer(layer, visibleArr, layersInfo.layerVisible);
        }

    }

}
/**
 * 通过过类型还原当前图层
 * 
 */
layersInfo.restoreLayer = function (layer, arr, type) {
    for (var i = 0; i < arr.length; i++) {
        if (layer.id == arr[i]) {
            type(layer);
            $.writeln("还原== " + layer.name + "==图层" + "===图层ID:" + layer.id);
        }
    }
}
/**
 * 返回 当前图层修改为隐藏状态 
 */
layersInfo.layerVisible = function (layer) {
    //$.writeln("aaaaaaa");
    return layer.visible = false;
}
/**
 * 返回 当前图层修改为移动锁定状态
 */
layersInfo.layerPositionLocked = function (layer) {
    return layer.positionLocked = true;
}
/**
 * 返回 当前图层修改为全部锁定状态
 */
layersInfo.layerAllLocked = function (layer) {
    return layer.allLocked = true;
}

//main();