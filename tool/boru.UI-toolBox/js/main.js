window.onload=function(){
    var css = new CSInterface();
    var csInterface = new CSInterface();
    var str = csInterface.getSystemPath(SystemPath.EXTENSION);
    

    $("#CleanMetadata").click(function () {
            
        css.evalScript('$.evalFile("' + str + "/jsx/CleanMetadata.jsx" + '")');
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

}
