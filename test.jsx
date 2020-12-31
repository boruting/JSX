var file = File($.fileName);
var p = decodeURI(file.parent);
$.evalFile(p + "/lib/Kinase_lib.jsx");
$.evalFile(p + "/lib/json2.jsx");
try {
    JSON
} catch (e) {
    $.writeln("1因为未载入 JSON 解析库，请载入 json2.jsx ");
}
var main = function() {
    var pro = prompt("11111", '{"w":200,"h":0}', "图层坐标修改"); //输入一个新的 尺寸 (200,200)
    if (pro == null) {
        alert("已取消本次操作");
        return;
    }
    pro = JSON.parse(pro);
    var doc = app.activeDocument;
    var layer = doc.activeLayer;
    var boundsInfo = Kinase.layer.getLayerBounds(Kinase.REF_LayerID, layer.id); //获取图层边界信息
    createRegion(boundsInfo, pro,layer);
    tt(boundsInfo,pro);
}
/**
 * 创建选区
 * 
 */
var createRegion = function(boundsInfo, pro,layer) {


    if (layer.kind == "LayerKind.SMARTOBJECT") { //判断是否 是智能对象
        var regionData = getRegionData(boundsInfo, pro);
        var type = SelectionType.REPLACE; //表示选择的类型。当前使用的是默认选项即替换之前的选区(如果有的话)。
        var feather = 0; //构建选区时的羽化值
        var antiAlias = true; //构建选区时是否抗锯齿

        //通过调用[selection]对象的[select]方法，并传入之前设置好的各项参数，来在当前文档构建一个选区。
        app.activeDocument.selection.select(regionData, type, feather, antiAlias);

        if (pro.w > 0 && pro.h == 0) { //只修改宽
            var x = pro.w;
            var y = pro.h;
            selectionMove(x, y);
        } else if (pro.h > 0 && pro.w == 0) {
            var x = pro.w;
            var y = pro.h;
            selectionMove(x, y);
        } else {
            alert("失败");
        }


    } else {
        alert("不是智能对象不能打开\n 获取不到9宫格数据");
        return;
    }


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

/*
 遍历 打开的智能对象 图层
*/
function layerSetFor() {
    var layers = app.activeDocument.layers;
    for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];
        // if (layer.typename == "LayerSet" && layer.layers.length > 0) {
        //     layerSetFor(layer.layers);
        // }
        var oldEditInfo = Kinase.layer.getLayerEditInfo(Kinase.REF_LayerID, layer.id);
        if (oldEditInfo.color == "red") {
            var g9 = layer.name;
            //return g9[0];
            app.activeDocument.close(SaveOptions.DONOTSAVECHANGES); //关闭原始文档(不保存)
            return JSON.parse(g9);
        }

    }

}

function getRegionData(boundsInfo, pro) {

    //打开智能对象
    executeAction(stringIDToTypeID("placedLayerEditContents"), undefined, DialogModes.NO);

    var g9 = layerSetFor(); //返回一个g9数据

    if (pro.w > 0 && pro.h == 0) { //只修改宽
        var L = boundsInfo.x + g9[2];
        var T = boundsInfo.y;
        var R = boundsInfo.right;
        var B = boundsInfo.bottom;
    } else if (pro.h > 0 && pro.w == 0) {
        var L = boundsInfo.x;
        var T = boundsInfo.y + g9[1];
        var R = boundsInfo.right;
        var B = boundsInfo.bottom;
    } else {
        alert("失败");
    }

    /*选区数据 */
    var regionData = [
        [L, T],
        [R, T],
        [R, B],
        [L, B]
    ];
    return regionData;
}

main();

