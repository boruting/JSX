#include "importLnkd.jsx"
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
