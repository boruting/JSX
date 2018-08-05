var pat = "C:\\Users\\Administrator\\Desktop\\test\\";
var name1 = "bc.psd";
var idPlc = charIDToTypeID( "Plc " );
var desc634 = new ActionDescriptor();
var idnull = charIDToTypeID( "null" );
desc634.putPath( idnull, new File( pat+name1));//这里应该是路径加获取到到名字
var idLnkd = charIDToTypeID( "Lnkd" );//定义为连接对象
desc634.putBoolean( idLnkd, true );
executeAction( idPlc, desc634, DialogModes.NO );
