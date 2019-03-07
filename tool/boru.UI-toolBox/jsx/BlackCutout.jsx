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
    

    ref.putProperty(idChnl, idfsel);
    desc.putReference(idnull, ref);

    refRGB.putEnumerated(idChnl, idChnl, idRGB);
    desc.putReference(idT, refRGB);

    executeAction(idsetd, desc, DialogModes.NO);


}
var blueInfo = {
    color:"0000ff",
    name:"蓝色",
    //idRGB: "idB"
    idRGB: charIDToTypeID("Bl  ")
}
var redInfo = {
    color:"ff0000",
    name:"红色",
    //idRGB: "idB"
    idRGB: charIDToTypeID("Rd  ")
}
var greenInfo = {
    color:"00ff00",
    name:"绿色",
    //idRGB: "idB"
    idRGB: charIDToTypeID("Grn ")
}
function test (colorInfo){
    
    //蓝色通道选区 
    tongDaoXuanQU(colorInfo.idRGB);
    //修改前景色  
    foregroundColor .rgb.hexValue = colorInfo.color;//蓝色
    //新建图层  
    var layerB = doc.artLayers.add();
    layerB.name = colorInfo.name;
    //填充 前景色
    doc.selection.fill (app.foregroundColor);
    //隐藏图层
    layerB.visible = false;
    
}
test(blueInfo);
test(greenInfo);
test(redInfo);



