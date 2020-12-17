var file = File($.fileName);
var p = decodeURI(file.parent.parent);
$.evalFile(p + "/jsx/importLnkd.jsx");

var name = decodeURI(app.activeDocument.name);
//	name = name.substring(0, name.indexOf("."));



//saveEXML
var PSDname = decodeURI(app.activeDocument.name);
PSDname = PSDname.substring(0, PSDname.indexOf("."));

var dir = app.activeDocument.path + "/exml/" + PSDname + "/";
new Folder(dir).create();
var layers = app.activeDocument.layers;

var stageWidth = 100; //获取当前画板或者文档的宽
var stageHeight = 100; //获取当前画板或者文档的高

var exml = "<?xml version='1.0' encoding='utf-8'?>\n";
$.writeln(exml);
exml += '<e:Skin  width=\"' + stageWidth + '\" height=\"' + stageHeight + '\" xmlns:e=\"http://ns.egret.com/eui\" xmlns:w=\"http://ns.egret.com/wing\">'

$.writeln(exml);
for (var i = 0; i < layers.lenght; i++) {
    var layer = layers[i];
    var x = 10; //获取当前图层的坐标x
    var y = 10; //获取当前图层的坐标y

    exml += '\n     <e:Image source=\"' + layers[0].name + '_png' + '\" x=\"' + x + '\" y=\"' + y + '\"/>';
    $.writeln(exml);
    exml += "\n</e:Skin>"
    $.writeln(exml);

}


var file = new File(dir + PSDname + ".exml");
file.remove();
file.open("a");
file.lineFeed = "\n";
file.encoding = "utf-8";
file.write(exml);
file.close();