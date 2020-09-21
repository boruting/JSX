/**
 * @author boru
 * @name 多文本样式导出脚本
 * @description 同一个尺寸多个文本样式 导出 png图片 脚本(可扩展文本实际像素大小) psd文件的文本图层需要和表格 E列(对应图层) 内容相同
 * @weixin JackdawTing
 * @date 2020-09-21 创建
 *
 */
var file = File($.fileName);
var p = decodeURI(file.parent.parent);
$.writeln(p + "/js/helper.js");
$.evalFile(p + "/js/helper.js");


xlsxData();

function xlsxData() {
    var doc = app.activeDocument;
    var layers = doc.layers;

    var docFile = doc.fullName; //当前文档的路径全名

    var filePaths = docFile.fullName.split("/");
    var fileName = filePaths[filePaths.length - 1];
    var fileNames = fileName.split(".");
    var pat = docFile.path + "/" + fileNames[0] + ".xlsx";
    if (pat.exists) {
        $.writeln("保存");
    }
    var excelFile = new File(pat); // 需要打开xlsx文档 
    var pngOutAssetsName = fileNames[0]+"-assets"; //需要保存图片的文件
    saveOption = new ExportOptionsSaveForWeb();
    saveOption.format = SaveDocumentType.PNG;
    saveOption.PNG8 = false;

    if (excelFile.exists) {
        var lines = getExcelLines(excelFile);
        if (lines) {
            var len = lines.length;
            if (len > 0) {
                for (var i = 1; i < len; i++) { //从第二行开始读
                    var line = lines[i];
                    var tFileName = line[0]; //翻译的资源名次
                    var text = translate || line[1]; //要输出的文本
                    var translate = line[2]; //翻译的内容
                    var ignore = line[3]; //检测第4列是否内用是否等于"不导出"
                    var layerName = line[4]; //第5列 对应图层 


                    if (ignore != 1) {

                        for (var j = 0, llen = layers.length; j < llen; j++) {
                            var layer = layers[j];
                            if (layer.layers) {
                                // alert("替换文本用psd，不允许有子文件夹");
                                continue;
                            }
                            //不做多层级遍历，也不判定文本名称
                            if (layer.kind == "LayerKind.TEXT") {

                                if (layer.name == layerName) {

                                    layer.visible = true;//显示图层
                                    textItem = layer.textItem;
                                    //修改文本内容
                                    textItem.contents = text.replace(/&#10;/g, "\n").replace(/&#13;/g, "\r").replace(/\r?\n/g, "\r");
                                    break;
                                }

                            }
                        }
                        //======================================
                        //$.writeln("保存");
                        var parentPath = docFile.path + "/" + pngOutAssetsName;
                        //$.writeln(parentPath);
                        var folder = new Folder(parentPath);
                        if (!folder.exists) {
                            // alert("这里是folder.exists ");					
                            folder.create(); //创建文件夹
                        }
                        var outfile = new File(parentPath + "/" + tFileName + ".png"); //保存图片到

                        doc.exportDocument(outfile, ExportType.SAVEFORWEB, saveOption); //保存
                        layer.visible = false;//隐藏图层


                    }
                }
            }
        }
        alert("成功 完成"+"\n导出 "+(len-1)+"张 png图片");
    } else {
        alert("失败 对应xlsx文档错误\n请核对 xlsx文件名 是否 与 psd文件名 相同");
    }

}