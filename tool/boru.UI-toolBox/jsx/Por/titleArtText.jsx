/**
 * @author boru
 * @name 项目标题切图
 * @description 一级标题文字拆分单子切图
 * @weixin JackdawTing
 * @date 2020-09-21 创建
 *
 */
 
var doc = app.activeDocument;
var layers = doc.layers;
main(layers);

function main(layers) {

    var len = layers.length;
    
    var arr = contentsToArr(layers);

    for (var i = 0; i < len; i++) {

        var layer = layers[i];
        var layerName = layer.name;
        if (layer.layers) {

            main(layer.layers);
        }
        if (layer.kind == "LayerKind.SMARTOBJECT" && layerName == "标题字体_单字") {

            activeDocument.activeLayer = layer; //选中当前激活文档的当前图层
            executeAction(stringIDToTypeID("placedLayerEditContents"), undefined, DialogModes.NO); //编辑智能对象

            
            exportPNG(arr);
            return alert("完成");

        }


    }
    
}
/**
 * 文本图层内容 转数组
 * 
 */
function contentsToArr(layers) {

    var len = layers.length;

    for (var i = 0; i < len; i++) {

        var layer = layers[i];
        var layerName = layer.name;
        if (layer.layers) {

            contentsToArr(layer.layers);
        }
        if (layer.kind == "LayerKind.TEXT" && layerName == "::标题") {

            var textItem = layer.textItem;
            var con = textItem.contents;
            var arr = Array.prototype.slice.call(con);
            //$.writeln(arr);
            return arr;
        }


    }
}
/**
 * 导出图片
 * 
 */
function exportPNG(arr) {

    var doc = app.activeDocument;
    var layers = doc.layers;
    var docFile = doc.fullName;
    var filePaths = docFile.fullName.split("/");
    var fileName = filePaths[filePaths.length - 1];
    var fileNames = fileName.split(".");
    
    var pngOutAssetsName = fileNames[0] + "-assets"; //需要保存图片的文件
    saveOption = new ExportOptionsSaveForWeb();
    saveOption.format = SaveDocumentType.PNG;
    saveOption.PNG8 = false;
    if (arr.length > 0) {

        for (var j = 0; j < layers.length; j++) {
            var layer = layers[j];
            if (layer.kind == "LayerKind.TEXT") {
                textItem = layer.textItem;
                break;
            }
        }

        if (textItem) {

            for (var i = 0; i < arr.length; i++) {
                var txt = arr[i];
                textItem.contents = txt;
                var parentPath = docFile.path + "/" + pngOutAssetsName;
                var folder = new Folder(parentPath);
                if (!folder.exists) {
                    // alert("这里是folder.exists ");					
                    folder.create(); //创建文件夹
                }
                var outfile = new File(parentPath + "/" + txt + ".png"); //保存图片到

                doc.exportDocument(outfile, ExportType.SAVEFORWEB, saveOption); //保存

            }
        }

    }
    activeDocument.close(SaveOptions.SAVECHANGES);
}