var idR = charIDToTypeID("Rd  ");
var idG = charIDToTypeID("Grn ");
var idB = charIDToTypeID("Bl  ");
var doc = activeDocument;


/**
 * 对通道做选区
 * @param {*} idRGB 根据 rgb 对相应通道做选区
 */
var tongDaoXuanQU = function (idRGB) {

    var desc = new ActionDescriptor();
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    var refRGB = new ActionReference();
    var idnull = charIDToTypeID("null");
    var idChnl = charIDToTypeID("Chnl");
    var idfsel = charIDToTypeID("fsel");
    var idT = charIDToTypeID("T   ");
    var idsetd = charIDToTypeID("setd");
    var idsetd = charIDToTypeID("setd");

    ref.putProperty(idChnl, idfsel);
    desc.putReference(idnull, ref);

    refRGB.putEnumerated(idChnl, idChnl, idRGB);
    desc.putReference(idT, refRGB);

    executeAction(idsetd, desc, DialogModes.NO);


}

var setForegroundColor = function (RGB) {
    
    var idsetd = charIDToTypeID("setd");
    var desc1 = new ActionDescriptor();
    var desc2 = new ActionDescriptor();
    var ref = new ActionReference();
    var idnull = charIDToTypeID("null");
    var idClr = charIDToTypeID("Clr ");
    var idFrgC = charIDToTypeID("FrgC");
    var idRGBC = charIDToTypeID("RGBC");
    ref.putProperty(idClr, idFrgC);
    desc1.putReference(idnull, ref);
    var idT = charIDToTypeID("T   ");


    switch (RGB) {

        case "R":
            var RGB = colorR(desc2);
            break;

        case "G":
            var RGB = colorG(desc2);
            break;

        case "B":
            var RGB = colorB(desc2);
            break;

        default:
            return alert("错误");
    }




    desc1.putObject(idT, idRGBC, RGB);
    var idSrce = charIDToTypeID("Srce");
    desc1.putString(idSrce, """swatchesReplace""");
    executeAction(idsetd, desc1, DialogModes.NO);
}

//红色
function colorR(desc) {

    var idRd = charIDToTypeID("Rd  ");
    desc.putDouble(idRd, 255.000000);
    var idGrn = charIDToTypeID("Grn ");
    desc.putDouble(idGrn, 0.000000);
    var idBl = charIDToTypeID("Bl  ");
    desc.putDouble(idBl, 0.000000);
    return desc;

}
//绿色
function colorG(desc) {

    var idRd = charIDToTypeID("Rd  ");
    desc.putDouble(idRd, 0.000000);
    var idGrn = charIDToTypeID("Grn ");
    desc.putDouble(idGrn, 255.000000);
    var idBl = charIDToTypeID("Bl  ");
    desc.putDouble(idBl, 0.000000);
    return desc;

}
//蓝色
function colorB(desc) {

    var idRd = charIDToTypeID("Rd  ");
    desc.putDouble(idRd, 0.000000);
    var idGrn = charIDToTypeID("Grn ");
    desc.putDouble(idGrn, 0.000000);
    var idBl = charIDToTypeID("Bl  ");
    desc.putDouble(idBl, 255.000000);
    return desc;

}
//蓝色通道选区 
tongDaoXuanQU(idB);
//修改前景色  
setForegroundColor("B");
//新建图层  
var layerB = doc.artLayers.add();
layerB.name = "蓝色";

//填充 前景色
doc.selection.fill (app.foregroundColor);
//隐藏图层
layerB.visible = false;

tongDaoXuanQU(idG);
setForegroundColor("G");
var layerG = doc.artLayers.add();
layerG.name = "绿色";
doc.selection.fill (app.foregroundColor);
layerG.visible = false;

tongDaoXuanQU(idR);
setForegroundColor("R");
var layerR = doc.artLayers.add();
layerR.name = "红色";
doc.selection.fill (app.foregroundColor);
layerR.visible = false;





