/**
 * 加载脚本
 * @param {*} in_extendPath CEP路径
*/
var initEnzymes = function (in_extendPath,JsxType){
    extendPath = in_extendPath;
    switch(JsxType)
    {
    case "testJsx":
        $.evalFile(extendPath + "/jsx/alertTest.jsx");
        $.global.alertTest=alertTest; //调试脚本
        return;

    case "outputText":
        $.evalFile(extendPath + "/js/helper.js");
        $.evalFile(extendPath + "/jsx/outputText/handlePX.jsx");
        $.evalFile(extendPath + "/jsx/outputText/parseFile.jsx");
        $.global.parseFile = parseFile; //解析 excel 文档并 切图 输出
        return;

    case "rename":
        $.evalFile(extendPath + "/jsx/rename/getArtLayerByItemIndex.jsx");
        $.evalFile(extendPath + "/jsx/rename/getSelectedLayerItemIndex.jsx");
        $.evalFile(extendPath + "/jsx/rename/layerItemIndexToName.jsx");
        $.global.getArtLayerByItemIndex = getArtLayerByItemIndex;
        $.global.getSelectedLayerItemIndex = getSelectedLayerItemIndex;
        //$.global.layerItemIndexToName = layerItemIndexToName;
        return;
    default:
        return;
    }
   
}
/**
 * 测试用的函数
 * @param {*} in_extendPath CEP路径
*/
var testJsx = function (in_extendPath){
    JsxType = "testJsx";
    initEnzymes(in_extendPath,JsxType);
    alertTest("我是测试字");
}

/**
 * 样式切图
 * @param {*} pat excelFile
 * @param {*} assetsName 文件夹名称
 * @param {*} sheetName 表格页签名称
 * @param {*} imgTypeVal 切图类型 （实际像素type_2,固定尺寸type_1）
 * @param {*} nameTypeVal 图片名字类型 nameType2 为 序号_类型名 nameType1 为 类型名_序号
 * @param {*} in_extendPath CEP路径
 */
//var outputText = function (pat, assetsName,sheetName, typeVal,in_extendPath){
var outputText = function (pat, assetsName, imgTypeVal,nameTypeVal,in_extendPath){   
    JsxType = "outputText";
    initEnzymes(in_extendPath,JsxType);
   
    //parseFile(pat, assetsName,sheetName, typeVal);
    parseFile(pat, assetsName,imgTypeVal,nameTypeVal);
   
}

/**
 * 
 * @param {*} namePre 前缀
 * @param {*} nameSuf 后缀
 * @param {*} in_extendPath CEP路径
 */
var rename = function (namePre,nameSuf,in_extendPath){
    JsxType = "rename";
    initEnzymes(in_extendPath,JsxType);

    var selectedLayers = getSelectedLayerItemIndex();
        for (var i = 0; i < selectedLayers.length; ++i) {

            //layerItemIndexToName(selectedLayers[i]);
            
            getArtLayerByItemIndex(selectedLayers[i], namePre, nameSuf);

        }

}