/**
 * 获取 path 下的所有文件 
 * @param {*} path 存放psd文件的路径
 */
var getPsdFileName = function (path) {
  var psdFolder = Folder(path);
  var psdFolderList = psdFolder.getFiles();
  //声明一个新数组
  var arr = new Array();

  //遍历所有文件  获取到文件到名字
  for (var i = 0; i < psdFolderList.length; i++) {
    var fileName = decodeURI(psdFolderList[i].name);
    //判断是否是 psd 文件
    if (fileName.substr(-4) === ".psd") {

      arr[i] = fileName;

    }

  }
  return removeEmptyArray(arr);
}
/**
 * 删除数组中空的 undefined 的元素
 * @param {*} arr 数组
 */
function removeEmptyArray(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === undefined) {
      arr.splice(i, 1);
      i = i - 1; // i - 1 ,因为空元素在数组下标 2 位置，删除空之后，后面的元素要向前补位，
      // 这样才能真正去掉空元素,觉得这句可以删掉的连续为空试试，然后思考其中逻辑
    }
  }
  return arr;

}
//$.writeln(getPsdFileName("/workspace/test/lib/psd/"));



/**
 * 获取 path 下的所有文件 
 * @param {*} path 存放psd文件的路径
 */
var testJsx = function (path) {
  var psdFolder = Folder(path);
  var psdFolderList = psdFolder.getFiles();
  //声明一个新数组
  var arr = new Array();
  
  //遍历所有文件  获取到文件到名字
  for (var i = 0; i < psdFolderList.length; i++) {
    var fileName = decodeURI(psdFolderList[i].name);
    //存放到新数组里
    arr[i] = fileName
  }
  //$.writeln(arr );
  //alert(arr);
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