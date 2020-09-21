function newDOC() {
    //定义一个变量[Width]，表示新文档的宽度。
    var width = 40;

    //定义一个变量[height]，表示新文档的高度。
    var height = 40;

    //定义一个变量[resolution]，表示新文档的分辨率。
    var resolution = 72;

    //定义一个变量[docName]，表示新文档的名称。
    var docName = "New Document";

    //定义一个变量[mode]，表示新文档的颜色模式。
    var mode = NewDocumentMode.RGB;

    //定义一个变量[initialFill]，表示新文档的默认背景填充颜色。
    var initialFill = DocumentFill.TRANSPARENT;

    //定义一个变量[pixelAspectRatio]，用来设置新文档的像素比率。
    var pixelAspectRatio = 1;

    //使用[Documents.add]命令创建一个新文档，将设置好的参数放在[add]方法里面。
    app.documents.add(width, height, resolution, docName, mode, initialFill, pixelAspectRatio);
}
//新建文档
//newDOC();

var doc = app.activeDocument;
var layers = doc.layers;
var pat = "C:/Users/Administrator/Desktop/0/";
//保存当前图片 
var saveforWEB = function(layer) {

    saveOption = new ExportOptionsSaveForWeb();
    saveOption.format = SaveDocumentType.PNG;
    saveOption.PNG8 = false;
    var outfile = new File(pat + layer.name + ".png");
    doc.exportDocument(outfile, ExportType.SAVEFORWEB, saveOption);

}

for (var i = 0, len = layers.length; i < len; i++) {
    var layer = layers[i];
    layer.visible = true;
    saveforWEB(layer);
    layer.visible = false;
    $.writeln("啊");
}
alert("完成");