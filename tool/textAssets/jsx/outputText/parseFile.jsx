/**
 * @param {*} pat xlsx文档全路径
 * @param {*} assetsName 需要保存图片的文件
 * @param {*} imgTypeVal 切图类型
 * @param {*} nameTypeVal 图片名字类型 nameType2 为 序号_类型名 nameType1 为 类型名_序号
 */
function parseFile(pat, assetsName, imgTypeVal, nameTypeVal) {
    var doc = app.activeDocument;
    var docFile = doc.fullName;//当前文档的路径全名
    if (pat.substr(-5) === ".xlsx") {

        //var type = typeVal;
        //var pngOutAssetsName = assetsName;
        var excelFile = new File(pat); //通过 pat 给的路径 打开xlsx文档
        saveOption = new ExportOptionsSaveForWeb();
        saveOption.format = SaveDocumentType.PNG;
        //saveOption.quality = 100;
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

                    //var textItem = null;
                    var textItem = getChildLayer_textItem(layers);

                    //alert("这里是textItem"+textItem);
                    if (textItem) {
                        //alert("textItem是: "+textItem);
                        var oldText = textItem.contents;
                        for (var i = 1; i < len; i++) {                   //从第二行开始读
                            var line = lines[i];
                            var tFileName = line[0];                      //翻译的资源名次
                            var translate = line[2];                        //翻译的内容
                            var text = translate || line[1];               //要输出的文本
                            
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
                                //判断表格第一列文字中是否存在"/" 如果有创建子级文件夹
                                if (tFileName.indexOf('/') != -1) {
                                    // alert("这里是tFileName.indexOf)  "+tFileName.indexOf);	
                                    
                                    var nFileName = tFileName.split("/");
                                   
                                    //处理是否还有子级 文件夹需要创建
                                    if(nFileName.length<3){
                                        var fileName = nFileName[0];
                                        var imgName = nFileName[1];
                                        //alert(nFileName);
                                        //alert("小于 "+fileName);
                                    }else{
                                        var fileName = nFileName.slice(0,nFileName.length-1);//获取表格第一列内容中的/前的文字                                                           
                                        var fileName = fileName.toString().replace(/,/g,"/");//把 , 转换成 /                                        
                                        var imgName = nFileName[nFileName.length-1];//取数组最后的文字(/最后的文字)
                                        //alert("imgName =  "+imgName);                                         
                                    }                                                                      
                                    //获取表格第一列内容中的/前的文字
                                    //var imgSerial = "_" + nFileName[1].split("_")[1];
                                    //var imgName = nFileName[1].split("_")[0];
                                    //alert("imgName");

                                    if (nameTypeVal == "nameType2") {//图片名字类型 序号_类型名 常规类型
                                        //alertx(imgName + " " + PSD_suf)
                                        var imgName = imgName + PSD_suf + ".png";
                                       
                                    } else if (nameTypeVal == "nameType1") {//图片名字类型 类型名_序号
                                        var PSD_suf = nameSplit[1];
                                        //alert(imgName + " " + PSD_suf)
                                        var imgName = PSD_suf + imgName + ".png";
                                    } else if(nameTypeVal == "nameType0") {
                                        var folder_num = new Folder(parentPath + "/" + fileName + "/" +nameSplit[1]);

                                        if (!folder_num.exists) {
                                            folder_num.create();
                                        }
                                        var imgName = nameSplit[1] + "/" + imgName +  ".png";
                                        //alert("是个啥:    " + imgName);

                                    }else{
                                        alert("错误: " + nameTypeVal);
                                    }


                                    //alert(imgName);
                                    var folder_ = new Folder(parentPath + "/" + fileName);

                                    if (!folder_.exists) {
                                        folder_.create();
                                    }
                                }


                                //处理固定像素
                                // alert("这里是dan   "+dan);
                                if (imgTypeVal == "imgType1") {  //alert("这里是dan2   "+dan);

                                    var outfile = new File(parentPath + "/" + fileName + "/" + imgName);//保存图片到

                                    doc.exportDocument(outfile, ExportType.SAVEFORWEB, saveOption);

                                } else if (imgTypeVal == "imgType2") {//处理实际像素
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
                                } else {
                                    alert("错误: " + imgTypeVal);
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

/**
 * 获取文本图层 包括图层组的子级
 * @param {*} layers 
 */


function getChildLayer_textItem(layers) {
    // alert("len: " +layers.length);
    var textItem = null;
    for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];
        if (layer.typename == "LayerSet") {

            var textItem = getChildLayer_textItem(layer.layers);
            //getChildLayer_textItem(layer.layers);
            //alert("这里textItem: " + textItem);
            return textItem;
        }
        if (layer.kind == "LayerKind.TEXT") {

            textItem = layer.textItem;
            //alert("这里图层名: " + layer.name);
            return textItem;
        }


    }
}
/**
 * 

for (var j = 0, llen = layers.length; j < llen; j++) {
    var layer = layers[j];
    if (layer.typename == "LayerSet") {
        // alert("替换文本用psd，不允许有子文件夹");
        alert("是否进a" + layer.layers);
        //continue;
    }
    //不做多层级遍历，也不判定文本名称
    if (layer.kind == "LayerKind.TEXT") {
        alert("是否进来了");
        textItem = layer.textItem;
        alert("textItem:  " + textItem);
        break;
    }
}
 */

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