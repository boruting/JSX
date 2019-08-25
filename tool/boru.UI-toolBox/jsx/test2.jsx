mainFunction(app.activeDocument.layers);
function mainFunction() {
    $.writeln("清理");

    for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];
        if (layer.typename == "LayerSet") {
            layerSetFor(layer.layers);
        }
        if (layer.kind == "LayerKind.SMARTOBJECT") { //判单图层是否是智能对象或连接对象
            
            smartObjectOpen(layer);
        }
        
    }
    app.activeDocument.close(SaveOptions.SAVECHANGES);//保存关闭当前文档


}
function layerSetFor(layers) {
    //var layers = layer.layers;

    for (var i = 0, len = layers.length; i < len; i++) {

        var layer = layers[i]
        if (layer.typename == "LayerSet") {//判断 是否是 画板或图层组 如果是就向下遍历

            layerSetFor(layer.layers);

        }
        if (layer.kind == "LayerKind.SMARTOBJECT") { //判单图层是否是智能对象或连接对象
            smartObjectOpen(layer);
        }

    }
}

function smartObjectOpen(layer) {
    activeDocument.activeLayer = layer;//选中当前激活文档的当前图层
    var openSmart = function () {
        executeAction(stringIDToTypeID("placedLayerEditContents"), undefined, DialogModes.NO);
        mainFunction(app.activeDocument.layers);
    }

    if (layer.allLocked === true) {

        layer.allLocked = false;
        openSmart();

    }
    openSmart();
}  