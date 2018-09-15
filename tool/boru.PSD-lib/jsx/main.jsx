/**
 * 获取 path 下的所有文件 
 * @param {*} path 存放psd文件的路径
 */
var getPsdName = function (path) {
  var psdFolder = Folder(path);
  var psdFolderList = psdFolder.getFiles();
  //声明一个新数组
  var arr = new Array();
  
  //遍历所有文件  获取到文件到名字
  var j = 0;
  for (var i = 0; i < psdFolderList.length; i++) {
    var fileName = decodeURI(psdFolderList[i].name);
    
    _fileName = fileName.split(".");
     if(_fileName[1]!="psd"){
        j-1;
        continue  
        }
    //存放到新数组里
    arr[j] = fileName
    j++;
  }
  //$.writeln(arr );
  //alert(arr.length);
  return arr;

}


/**
 * 导入连接对象
 * pat psd文件全路径 包括文件名和后缀
*/
var importLnkd = function (pat) {
  //alert(pat);
  var idPlc = charIDToTypeID("Plc ");
  var desc634 = new ActionDescriptor();
  var idnull = charIDToTypeID("null");
  desc634.putPath(idnull, new File(pat));//这里应该是路径加获取到到名字 
  // 这里应该检测下psd是否存在
  var idLnkd = charIDToTypeID("Lnkd");//定义为连接对象
  desc634.putBoolean(idLnkd, true);
  executeAction(idPlc, desc634, DialogModes.NO);

}