
function getArtLayerByItemIndex(ItemIndex, namePre, nameSuf) {
    //要找的图层不在根目录，遍历所有图层组去寻找
    return findInLayers(app.activeDocument.layers, );//遍历图层
    //遍历图层修改图层名字
    function findInLayers(layers) {
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            var layerName = layer.name;
            var textItem = null;
            var p = layerName;

            if (layer.typename == "LayerSet")//判断是否是图层组
            {
                //要找到图层图层就是本图层组，直接返回结果：
                if (layer.itemIndex == ItemIndex) {
                    var cext = layerName.substr(-4);
                    if (cext != nameSuf) {

                        layer.name = layerName + nameSuf;
                        layerName = layer.name;
                        $.writeln("跟目录文件夹类型" + layerName);
                        return layerName;
                    }
                    $.writeln("跟目录文件夹类型   已经拥有后缀");
                    return;

                }
                //要找到图层不是本图层组，寻找图层组中的图层，找到就返回结果。如果没有找到这执行 catch ，如果找到多个同名图层则忽略 catch：
                try {
                    var tryF = layer.layers.getByName(layerItemIndexToName(ItemIndex));
                    var cext = tryF.name.substr(-4);

                    if (tryF.itemIndex == ItemIndex) {

                        if (cext != nameSuf) {

                            if (tryF.kind == LayerKind.TEXT) {
                                layerName = tryF.name;
                                txtPre = layerName.substr(0, 4);
                                textItem = tryF.textItem;

                                if (txtPre != namePre) {

                                    tryF.name = namePre + textItem.contents + nameSuf;
                                    layerName = tryF.name;
                                    $.writeln("文本类型 无前前缀");
                                    return layerName;

                                } else {

                                    tryF.name = layerName + nameSuf;
                                    layerName = tryF.name;
                                    $.writeln("文本类型 拥有前缀");
                                    return layerName;
                                }

                            } else {

                                layerName = tryF.name;
                                tryF.name = layerName + nameSuf;
                                layerName = tryF.name;
                                $.writeln("子目录类型的" + layerName);
                                return layerName;

                            }//.......
                        }

                        $.writeln("子目录类型的  已经拥有后缀");
                        return;

                    }
                }
                catch (err) {
                    //要找的图层不是图层组中的图层，接着寻找本图层组中的图层组：
                    var r = findInLayers(layers[i].layerSets);
                    if (r != undefined) { return r; }
                    continue;
                }

                //找到多个同名图层, 比较每个图层的 ItemIndex ：
                var r = findInLayers(layers[i].artLayers);

                if (r != undefined) { return r; }
            }

            else {
                // 比较图层 ItemIndex ：
                if (layer.itemIndex == ItemIndex) {

                    var cext = layerName.substr(-4);
                    if (cext != nameSuf) {

                        //layerName = layer.name
                        layer.name = layerName + nameSuf;
                        layerName = layer.name;
                        $.writeln("根目录的" + layerName);
                        return layerName;
                    }
                    $.writeln("根目录的   已经拥有后缀");
                    return;
                }
            }
        }

    }
}