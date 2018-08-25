
window.onload = function () {
    'use strict';
    var css = new CSInterface();
    var csInterface = new CSInterface();
    var str = csInterface.getSystemPath(SystemPath.EXTENSION);
    var lg = csInterface.hostEnvironment.appLocale;


    //var pat = getObjectURL(fileid.files[0]);

    function init() {
        $("#btn_RenaALL").click(function () {

            css.evalScript('$.evalFile("' + str + "/jsx/RenaALL.jsx" + '")');
            //css.evalScript('dodo()');
        });


    }
    init();
}
var test = function () {

    'use strict';
    var cs = new CSInterface();
    //var pat = getObjectURL(fileid.files[0]);
    var pat = escapeString(fileid.files[0].path);
    var assetsName = txt_assets.value;
    var typeVal = $('#typeVal option:selected').val();
    var extensionPath  = cs.getSystemPath(SystemPath.EXTENSION);
    //alert (extensionPath);


    cs.evalScript("parseFile('" + pat + "','" + assetsName + "','" + typeVal + "','" + extensionPath + "')");
}

/** 
 * 转义字符 
*/
function escapeString(inString) {
    inString = inString.replace(/\\/g, "\\\\");
    return inString;
}








function getObjectURL(file) {
    var url = null;
    if (window.createObjcectURL != undefined) {
        url = window.createOjcectURL(file);
    } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}