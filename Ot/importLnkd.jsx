var docFile = app.activeDocument.fullName;//获取全名
var docPat =docFile.path;//获取路径

var pro= prompt ("输入将要导入的连接对象路径和名字/n 如果同目录输入文件名 ","输入psd文件名字", "导入连接对象");
if(pro) 
{
    
    importLnkd (testingPSD(pro));
    
}
else 
{
    alert ("你已取消了 本次导出!")
}

/**
 * 后缀检测
*/
function testingPSD(pro)
{
    $.writeln(pro);
    var proPSD = pro.split(".");
    //$.writeln(proPSD);
    if(proPSD[1] != "psd")
    {
        
         var pat = docPat + "/" + pro  + ".psd";
         return pat;
         
     }else 
    {
        var pat =docPat + "/" + pro;
       return pat; 
    }
    
}

/**
 * 导入连接对象
*/
function importLnkd (pat)
{
    var idPlc = charIDToTypeID( "Plc " );
    var desc634 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
    desc634.putPath( idnull, new File( pat));//这里应该是路径加获取到到名字 
    // 这里应该检测下psd是否存在
    var idLnkd = charIDToTypeID( "Lnkd" );//定义为连接对象
    desc634.putBoolean( idLnkd, true );
    executeAction( idPlc, desc634, DialogModes.NO );
    
}
