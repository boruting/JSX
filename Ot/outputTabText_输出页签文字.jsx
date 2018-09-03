#include "helper.js"
var docRef = activeDocument;
var layers = docRef.layers;

var amendTextContents = function (txtContents){
    //var txtContents = "111";
    for (var i=0,len=layers.length;i < len;i++){
         
        layer = layers[i];
        if (layer.kind == "LayerKind.TEXT") {
            textItem = layer.textItem;
            textItem.contents = txtContents;
            }
    }
}

var pat = app.openDialog()[0];

parseFile(pat);

function parseFile(pat) {

    var doc = app.activeDocument;
    var docFile = doc.fullName;//当前文档的路径全名 
    var excelFile = new File(pat);// 需要打开xlsx文档    

    var pngOutAssetsName = "页签文字";//需要保存图片的文件
    	saveOption = new ExportOptionsSaveForWeb();
		saveOption.format = SaveDocumentType.PNG;
        saveOption.PNG8 = false;



    if (excelFile.exists) {
        
        var lines = getExcelLines(excelFile);
       
        if (lines) {
            
            var len = lines.length;
            if (len > 0) {
                
                var layers = doc.layers;
                var textItem = null;
                for (var j = 0, llen = layers.length; j < llen; j++) {
                    var layer = layers[j];
                    if (layer.layers) {
                        
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
                            amendTextContents(text.replace(/&#10;/g, "\n").replace(/&#13;/g, "\r").replace(/\r?\n/g, "\r"))
                            //textItem.contents = text.replace(/&#10;/g, "\n").replace(/&#13;/g, "\r").replace(/\r?\n/g, "\r");
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


                            var outfile = new File(docFile.path + "/" + pngOutAssetsName + "/" + tFileName + ".png");//保存图片到
                                //alert("这里是outfile   "+outfile);
                            doc.exportDocument(outfile, ExportType.SAVEFORWEB, saveOption);


                        }

                    }
                    textItem.contents = oldText;
                }
            }
        }
    }
    alert("处理完成!");
}