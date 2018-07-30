/** 
 * PhotoShop Script for App -Rename-
 *author: boru (dingyu@junyoug.com)
 * description: 根据选中的图层修改图层(这个版本是文本图层)名字  
 * Date: 2017-09-25  
 * version: 0.0.1
*/
#target photoshop
#include  "layerItemIndexToName.jsx"
#include  "getSelectedLayerItemIndex.jsx"
#include  "getArtLayerByItemIndex.jsx"

renameWin();

//弹窗
function renameWin() {

    var dlg = new Window('dialog', '重命名');//创建窗体
    dlg.msgPnl = dlg.add('panel', [1, 1, 300, 200], '图层重命名');//创建面板
    dlg.msgPnl.box = dlg.msgPnl.add('group', [1, 1, 400, 100], 'box');//创建容器
    dlg.msgPnl.box.titlePre = dlg.msgPnl.box.add('statictext', [10, 10, 70, 30], '输入前缀:');//创建文本
    dlg.msgPnl.box.titleSuf = dlg.msgPnl.box.add('statictext', [10, 30, 70, 70], '输入后缀:');
    dlg.msgPnl.box.namePre = dlg.msgPnl.box.add('edittext', [70, 10, 200, 30], 'txt_');//创建输入文本
    dlg.msgPnl.box.nameSuf = dlg.msgPnl.box.add('edittext', [70, 40, 200, 30], '.png');
    var namePre = dlg.msgPnl.box.namePre.text;
    var nameSuf = dlg.msgPnl.box.nameSuf.text;
    //$.writeln(namePre + "     " + nameSuf)
    //dlg.msgPnl.titleEt = dlg.msgPnl.add('edittext',undefined,'sssss');
    //dlg.box.add ('statictext', undefined,'wen');

    //创建按钮
    dlg.msgPnl.btnSure = dlg.msgPnl.add('button', [130, 120, 50, 30], '确定');
    dlg.msgPnl.btnClose = dlg.msgPnl.add('button', [30, 120, 50, 30], '取消');
    //按钮事件   获取前后缀  
    dlg.msgPnl.btnSure.onClick = function () {
        //遍历图层
        var selectedLayers = getSelectedLayerItemIndex();
        for (var i = 0; i < selectedLayers.length; ++i) {

            nameSuf = dlg.msgPnl.box.nameSuf.text; //获取输入框里的后缀
            namePre = dlg.msgPnl.box.namePre.text; //获取输入框里的前缀

            layerItemIndexToName(selectedLayers[i]);
            getArtLayerByItemIndex(selectedLayers[i], namePre, nameSuf);

        }

        dlg.close();

    }
    //按钮事件  关闭窗体
    dlg.msgPnl.btnClose.onClick = function () {

        dlg.close();

    }



    dlg.show();//显示窗体


}