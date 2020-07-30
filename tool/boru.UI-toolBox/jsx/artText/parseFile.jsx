/**
* 处理单个文件
* @param {Docuement} doc
*/
function parseFile(doc,excelFile) {
    //alert(pngOutAssetsName);
    var docFile = doc.fullName;
    var f = docFile.fullName;
    //检查是否有同名文件在同目录
    var filePaths = f.split("/");
    var fileName = filePaths[filePaths.length - 1];
    var fileNames = fileName.split(".");
    //var excelFile = new File(docFile.path + "/" + fileNames[0] + ".xlsx");
    //var excelFile = file;
    if (!excelFile) {
        excelFile = new File(docFile.path + "/" + fileNames[0] + ".xlsx");
    }
    if (excelFile.exists) {
        var lines = getExcelLines(excelFile);
        if (lines) {
            var len = lines.length;
            if (len > 0) {
                //找到文本层，进行替换
                var layers = doc.layers;
                var textItem = null;
                for (var j = 0, llen = layers.length; j < llen; j++) {
                    var layer = layers[j];
                    if (layer.layers) {
                        alert("替换文本用psd，不允许有子文件夹");
                        continue;
                    }
                    //不做多层级遍历，也不判定文本名称
                    if (layer.kind == "LayerKind.TEXT") {
                        textItem = layer.textItem;
                        break;
                    }
                }
                if (textItem) {
                    var oldText = textItem.contents;
                    for (var i = 1; i < len; i++) {                   //从第二行开始读
                        var line = lines[i];
                        var tFileName = line[0];                      //翻译的资源名次
                        var text = translate || line[1];               //要输出的文本
                        var translate = line[2];                        //翻译的内容
                        var ignore = line[3];                           //检测第4列是否内用是否等于"不导出"						
                        if (ignore != 1) {
                            textItem.contents = text.replace(/&#10;/g, "\n").replace(/&#13;/g, "\r").replace(/\r?\n/g, "\r");
                            var folder = new Folder(docFile.path + "/" + pngOutAssetsName);

                            if (!folder.exists) {					//创建文件夹
                                folder.create();
                            }
                            //判断表格第一列文字中是否存在"/" 如果有创建子级问价夹 
                            if (tFileName.indexOf('/') != -1) {

                                var nFileName = tFileName.split("/");
                                var nFileName = nFileName[0];		//获取表格第一列内容中的/前的文字
                                var folder_ = new Folder(docFile.path + "/" + pngOutAssetsName + "/" + nFileName);

                                if (!folder_.exists) {
                                    folder_.create();
                                }
                            }
                            
                            //栅格化图层样式
                            // rasterizeLayer();
                            // //创建 图层实际像素全区
                            // actualXuanqu();
                            // //剪裁画布大小 到 图层实际像素 
                            // cropDounds();
                            //web方式保存图片到指定目录
                            var outfile = new File(docFile.path + "/" + pngOutAssetsName + "/" + tFileName + ".png");//保存图片到
                            $.writeln(outfile);
                            doc.exportDocument(outfile, ExportType.SAVEFORWEB, saveOption);
                            //还原历史记录到打开时
                            returnRecords();
                        }

                    }
                    textItem.contents = oldText;
                }
            }
        }
    }
    alert("处理完成!");
}
