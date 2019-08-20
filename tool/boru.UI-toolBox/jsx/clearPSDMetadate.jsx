var doc = app.activeDocument;
var layers = doc.layers;

/**
 * 打开智能对象
 *    当前问题打开的是选定图层
 */
var openSmartObject = function () {
    var idplacedLayerEditContents = stringIDToTypeID("placedLayerEditContents");
    var desc = new ActionDescriptor();
    executeAction(idplacedLayerEditContents, desc, DialogModes.NO);

}
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
        app.activeDocument.close(SaveOptions.SAVECHANGES);//保存关闭当前文档
    }

}
/**
 * 对智能对象做清理操作
 * 
 * @param {*} layers 
 */
var layersAncestorsMetadata = function (layers) {
    
    for (var i = 0, len = layers.length; i < len; i++) {
        var layer = layers[i];
        if (layer.layers) {
            layersAncestorsMetadata(layer.layers);
        }
        //$.writeln(layer.kind);
        if (layer.kind == "LayerKind.SMARTOBJECT") {
            $.writeln(layer.name);
            
            openSmartObject();//打开智能对象
            deleteDocumentAncestorsMetadata();//清理数据
            


        }
    }
}

layersAncestorsMetadata(layers);
