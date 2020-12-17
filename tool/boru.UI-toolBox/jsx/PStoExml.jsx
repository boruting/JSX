/**
 * @author kersBoru
 * @name PStoExml PhotoshopToExml 
 * @description psd文件导出Exml文件
 * @weixin JackdawTing
 * @date 2020-12-17 创建

*/



var file = File($.fileName);
var p = decodeURI(file.parent);
$.evalFile(p + "/lib/Bounds.jsx");
$.evalFile(p + "/lib/getSelectedLayerItemIndex.jsx");
$.evalFile(p + "/lib/Kinase_lib.jsx");



//var layer= activeDocument.activeLayer;
// var aa= Kinase.layer.getLayerTextInfo(Kinase.REF_ActiveLayer,layer.id);
// var bb = Kinase.layer.getLayerBounds(Kinase.REF_LayerID,layer.id);
// var color_raw = Kinase.layer.get_XXX_Objcet(Kinase.REF_ActiveLayer, layer.id, "color");
// color_raw = color_raw.color;
// var layerColor = color_raw.value.enumerationValue;//获取图层的备注颜色

// $.writeln(bb.x);


var PSDname = decodeURI(app.activeDocument.name);
PSDname = PSDname.substring(0, PSDname.indexOf("."));
var dir = app.activeDocument.path + "/exml/" + PSDname + "/";
new Folder(dir).create();

var layers = app.activeDocument.layers;

var stageWidth = 720;
var stageHeight = 1280;

var exml = "<?xml version='1.0' encoding='utf-8'?>\n";
exml += '<e:Skin  width=\"' + stageWidth + '\" height=\"' + stageHeight + '\" xmlns:e=\"http://ns.egret.com/eui\" xmlns:w=\"http://ns.egret.com/wing\">';
var selectedLayers = getSelectedLayerItemIndex();

for (var i = 0; i < selectedLayers.length; i++) {

    var ItemIndex = selectedLayers[i];

    test(layers, ItemIndex);

    //$.writeln(selectedLayers[i]);
}

function test(layers, ItemIndex) {



    for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];
        if (layer.layers) {
            test(layer.layers, ItemIndex)
        }


        if (layer.itemIndex == ItemIndex) {

            var boundsInfo = Kinase.layer.getLayerBounds(Kinase.REF_LayerID, layer.id);
            var x = boundsInfo.x; //获取当前图层的坐标x
            var y = boundsInfo.y; //获取当前图层的坐标y
            var layerName = layer.name;
            var imgName = layerName.split(".");

            if (layer.name.substring(0, 5) == "skin_") { //按钮类型
                var skinName = layer.name;
                exml += '\n     <e:Button label=\"前往充值\"' + ' skinName=\"' + skinName + '\" x=\"' + x + '\" y=\"' + y + '\"/>';

                //$.writeln(exml);
            } else if (layer.kind == LayerKind.TEXT) { //文本图层

                var labelColor = "0x" + layer.textItem.color.rgb["hexValue"];
                var labelSize = layer.textItem.size.value;
                var labelText = layer.textItem.contents;
                var labelBold = Kinase.layer.getLayerTextInfo(Kinase.REF_LayerID, layer.id).bold //仿粗体
                var labelJustification = Kinase.layer.getLayerTextInfo(Kinase.REF_LayerID, layer.id).justification; //段落对齐方式
                exml += '\n     <e:Label text="前往充值" textColor=\"' + labelColor + '\" size=\"' + labelSize + '\" x=\"' + x + '\" y=\"' + y + '\"' + ' textAlign=\"' + labelJustification + '"/>';
                //$.writeln(exml);
            } else {

                if (imgName.length > 1) { //独立资源 (只有这个界面使用的资源----本次切图时)                    textAlign="center"
                    if (imgName[imgName.length - 1] == "png") { //png格式
                        exml += '\n     <e:Image source=\"' + imgName[0] + '_png' + '\" x=\"' + x + '\" y=\"' + y + '\"/>';
                    } else { //暂时中有jpg和png jpg后可能不有图片压缩比(xxx.jpg70%)
                        exml += '\n     <e:Image source=\"' + imgName[0] + '_jpg' + '\" x=\"' + x + '\" y=\"' + y + '\"/>';
                    }

                }
                if (imgName.length == 1) { //共用资源 (资源使用 > 1 个界面的资源----之前切过) 不需要切图的

                    exml += '\n     <e:Image source="' + imgName[0] + '_png' + '\" x=\"' + x + '\" y=\"' + y + '\"/>';
                }
            }





            //var layerName = layer.name.split(".")[0];
            //var layerSuffix = layer.name.s plit(".")[1];0x
            //<e:Image source="4_png" x="0" y="0" />
            //exml += '\n     <e:Image source=\"' + layerName + '_png' + '\" x=\"' + x + '\" y=\"' + y + '\"/>';


            //text="Label"
            //<e:Label text="鸿运福袋" x="50" y="108" textColor="0xC91F0D" size="22" anchorOffsetX="0" width="126" textAlign="center"/>


        }
    }
}
exml += "\n</e:Skin>"
var file = new File(dir + PSDname + ".exml");
file.remove();
file.open("a");
file.lineFeed = "\n";
file.encoding = "utf-8";
file.write(exml);
file.close();
$.writeln(exml);





/*图片资源类型
    
    共用资源 (资源使用 > 1 个界面的资源----之前切过) 不需要切图的 
    独立资源 (只有这个界面使用的资源----本次切图时)  需要切图的
    
    图片扩展名 jpg png 

    按钮类型 需要添加皮肤   
    文本类型[程序字,美术字]

            var type1 = layerName.substring(0,3);
            var type ="btn";
            switch (type) {
                case "btn":
                    $.writeln("按钮");
                    break;
                case layerName.ItemIndex.contents.substring(0,3):
                    $.writeln("程序字");

                    break;
                case "txtArt":
                    $.writeln("美术字");

                    break;
                default:
                    $.writeln("其他");
            }


*/
// name x y  获取文件夹
//$.writeln(boundsInfo.x);   <e:Button label="Button" x="383.5" y="240" skinName="skins.ButtonSkin"/>