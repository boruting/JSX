/** 
 * 样式类型切图
*/
var outputTextJs = function () {
    
    cs = new CSInterface();
    imgTypeVal = $('#imgType option:selected').val();
    nameTypeVal = $('#nameType option:selected').val();
    in_extendPath  = cs.getSystemPath(SystemPath.EXTENSION); 
    pat = escapeString(fileid.files[0].path);
    //assetsName = "assetsText";
    assetsName = txt_assets.value;
    //sheetName = txt_sheet.value;
    //cs.evalScript("outputText('" + pat + "','" + assetsName + "','"+ sheetName + "','" + typeVal + "','" + in_extendPath + "')");
    cs.evalScript("outputText('" + pat + "','" + assetsName + "','"+ imgTypeVal + "','" + nameTypeVal + "','" + in_extendPath + "')");
    //cs.evalScript("outputText('" + pat + "','" + assetsName + "','" + typeVal + "','" + in_extendPath + "')");
     
}


/** 
 * 转义字符 
*/
function escapeString(inString) {
    inString = inString.replace(/\\/g, "\\\\");
    return inString;
}

