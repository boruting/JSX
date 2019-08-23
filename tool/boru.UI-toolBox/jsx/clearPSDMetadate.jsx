

/**
 * 打开智能对象
 *    当前问题打开的是选定图层
 */
var openSmartObject = function (id) {
    
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putIdentifier(charIDToTypeID('Lyr '), id);
    desc.putReference(charIDToTypeID('null'), ref);
    executeAction(charIDToTypeID('slct'), desc, DialogModes.NO);
    executeAction(stringIDToTypeID("placedLayerEditContents"), undefined, DialogModes.NO);
    

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
        }else if (layer.kind == "LayerKind.SMARTOBJECT") {
            $.writeln(layer.name);
            var id = layer.id;
            //activeDocument.activeLayer = layer;
             //executeAction(stringIDToTypeID("placedLayerEditContents"), undefined, DialogModes.NO);
            //BGU 未做图层其他属性处理 例如锁定 不可见
            //openSmartObject(id);//打开智能对象
            layersAncestorsMetadata(app.activeDocument.layers);
            deleteDocumentAncestorsMetadata();//清理数据
            
        }
        //$.writeln(layer.kind);
        
    }
}

layersAncestorsMetadata(app.activeDocument.layers);
alert("PSD文件 原始数据 MXP 清理完成");
