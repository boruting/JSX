var file = File($.fileName);
var p = decodeURI(file.parent);
$.evalFile(p + "/lib/Kinase_lib.jsx");
$.evalFile(p + "/lib/json2.jsx");
try {
    JSON
} catch (e) {
    $.writeln("1因为未载入 JSON 解析库，请载入 json2.jsx ");
}
/**
 * 通过变形修改图层尺寸
 * @param {*} newW 新的宽
 * @param {*} newH 新的高
 */
var modifyLayerSize = function (newW, newH) {

    //var boundsInfo = Kinase.layer.getLayerBounds(Kinase.REF_LayerID, layer.id); //获取图层边界信息
    //var w = (newW / boundsInfo.w) * 100;
    //var h = (newH / boundsInfo.h) * 100;

    var idTrnf = charIDToTypeID("Trnf");
    var desc = new ActionDescriptor();
    var idWdth = charIDToTypeID("Wdth");
    var idPrc = charIDToTypeID("#Pxl");
    desc.putUnitDouble(idWdth, idPrc, newW);
    var idHght = charIDToTypeID("Hght");
    var idPrc = charIDToTypeID("#Pxl");
    desc.putUnitDouble(idHght, idPrc, newH);//这里的数是当前尺寸百分比
    //$.writeln(h+"  "+w);
    executeAction(idTrnf, desc, DialogModes.NO);

}
/**
 * 移动 智能对象 选区内容
 * @param x 向x方向移动 多少
 * @param y 向y方向移动 多少
 */
var selectionMove = function(x, y) {
    var ref = new ActionReference();
    var desc = new ActionDescriptor();
    var desc_ = new ActionDescriptor();

    idcut = charIDToTypeID("cut ");
    var idnull = charIDToTypeID("null");
    ref.putProperty(charIDToTypeID("Chnl"), charIDToTypeID("fsel"));
    desc.putReference(idnull, ref);

    var idT = charIDToTypeID("T   ");
    var idOfst = charIDToTypeID("Ofst");
    desc_.putUnitDouble(charIDToTypeID("Hrzn"), charIDToTypeID("#Pxl"), x); //移动的到x坐标
    desc_.putUnitDouble(charIDToTypeID("Vrtc"), charIDToTypeID("#Pxl"), y); //移动的到y坐标
    desc.putObject(idT, idOfst, desc_);
    executeAction(idcut, desc, DialogModes.NO);

}
var main = function() {
    var pro = prompt("11111", '{"w":200,"h":0}', "图层坐标修改"); //输入一个新的 尺寸 (200,200)
    if (pro == null) {
        alert("已取消本次操作");
        return;
    }
    pro = JSON.parse(pro); //转换成对象
    var doc = app.activeDocument;
    var layer = doc.activeLayer;
    var boundsInfo = Kinase.layer.getLayerBounds(Kinase.REF_LayerID, layer.id); //获取图层边界信息
    boundsInfo.centerState=7;
    if (layer.kind == "LayerKind.SMARTOBJECT") { //判断是否 是智能对象
        var g9 = getSmartObject();
    }

    /*选区数据 */
    //var type = "加宽";

    //var regionData= getRegionData(type,boundsInfo,g9);//通过类型获取数据

    //移动
    if (pro.w > 0 && pro.h == 0) { //只修改宽
        createRegion(getRegionData("移动x", boundsInfo, g9));
        var x = pro.w;
        var y = pro.h;
        selectionMove(x, y);

        createRegion(getRegionData("加宽", boundsInfo, g9)); //创建选区
        //移动
        selectionMove(1, 0);

        
        //添加 宽高尝试



        Kinase.layer.setLayerBounds(boundsInfo,Kinase.REF_LayerID, layer.id)
        //Kinase._boundsAnchor(boundsInfo, boundsInfo.centerState);
        modifyLayerSize(200,100);
        //electionMove(-1, 0);
        
    } else if (pro.h > 0 && pro.w == 0) {
        createRegion(getRegionData("移动y", boundsInfo, g9));
        var x = pro.w;
        var y = pro.h;
        selectionMove(x, y);
    } else {
        alert("失败");
    }
    //selectionMove(x, y);



}
main();

function getRegionData(type, boundsInfo, g9) {

    switch (type) {
        case "移动x":
            var L = boundsInfo.x + g9[2];
            var T = boundsInfo.y;
            var R = boundsInfo.right;
            var B = boundsInfo.bottom;
            var regionData = [
                [L, T],
                [R, T],
                [R, B],
                [L, B]
            ];
            return regionData;
        case "移动y":
            var L = boundsInfo.x;
            var T = boundsInfo.y + g9[3];
            var R = boundsInfo.right;
            var B = boundsInfo.bottom;
            var regionData = [
                [L, T],
                [R, T],
                [R, B],
                [L, B]
            ];
            return regionData;
        case "加宽":
            var L = boundsInfo.x + g9[2] - 2;
            var T = boundsInfo.y;
            var R = boundsInfo.x + g9[2];
            var B = boundsInfo.bottom;
            var regionData = [
                [L, T],
                [R, T],
                [R, B],
                [L, B]
            ];
            return regionData;
        case "加高":
            var L = boundsInfo.x;
            var T = boundsInfo.y + g9[3] - 2;
            var R = boundsInfo.y + g9[3]; //
            var B = boundsInfo.bottom;
            var regionData = [
                [L, T],
                [R, T],
                [R, B],
                [L, B]
            ];
            return regionData;
    }
}
/*获取智能对象内图层信息*/
function getSmartObject() { //var  getSmartObject = function

    executeAction(stringIDToTypeID("placedLayerEditContents"), undefined, DialogModes.NO); //打开智能对象
    var layers = app.activeDocument.layers;

    for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];
        //暂时不需要遍历子级
        // if (layer.typename == "LayerSet" && layer.layers.length > 0) {
        //     layerSetFor(layer.layers);
        // }
        //var oldEditInfo = Kinase.layer.getLayerEditInfo(Kinase.REF_LayerID, layer.id);
        var layerName = layer.name;
        var g9Data = layerName.split(":");

        if (g9Data[0] == "G9Data") {
            var g9 = JSON.parse(g9Data[1]);
            //return g9[0];
            app.activeDocument.close(SaveOptions.DONOTSAVECHANGES); //关闭原始文档(不保存)
            return g9;
        }

    }

}
/*获取选区信息*/
function createRegion(regionData) {


    var type = SelectionType.REPLACE;
    var feather = 0; //构建选区时的羽化值
    var antiAlias = true; //构建选区时是否抗锯齿

    app.activeDocument.selection.select(regionData, type, feather, antiAlias);

}