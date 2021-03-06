﻿//$.evalFile(File($.fileName).parent + "/lib/kersBoru_lib.jsx");
/**
* 延申选区
*/
function extendXuanqu (){
    var doc = app.activeDocument;
    var type2 = SelectionType.EXTEND;//延申选区
    var feather = 0;//表示构建选区时的羽化值
    var antiAlias = true;//表示构建选区时是否抗锯齿。
    //当前图层边界信息
    var bounds = doc.selection.bounds;
    var x = bounds[0].value;
    var y = bounds[1].value;
    var w = bounds[2].value;
    //var h = boundsInfo.h;
    var h = doc.height;

    var region = [[x, y], [w, y], [w, h], [x, h]];

    
    doc.selection.select(region, type2, feather, antiAlias);


}
/**
*剪裁画布大小 到 图层实际像素 
*/
function cropDounds() {
    //定义一个变量[document]，用来表示Photoshop的当前文档。
    var document = app.activeDocument;
    //获取当前选区坐标
    var bounds = document.selection.bounds;
    //调用[document]对象的[crop]方法，来裁切当前文档。
    document.crop(bounds);
}
/**
* 创建 图层实际像素选区
*/
function actualXuanqu() {
    var idsetd = charIDToTypeID("setd");
    var desc = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idfsel = charIDToTypeID("fsel");
    ref.putProperty(idChnl, idfsel);
    desc.putReference(idnull, ref);
    var idT = charIDToTypeID("T   ");
    var ref1 = new ActionReference();
    var idChnl = charIDToTypeID("Chnl");
    var idChnl = charIDToTypeID("Chnl");
    var idTrsp = charIDToTypeID("Trsp");
    ref1.putEnumerated(idChnl, idChnl, idTrsp);
    desc.putReference(idT, ref1);
    executeAction(idsetd, desc, DialogModes.NO);
}
/**
* 栅格化图层样式
*/
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
/**
* 还原历史记录到打开时
*/
function returnRecords() {
    var idslct = charIDToTypeID("slct");
    var desc326 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref97 = new ActionReference();
    var idSnpS = charIDToTypeID("SnpS");
    var docName = app.activeDocument.name;//获取当前文档名字
    ref97.putName(idSnpS, docName);
    desc326.putReference(idnull, ref97);
    executeAction(idslct, desc326, DialogModes.NO);
}