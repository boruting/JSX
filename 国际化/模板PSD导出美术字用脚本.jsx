/**
*@author 3tion(chengfang@junyoug.com)
*@description 该版本文件会遍历所有打开的PSD文档，检查文档中psd模板文件是否有同名的xlsx文件，按xlsx中两列数据（第一列为文本内容，第二列为导出png的文件名），进行导出的ExtendScript脚本
*其中Excel文件Sheet1内容如下表单所示：
内容	文件名	翻译后的内容
Tựu	mowen1	
Điển	mowen2
Điển	mowen3
Tựu	mowen4
BXH	mowen5
Map	mowen6
Home	mowen7
Fb	mowen8
*@version 0.0.1
*/
#include "helper.js"

//psd处理以后，导出png的文件夹名称
var pngOutAssetsName = "文字";

//导出png的配置，使用png24导出
var saveOption = new ExportOptionsSaveForWeb();
saveOption.format = SaveDocumentType.PNG;
saveOption.PNG8 = false;

var todoDocuments = [];

/**
* 检查打开的文档，看看每个psd/psb文档有没有同名csv文件，并将符合规则的文档数据存储在todo中
*/
function checkDocument(todo) {
    //检查打开的psd文件   
    for (var len = documents.length, i = 0; i < len; i++) {
        parseFile(documents[i]);
    }
}


/**
* 处理单个文件
* @param {Docuement} doc
*/
function parseFile(doc) {
    var docFile = doc.fullName;
    var f = docFile.fullName;
    //检查是否有同名文件在同目录
    var filePaths = f.split("/");
    var fileName = filePaths[filePaths.length - 1];
    var fileNames = fileName.split(".");
    var excelFile = new File(docFile.path + "/" + fileNames[0] + ".xlsx");
    if (excelFile.exists) {
        var lines=getExcelLines(excelFile);
        if(lines){
            var len = lines.length;
            if (len>0) {
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
                    for (var i = 1; i < len; i++) {//从第二行开始读
                        var line = lines[i];
						var abcd = line[4];//检测第5列是否内用是否等于"不导出"
						//检查是否有第3列的内容，如果有，用第3列翻译的内容进行处理
						var translate = line[2];//翻译的内容
						var tFileName = line[3];//翻译的资源名次
                        var text = translate||line[0];//要输出的文本
                        var fileName = tFileName||line[1];//要输出的文件名
                        
                       
						if(abcd!="不导出"){
							textItem.contents = text;
							var folder = new Folder(docFile.path + "/" + pngOutAssetsName);
							if (!folder.exists) {
                            folder.create();
							}
							//将文件导出
							var outfile = new File(docFile.path + "/" + pngOutAssetsName + "/" + fileName + ".png");
							$.writeln(outfile)
							doc.exportDocument(outfile, ExportType.SAVEFORWEB, saveOption);
						}
                        
                    }
                    textItem.contents = oldText;
                }
            }
        }
    }
}

/**
* 处理符合规则的文件列表
* @param {Array} todo
*/
function parseFiles(todo) {
    for (var len = todo.length, i = 0; i < len; i++) {
        var arr = todo[i];
        parseFile(arr);
    }
}

if(confirm("是否检查所有打开的PSD文档？\n是-检查所有\n否-检查当前PSD文档")){
	checkDocument(todoDocuments);
}
else{
	var doc=getActiveDoc();
	if(doc){
		todoDocuments.push(doc);
	}	
}

parseFiles(todoDocuments);

alert("处理完成!");