#include  "helper.js"
/**
 * 获取 path 下的所有文件 
 * @param {*} path 存放psd文件的路径
 */
function testJsx(path) {
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

//=====================



var excelFile = new File('D:/test/iconName.xlsx');
var lines = getExcelLines(excelFile);
var arr = testJsx('E:/fs/ny/res/icon/');
for (var i = 0; i < lines.length; i++) {
    for (var j = 0; j < arr.length; j++) {
        if (lines[i] == arr[j].substr(0, arr[j].length - 4)) {
            arr.splice(j, 1);
        }
    }
}
$.writeln(arr.length);
$.writeln("========");
$.writeln(arr);