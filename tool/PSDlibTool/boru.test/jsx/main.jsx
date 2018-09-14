var path = "E:/workspace/test/PSD";
var testJsx = function (path){
    //var path = "E:/workspace/test/PSD";
    var psdFolder = Folder (path);
    var psdFolderList = psdFolder.getFiles();
        
    //var 

    //声明一个新数组
    var arr =new Array();
    //遍历所有文件  获取到文件到名字
    for (var i = 0; i<psdFolderList.length;i++){
               var fileName = decodeURI(psdFolderList[i].name);
               //存放到新数组里
             arr[i] = fileName
            
        }
     $.writeln(arr );
    return arr;
    //返回这个数组
   
   // var a = decodeURI(psdFolderList);
    //return psdFolderList;
    //return a;
    //$.writeln(a );
}
//testJsx(path);

