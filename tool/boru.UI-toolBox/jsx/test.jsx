/**
 * 
 */
var layersAncestorsMetadata = function (layers) {
    for (var i = 0, len = layers.length; i < len; i++) {//遍历图层
        //$.writeln("len=  "+len + "i= "+i);
        var layer = layers[i];//获得图层
        if (layer.layers) {//判断 是否是 画板或图层组 如果是就向下遍历

            $.writeln("当前图层是 画板或图层组  " + layer.name);
            $.writeln("进入子级   拥有子级: " + len);
            layersAncestorsMetadata(layer.layers);  //12

        }
        if (layer.kind == "LayerKind.SMARTOBJECT") { //判单图层是否是智能对象或连接对象

            $.writeln("当前图层是 智能对象" + layer.name);

            activeDocument.activeLayer = layer;//选中当前激活文档的当前图层
            if (layer.allLocked === true) {//判断当前图层 是否是全锁定状态 如果是就解除锁定

                $.writeln("当前图层被 锁定了" + layer.name);
                layer.allLocked = false;//解除图层锁定状态
                // openSmartObject(id);//编辑当前智能对象图层(打开 这个时候当前激活文档会变换成这个智能对象的文档)
                //  layersAncestorsMetadata(app.activeDocument.layers);//判断 是否是 画板或图层组 如果是就向下遍历 
                // deleteDocumentAncestorsMetadata();//清理数据 后 保存并关闭
                $.writeln("解开了 锁定");
            }
            $.writeln("打开 智能对象了    ");
            //openSmartObject(id);//编辑当前智能对象图层(打开 这个时候当前激活文档会变换成这个智能对象的文档)
            // layersAncestorsMetadata(app.activeDocument.layers);//判断 是否是 画板或图层组 如果是就向下遍历
            // deleteDocumentAncestorsMetadata();//清理数据 后 保存并关闭
            if (layer == len) {
                $.writeln("这是最后的图层了" + layer.name);
                //app.activeDocument.close(SaveOptions.SAVECHANGES);//保存当前文档后关闭
                $.writeln("清理了  ");
            }else{
                //break;
            }

        }
        $.writeln("当前图层是 纯图层  " + layer.name);
        


    }
}
layersAncestorsMetadata(app.activeDocument.layers);

