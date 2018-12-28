﻿/**
 * @param {*} pat xlsx文档全路径
 * @param {*} assetsName 需要保存图片的文件
 * @param {*} typeVal 切图类型
 */
function parseFile(pat, assetsName, typeVal) {
    var doc = app.activeDocument;
    var docFile = doc.fullName;//当前文档的路径全名
    if (pat.substr(-5) === ".xlsx") {

        //var type = typeVal;
        //var pngOutAssetsName = assetsName;
        var excelFile = new File(pat); //通过 pat 给的路径 打开xlsx文档
        saveOption = new ExportOptionsSaveForWeb();
        saveOption.format = SaveDocumentType.PNG;
        saveOption.PNG8 = false;
        
        var nameSplit = docFile.name.split(".")[0].split("_");
        var sheetName = nameSplit[0];
        //处理psd名字 psd分类 (xxx0_0 的 _0) 有复制原有的  没有 空
        if (nameSplit[1] === undefined) {

            var PSD_suf = "";

        } else {
            var PSD_suf = "_" + nameSplit[1];
        }


        
        //alert("这里是psd文件名  " + PSD_suf);
        

        if (excelFile.exists) {

            //var lines = getExcelLines(excelFile);
            var lines = getExcelLines(excelFile, sheetName);

            if (lines) {


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
                    //alert("这里是textItem"+textItem);
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
                                //if(tabType == "tabType"){
                                //	amendTextContents(text.replace(/&#10;/g, "\n").replace(/&#13;/g, "\r").replace(/\r?\n/g, "\r"));
                                //}
                                textItem.contents = text.replace(/&#10;/g, "\n").replace(/&#13;/g, "\r").replace(/\r?\n/g, "\r");
                                // alert("这里是  "+textItem.contents);

                                //var parentPath = docFile.path.substr(0,docFile.path.length-4) + "/" + pngOutAssetsName;
                                var parentPath = docFile.parent.parent.fsName + "/" + assetsName;
                                //alert("这里是  "+parentPath);
                                var folder = new Folder(parentPath);
                                //alert("这里是  1");

                                // alert("这里是  "+docFile.path);
                                if (!folder.exists) {
                                    // alert("这里是folder.exists ");					//创建文件夹
                                    folder.create();
                                }
                                //判断表格第一列文字中是否存在"/" 如果有创建子级问价夹 
                                if (tFileName.indexOf('/') != -1) {
                                    // alert("这里是tFileName.indexOf)  "+tFileName.indexOf);	
                                    var nFileName = tFileName.split("/");
                                    var fileName = nFileName[0];//获取表格第一列内容中的/前的文字
                                    var imgSerial = "_" + nFileName[1].split("_")[1];
                                    var imgName = nFileName[1].split("_")[0];
                                    var imgName = imgName + PSD_suf + imgSerial + ".png";



                                    var folder_ = new Folder(parentPath + "/" + fileName);

                                    if (!folder_.exists) {
                                        folder_.create();
                                    }
                                }


                                //处理固定像素
                                // alert("这里是dan   "+dan);
                                if (typeVal == "type1") {  //alert("这里是dan2   "+dan);

                                    var outfile = new File(parentPath + "/" + fileName + "/" + imgName);//保存图片到

                                    doc.exportDocument(outfile, ExportType.SAVEFORWEB, saveOption);

                                }
                                //处理实际像素
                                if (typeVal == "type2") {
                                    // alert("这里是  2");
                                    //栅格化图层样式
                                    rasterizeLayer();
                                    //创建 图层实际像素全区
                                    actualXuanqu();
                                    //剪裁画布大小 到 图层实际像素 
                                    cropDounds();
                                    //web方式保存图片到指定目录
                                    var outfile = new File(parentPath + "/" + fileName + "/" + imgName);//保存图片到
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
                alert("处理完成!");
            } else if (lines === undefined) {
                alert("未找到名称 " + sheetName + " 的Sheet 页签");
            } else {
                alert("其他错误");
            }
        } else { alert("表格错误"); }
    } else { alert("这货不是 .xlsx 格式哦"); }
}


var amendTextContents = function (txtContents) {

    var docRef = activeDocument;
    var layers = docRef.layers;

    for (var i = 0, len = layers.length; i < len; i++) {

        layer = layers[i];
        if (layer.kind == "LayerKind.TEXT") {
            textItem = layer.textItem;
            textItem.contents = txtContents;
        }
    }
}