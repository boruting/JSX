window.onload=function(){
    var css = new CSInterface();
    var csInterface = new CSInterface();
    var str = csInterface.getSystemPath(SystemPath.EXTENSION);
    

    $("#main_one").click(function () {
            
        css.evalScript('$.evalFile("' + str + "/jsx/cleanMetaData/main_one.jsx" + '")');
    });
    $("#batchPSDmetaData").click(function () {
            
        css.evalScript('$.evalFile("' + str + "/jsx/cleanMetaData/batchPSDmetaData.jsx" + '")');
    });
    $("#CornerEditor").click(function () {
            
        css.evalScript('$.evalFile("' + str + "/jsx/Corner Editor.jsx" + '")');
    });
    $("#fileImportLnkd").click(function () {
            
        css.evalScript('$.evalFile("' + str + "/jsx/fileImportLnkd.jsx" + '")');
    });
    $("#ModifyLayerInfo").click(function () {
                   
        css.evalScript('$.evalFile("' + str + "/jsx/ModifyLayerInfo.jsx" + '")');
    });
    $("#BlackCutout").click(function () {
                   
        css.evalScript('$.evalFile("' + str + "/jsx/BlackCutout.jsx" + '")');
    });
    $("#fontInfoExportExcel").click(function () {
                   
        css.evalScript('$.evalFile("' + str + "/jsx/fontInfoExportExcel.jsx" + '")');
    });
    $("#openArtLib").click(function () {
                   
        css.evalScript('$.evalFile("' + str + "/jsx/openArtLib.jsx" + '")');
    });
    $("#test").mouseup(function () {
                   
        css.evalScript('$.evalFile("' + str + "/jsx/test.jsx" + '")');
    });
    $("#buttonGenerate").mouseup(function () {
                   
        css.evalScript('$.evalFile("' + str + "/jsx/buttonGenerate/mainBtnGenerate.jsx" + '")');
    });

}
