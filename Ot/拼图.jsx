var timer = function () {
    var myDate = new Date();
    var hours = myDate.getHours();
    var minutes = myDate.getMinutes();
    var seconds = myDate.getSeconds();
    var timer_ = hours + ":" + minutes + ":" + seconds;
    return timer_;
}
$.writeln("开始时间 (" + timer()+")");
doc = activeDocument;
layers = doc.layers;
var layerPositionZeroing = function () {

    for (var i = 0, len = layers.length; i < len; i++) {

        var layer = layers[i];
        var layerName = layer.name;

        if (layerName != "背景") {

            var layerBounds = layer.bounds;             //获取图层边界信息
            //$.writeln("这是图层 "+ layerName +" 边界信息  :"  + layerBounds);
            var layerX = layerBounds[0];               //图层当前x
            var layerX = parseInt(layerX);//类型转换
            var layerY = layerBounds[1];               //图层当前y  
            var layerY = parseInt(layerY);//类型转换
            layer.translate(-layerX, -layerY);//图层归零x

            var layerName_ = layerName.split("_");

            var layerNameX = parseInt(layerName_[0].replace(/[^0-9]/ig, ""));//类型转换 
            var layerNameY = parseInt(layerName_[1].replace(/[^0-9]/ig, ""));//类型转换
            layerWidth = layerBounds[2];           //图层当前宽
            layerHeight = layerBounds[3];
            //$.writeln(layerNameX+"ffff"+layerNameY);
            if (layerNameX === 0 && layerNameY === 0) {

                var layerBounds = layer.bounds;
                layerWidth = layerBounds[2];           //图层当前宽
                layerHeight = layerBounds[3];          //图层当前高 

            }
        }

    }
}



var type = "Ly";

var moveLayer = function (type) {
    layerPositionZeroing();
    for (var i = 0, len = layers.length; i < len; i++) {

        var layer = layers[i];
        var layerName = layer.name;

        if (layerName != "背景") {

            var layerBounds = layer.bounds;  //获取图层边界信息

            var layerX = layerBounds[0];    //图层当前x
            var layerX = parseInt(layerX);
            var layerY = layerBounds[1];    //图层当前y  
            var layerY = parseInt(layerY);  //类型转换  
            var layerName = layerName.split("_");

            var layerNameX = parseInt(layerName[0].replace(/[^0-9]/ig, ""));//类型转换 
            var layerNameY = parseInt(layerName[1].replace(/[^0-9]/ig, ""));//类型转换

            if (type === "Lx") {
                var x = layerWidth * layerNameX;
                var y = layerHeight * layerNameY;
            } else if (type === "Ly") {
                var x = layerWidth * layerNameY;
                var y = layerHeight * layerNameX;
            } else { alert("错误"); }

            layer.translate(x, y);

        }

    }
    $.writeln("结束时间 (" + timer()+")");
   
}
moveLayer(type);