function tt(boundsInfo,pro) {
    
    if (pro.w > 0 && pro.h == 0) { //只修改宽
        var L = boundsInfo.x + g9[2] - 10;
        var T = boundsInfo.y;
        var R = boundsInfo.right;
        var B = boundsInfo.bottom;
    } else if (pro.h > 0 && pro.w == 0) {
        var L = boundsInfo.x;
        var T = boundsInfo.y + g9[3] - 10;
        var R = boundsInfo.right;
        var B = boundsInfo.bottom;
    } else {
        alert("失败");
    }
    var regionData = [
        [L, T],
        [R, T],
        [R, B],
        [L, B]
    ];
    var regionData = getRegionData(boundsInfo, pro);
    var type = SelectionType.REPLACE; //表示选择的类型。当前使用的是默认选项即替换之前的选区(如果有的话)。
    var feather = 0; //构建选区时的羽化值
    var antiAlias = true; //构建选区时是否抗锯齿

    //通过调用[selection]对象的[select]方法，并传入之前设置好的各项参数，来在当前文档构建一个选区。
    app.activeDocument.selection.select(regionData, type, feather, antiAlias);
}
/*
var idTrnf = charIDToTypeID( "Trnf" );
    var desc1509 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref254 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref254.putEnumerated( idLyr, idOrdn, idTrgt );
    desc1509.putReference( idnull, ref254 );
    var idFTcs = charIDToTypeID( "FTcs" );
    var idQCSt = charIDToTypeID( "QCSt" );
    var idQcsa = charIDToTypeID( "Qcsa" );
    desc1509.putEnumerated( idFTcs, idQCSt, idQcsa );
    var idOfst = charIDToTypeID( "Ofst" );
        var desc1510 = new ActionDescriptor();
        var idHrzn = charIDToTypeID( "Hrzn" );
        var idPxl = charIDToTypeID( "#Pxl" );
        desc1510.putUnitDouble( idHrzn, idPxl, 80.250000 );
        var idVrtc = charIDToTypeID( "Vrtc" );
        var idPxl = charIDToTypeID( "#Pxl" );
        desc1510.putUnitDouble( idVrtc, idPxl, 0.000000 );
    var idOfst = charIDToTypeID( "Ofst" );
    desc1509.putObject( idOfst, idOfst, desc1510 );
    var idWdth = charIDToTypeID( "Wdth" );
    var idPrc = charIDToTypeID( "#Prc" );
    desc1509.putUnitDouble( idWdth, idPrc, 448.913043 );
    var idLnkd = charIDToTypeID( "Lnkd" );
    desc1509.putBoolean( idLnkd, true );
    var idIntr = charIDToTypeID( "Intr" );
    var idIntp = charIDToTypeID( "Intp" );
    var idBcbc = charIDToTypeID( "Bcbc" );
    desc1509.putEnumerated( idIntr, idIntp, idBcbc );
executeAction( idTrnf, desc1509, DialogModes.NO );



var idTrnf = charIDToTypeID( "Trnf" );
    var desc1516 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref255 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref255.putEnumerated( idLyr, idOrdn, idTrgt );
    desc1516.putReference( idnull, ref255 );
    var idFTcs = charIDToTypeID( "FTcs" );
    var idQCSt = charIDToTypeID( "QCSt" );
    var idQcsa = charIDToTypeID( "Qcsa" );
    desc1516.putEnumerated( idFTcs, idQCSt, idQcsa );
    var idOfst = charIDToTypeID( "Ofst" );
        var desc1517 = new ActionDescriptor();
        var idHrzn = charIDToTypeID( "Hrzn" );
        var idPxl = charIDToTypeID( "#Pxl" );
        desc1517.putUnitDouble( idHrzn, idPxl, 0.000000 );
        var idVrtc = charIDToTypeID( "Vrtc" );
        var idPxl = charIDToTypeID( "#Pxl" );
        desc1517.putUnitDouble( idVrtc, idPxl, 0.000000 );
    var idOfst = charIDToTypeID( "Ofst" );
    desc1516.putObject( idOfst, idOfst, desc1517 );
    var idWdth = charIDToTypeID( "Wdth" );
    var idPrc = charIDToTypeID( "#Prc" );
    desc1516.putUnitDouble( idWdth, idPrc, 192.270531 );
    var idLnkd = charIDToTypeID( "Lnkd" );
    desc1516.putBoolean( idLnkd, true );
    var idIntr = charIDToTypeID( "Intr" );
    var idIntp = charIDToTypeID( "Intp" );
    var idBcbc = charIDToTypeID( "Bcbc" );
    desc1516.putEnumerated( idIntr, idIntp, idBcbc );
executeAction( idTrnf, desc1516, DialogModes.NO );

*/