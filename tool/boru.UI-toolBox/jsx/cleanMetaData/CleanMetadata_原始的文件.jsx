//文件信息清理 (xmp)
function deleteDocumentAncestorsMetadata() {

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

    }

}

//Now run the function to remove the document ancestors

deleteDocumentAncestorsMetadata();
alert("PSD文件 原始数据 MXP 清理完成");
/* "d050417e-9391-11da-b471-e3bc7901da37"   疑似库文件名
     c649bd32-1ed5-42a5-9264-dd48c0fced6d

*/