/**
* 处理单个文件
* @param {Docuement} doc
*/
function parseFileS(doc) 
{
   //alert(pngOutAssetsName);
    var docFile = doc.fullName;
    var f = docFile.fullName;
    //检查是否有同名文件在同目录
    var filePaths = f.split("/");
    var fileName = filePaths[filePaths.length - 1];
    var fileNames = fileName.split(".");
	//var excelFile = new File(docFile.path + "/" + fileNames[0] + ".xlsx");
    var excelFile = file;
    if(!excelFile)
    {
        excelFile = new File(docFile.path + "/" + fileNames[0] + ".xlsx");
    }    
    if (excelFile.exists)
    {
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
                        
                        if(layers[j].name=="a"){
                            textItemA = layer.textItem;
                            }
                        if(layers[j].name=="b"){
                            textItemB = layer.textItem;
                            }
                        if(layers[0].name!="a"||layers[1].name!="b"){
                            alert("文本图层名字不正确,本次操作结束!!");
                            return;
                            }
       
                    }                   
                } 
				
				
                if (textItemB&&textItemA) {
                    //var oldText = textItem.contents;  //保存原文本的内容
                  
                    for (var i = 1; i < len; i++) {                   //从第二行开始读
                        var line = lines[i];
                        var tFileName = line[0];                       //翻译的资源名次
                        var text = translate||line[1];               //要输出的文本text
                        var translate = line[2];                        //翻译的内容
                        var ignore = line[3];                           //检测第4列是否内用是否等于"不导出"						
						if(ignore!=1){
                                
                                textItemContents = text.replace(/&#10;/g,"\n").replace(/&#13;/g,"\r").replace(/\r?\n/g,"\r");//处理文字中的特殊字符
                                textItemA.contents = textItemContents.substring(0,1); //截取文本第一个字 添加到文本A中
                                textItemB.contents = textItemContents.substring(1,textItemContents.length);//截取文本从第二个字到最后 添加到文本B中
                               
                                //alert( textItemB.contents);    
 
							var folder = new Folder(docFile.path + "/" + pngOutAssetsName); 
							if (!folder.exists) {
								folder.create();
							}
							//将文件导出
							var outfile = new File( docFile.path + "/" + pngOutAssetsName +"/" + tFileName + ".png");
							$.writeln(outfile)
							doc.exportDocument(outfile, ExportType.SAVEFORWEB, saveOption);
							}
                        
                    }
                 //   textItem.contents = oldText;  //还原文本内容
                }
				
            }
        }
    }
    alert("处理完成!");
}
