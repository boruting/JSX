﻿/**
 * 导入连接对象
 * pat psd文件全路径 包括文件名和后缀
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