/**
 * 切图插件 
 * @param {*} generateImg 生成图片 
 */
var generateImg = {};
var doc = app.activeDocument;
var fullPath = "fskj/csj/psd/主界面/主角头像信息.psd";
/**
* 获取psd 和 UI 路径 
* 保证 psd 文件夹 和 UI 文件夹 路径结构统一
* 切图方式参考 psd到unity 脚本
* @param {*} fullPath 路径 当前psd文档路径 var fullPath = doc.fullName;
*/
generateImg.get_uiPath = function (fullPath) {
    var psdPath = fullPath.substr(0, fullPath.length - 5);//去掉路径后缀
    var pasPathArr = psdPath.split("/");//路径转换成数组 
    var lower = pasPathArr[2].toLowerCase();//获取数组中的 对应psd的 元素
    if (lower == "psd") {//把数组中 psd 文件夹  修改成 UI
        pasPathArr.splice(2, 1, "ui");
    }
    var uiPath = pasPathArr.join("/");
    return uiPath;
}

var outfile = generateImg.get_uiPath(fullPath);
/**
 * @param {*} doc 当前激活的psd文档
 * @param {*} outfile 导出路径
 */
generateImg.saveImg = function (doc, outfile) {

    if (outfile.exists) {
        saveOption = new ExportOptionsSaveForWeb();
        saveOption.format = SaveDocumentType.PNG;//-24 //JPEG, COMPUSERVEGIF, PNG-8, BMP 
        saveOption.transparency = true;
        saveOption.blur = 0.0;
        saveOption.includeProfile = false;
        saveOption.interlaced = false;
        saveOption.optimized = true;
        saveOption.quality = 100;
        saveOption.PNG8 = false;
    }

    doc.exportDocument(outfile, ExportType.SAVEFORWEB, saveOption);
    //app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);//关闭psd
}
console.log(generateImg.get_uiPath(fullPath));

/**
 * 筛选需要 切图的 图层或组 (可以根据图层后缀)
 * 文件夹类型切图
 * 文本类型切图
 * 切图 格式 jpeg(品质可选) png
 * 筛选需要 切图的 图层或组
 */