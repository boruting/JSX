/** 
 * 样式类型切图
*/
var outputTextJs = function () {
    
    cs = new CSInterface();
    typeVal = $('#typeVal option:selected').val();
    in_extendPath  = cs.getSystemPath(SystemPath.EXTENSION); 
    pat = escapeString(fileid.files[0].path);
    assetsName = txt_assets.value;
    
    cs.evalScript("outputText('" + pat + "','" + assetsName + "','" + typeVal + "','" + in_extendPath + "')");
     
}

/**
 * @param {*} txtPre 前缀
 * @param {*} txtSuf 后缀
 */
var renameJs = function () {
    cs = new CSInterface();
    in_extendPath  = cs.getSystemPath(SystemPath.EXTENSION);
    namePre = txtPre.value;
    nameSuf = txtSuf.value;
   
    cs.evalScript("rename('" + namePre + "','" + nameSuf + "','" + in_extendPath + "')");

}
/** 
 * 转义字符 
*/
function escapeString(inString) {
    inString = inString.replace(/\\/g, "\\\\");
    return inString;
}

