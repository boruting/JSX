

//$.evalFile("/js/helper.js");



function main(pat, assetsName) {

    alert(pat + "  " + assetsName);

}

/**
* 处理符合规则的文件列表
* @param {Array} todo
*/
function parseFiles(todo) {
    for (var len = todo.length, i = 0; i < len; i++) {
        var arr = todo[i];
        //parseFile(arr);
    }
}

function mainParseFile(pat, assetsName, typeVal,extensionPath) {

    alert("  sss  ");
    alert(pat + " a " + assetsName + " s " + typeVal + " d " + extensionPath);

    // if (assetsName && assetsName && typeVal) {
    //     alert(pat + " 2 " + assetsName + " 2 " + typeVal);
    //     if (pat) {
    //         alert(pat + " 3 " + assetsName + " 3 " + typeVal);
    //         var fullnames = pat.fullName.split(".");

    //         if (fullnames[1] != "xlsx") {

    //             alert("打开的文件有误");

    //         } else {

    //             parseFiles(todo);

    //         }

    //     } else {
    //         alert("你已取消了 本次导出!")
    //     }

    // }



}

function parseFile(pat, assetsName, typeVal,extensionPath) {
    //alert(extensionPath);

    $.evalFile(extensionPath + "/js/helper.js");
    $.evalFile(extensionPath + "/jsx/handlePX.jsx");
    
    //$.global.getExcelLines = new getExcelLines();
    //alert(pat + " a " + assetsName + " s " + typeVal );
    //var test = File($.fileName).path;
    // alert("这里是   "+test);
    var doc = app.activeDocument;
    var docFile = doc.fullName;//当前文档的路径全名 
    var excelFile = new File(pat);// 需要打开xlsx文档    
    var type = typeVal;// 切图类型
    var pngOutAssetsName = assetsName;//需要保存图片的文件
    	saveOption = new ExportOptionsSaveForWeb();
	saveOption.format = SaveDocumentType.PNG;
        saveOption.PNG8 = false;

    //alert( "文档是:  " + excelFile.exists );

    if (excelFile.exists) {
        //alert("这里是1");
        var lines = getExcelLines(excelFile);
        //alert("这里是2");
        if (lines) {
            // alert("这里是lines");
            var len = lines.length;
            if (len > 0) {
                // alert("这里是len");
                //找到文本层，进行替换
                var layers = doc.layers;
                var textItem = null;
                for (var j = 0, llen = layers.length; j < llen; j++) {
                    var layer = layers[j];
                    if (layer.layers) {
                        // alert("替换文本用psd，不允许有子文件夹");
                        continue;
                    }
                    //不做多层级遍历，也不判定文本名称
                    if (layer.kind == "LayerKind.TEXT") {
                        textItem = layer.textItem;
                        break;
                    }
                }
                if (textItem) {
                    //alert("这里是textItem");
                    var oldText = textItem.contents;
                    for (var i = 1; i < len; i++) {                   //从第二行开始读
                        var line = lines[i];
                        var tFileName = line[0];                      //翻译的资源名次
                        var text = translate || line[1];               //要输出的文本
                        var translate = line[2];                        //翻译的内容
                        var ignore = line[3];                           //检测第4列是否内用是否等于"不导出"						
                        if (ignore != 1) {
                            //alert("这里是ignore");
                            textItem.contents = text.replace(/&#10;/g, "\n").replace(/&#13;/g, "\r").replace(/\r?\n/g, "\r");
                            // alert("这里是  "+textItem.contents);
                            var folder = new Folder(docFile.path + "/" + pngOutAssetsName);
                            // alert("这里是  "+docFile.path);
                            if (!folder.exists) {
                                // alert("这里是folder.exists ");					//创建文件夹
                                folder.create();
                            }
                            //判断表格第一列文字中是否存在"/" 如果有创建子级问价夹 
                            if (tFileName.indexOf('/') != -1) {
                                // alert("这里是tFileName.indexOf)  "+tFileName.indexOf);	
                                var nFileName = tFileName.split("/");
                                var nFileName = nFileName[0];		//获取表格第一列内容中的/前的文字
                                var folder_ = new Folder(docFile.path + "/" + pngOutAssetsName + "/" + nFileName);

                                if (!folder_.exists) {
                                    folder_.create();
                                }
                            }


                            //处理固定像素
                            // alert("这里是dan   "+dan);
                            if (type == "type1") {  //alert("这里是dan2   "+dan);
                                var outfile = new File(docFile.path + "/" + pngOutAssetsName + "/" + tFileName + ".png");//保存图片到
                                //alert("这里是outfile   "+outfile);
                                doc.exportDocument(outfile, ExportType.SAVEFORWEB, saveOption);
                                //alert("这里是000000000000000   "); 
                            }
                            //处理实际像素
                            if (type == "type2") {

                                //栅格化图层样式
                                rasterizeLayer();
                                //创建 图层实际像素全区
                                actualXuanqu();
                                //剪裁画布大小 到 图层实际像素 
                                cropDounds();
                                //web方式保存图片到指定目录
                                var outfile = new File(docFile.path + "/" + pngOutAssetsName + "/" + tFileName + ".png");//保存图片到
                                //$.writeln(outfile);
                                doc.exportDocument(outfile, ExportType.SAVEFORWEB, saveOption);
                                //还原历史记录到打开时
                                returnRecords();

                            }

                        }

                    }
                    textItem.contents = oldText;
                }
            }
        }
    }
    alert("处理完成!");
}


function importLnkd(pat) {

    //alert(pat);
    var idPlc = charIDToTypeID("Plc ");
    var desc634 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    desc634.putPath(idnull, new File(pat));//这里应该是路径加获取到到名字 
    // 这里应该检测下psd是否存在
    var idLnkd = charIDToTypeID("Lnkd");//定义为连接对象
    desc634.putBoolean(idLnkd, true);
    executeAction(idPlc, desc634, DialogModes.NO);
    //alert(pat);
}

