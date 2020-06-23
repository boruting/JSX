var aDoc = app.activeDocument;
var layer = aDoc.activeLayer;
$.writeln(layer);
//layer.translate(100,100);
layer.cut();
$.writeln("layer");