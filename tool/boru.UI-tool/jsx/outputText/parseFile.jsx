/*
//测试区
var fff = File($.fileName).parent.parent.parent;
$.evalFile(fff + "/js/helper.js");
$.evalFile(File($.fileName).path + "/handlePX.jsx");
$.global.getExcelLines = getExcelLines;
var test = File($.fileName).path;
var pat = "D:/sg2/psd/文档/数字.xlsx";
var assetsName = "assetsText";
var typeVal = "type3";
parseFile(pat, assetsName, typeVal);
*/
function parseFile(pat, assetsName, typeVal) {
    //alert(extensionPath);
    //$.evalFile(in_extendPath + "/jsx/handlePX.jsx");
    //$.global.getExcelLines = new getExcelLines();
    //alert(pat + " a " + assetsName + " s " + typeVal );
    //var test = File($.fileName).path;
    // alert("这里是   "+test);

    var doc = app.activeDocument;
    var docFile = doc.fullName; //当前文档的路径全名 
    var excelFile = new File(pat); // 需要打开xlsx文档    
    var type = typeVal; // 切图类型 type1
    var pngOutAssetsName = assetsName; //需要保存图片的文件
    saveOption = new ExportOptionsSaveForWeb();
    saveOption.format = SaveDocumentType.PNG;
    saveOption.PNG8 = false;
    var sheetName = docFile.name.split(".");
    sheetName = sheetName[0];

    if (excelFile.exists) {
        //alert("这里是1");
        //获取Excel文件中的数据 
        //var lines = getExcelLines(excelFile,sheetName);
        //alert("这里是lis  "+ lis );
        var lines = getExcelLines(excelFile);
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
                    for (var i = 1; i < len; i++) { //从第二行开始读
                        var line = lines[i];
                        var tFileName = line[0]; //翻译的资源名次
                        var text = translate || line[1]; //要输出的文本
                        var translate = line[2]; //翻译的内容
                        var ignore = line[3]; //检测第4列是否内用是否等于"不导出"						
                        if (ignore != 1) {
                            //alert("这里是ignore");
                            //if(tabType == "tabType"){
                            //	amendTextContents(text.replace(/&#10;/g, "\n").replace(/&#13;/g, "\r").replace(/\r?\n/g, "\r"));
                            //}
                            textItem.contents = text.replace(/&#10;/g, "\n").replace(/&#13;/g, "\r").replace(/\r?\n/g, "\r");
                            // alert("这里是  "+textItem.contents);
                            var parentPath = decodeURI(docFile.path + "/" + pngOutAssetsName + "/" + sheetName);
                            //var parentPath = docFile.path.substr(0, docFile.path.length - 4) + "/" + pngOutAssetsName;
                            //var parentPath = docFile.parent.parent.fsName + "/" + pngOutAssetsName;
                            //alert("-----" + decodeURI(docFile.path) + "-------");
                            var folder = new Folder(parentPath);


                            // alert("这里是  "+docFile.path);
                            if (!folder.exists) {
                                // alert("这里是folder.exists ");					//创建文件夹
                                folder.create();
                            }
                            //判断表格第一列文字中是否存在"/" 如果有创建子级问价夹 
                            if (tFileName.indexOf('/') != -1) {//indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
                                // alert("这里是tFileName.indexOf)  "+tFileName.indexOf);	
                                var nFileName = tFileName.split("/");
                                var nFileName = nFileName[0]; //获取表格第一列内容中的/前的文字
                                var folder_ = new Folder(parentPath + "/" + nFileName);

                                if (!folder_.exists) {
                                    folder_.create();
                                }
                            }


                            //处理固定像素
                            // alert("这里是dan   "+dan);
                            if (type == "type1") { //alert("这里是dan2   "+dan);
                                var outfile = new File(decodeURI(parentPath + "/" ) + tFileName + ".png"); //保存图片到
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
                                var outfile = new File(decodeURI(parentPath + "/" )+ tFileName + ".png"); //保存图片到
                                
                                //$.writeln(outfile);
                                doc.exportDocument(outfile, ExportType.SAVEFORWEB, saveOption);
                                //还原历史记录到打开时
                                returnRecords();

                            }
                            if (type == "type3") {

                                //栅格化图层样式
                                rasterizeLayer();
                                //创建 图层实际像素全区
                                actualXuanqu();
                                //延申选区

                                //var doc = app.activeDocument;
                                //var type2 = SelectionType.EXTEND;//延申选区
                                var type2 = SelectionType.REPLACE//替换选区
                                var feather = 0;//表示构建选区时的羽化值
                                var antiAlias = true;//表示构建选区时是否抗锯齿。
                                //当前图层边界信息
                                var bounds = doc.selection.bounds;
                                var x = bounds[0].value;
                                var y = 0;
                                var w = bounds[2].value;
                                //var h = boundsInfo.h;
                                var h = doc.height;

                                var region = [[x, y], [w, y], [w, h], [x, h]];


                                doc.selection.select(region, type2, feather, antiAlias);
                                //剪裁画布大小 到 图层实际像素 
                                cropDounds();
                                //web方式保存图片到指定目录
                                var outfile =new File(decodeURI(parentPath + "/" )+  tFileName + ".png"); //保存图片到
                                //$.writeln(outfile);
                                doc.exportDocument(outfile, ExportType.SAVEFORWEB, saveOption);
                                //还原历史记录到打开时
                                returnRecords();

                            }


                        }

                    }

                }
                textItem.contents = oldText;
            }
        }
    }
    alert("处理完成!");
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