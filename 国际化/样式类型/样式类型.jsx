/**
*@author 3tion(chengfang@junyoug.com)
*@description 该版本文件会遍历所有打开的PSD文档，检查文档中psd模板文件是否有同名的xlsx文件，按xlsx中两列数据（第一列为文本内容，第二列为导出png的文件名），进行导出的ExtendScript脚本
*其中Excel文件Sheet1内容如下表单所示：
内容	文件名	翻译后的内容
Tựu	mowen1	
Điển	mowen2
Điển	mowen3
Tựu	mowen4
BXH	mowen5
Map	mowen6
Home	mowen7
Fb	mowen8
*@version 0.0.1
*/
#include "helper.js"
#include "parseFile.jsx"
#include "informationGathering.jsx"
#include "切图实际大小处理.jsx"
informationGathering();

/**
* 检查打开的文档，看看每个psd/psb文档有没有同名csv文件，并将符合规则的文档数据存储在todo中
*/
function checkDocument(todo) {
    //检查打开的psd文件   
    for (var len = documents.length, i = 0; i < len; i++) {
        parseFile(documents[i]);
    }
}

/**
* 处理符合规则的文件列表
* @param {Array} todo
*/
function parseFiles(todo) {
    for (var len = todo.length, i = 0; i < len; i++) {
        var arr = todo[i];
        parseFile(arr);
    }
}
/**
* 判断打开的文档是否是xlsx
*/
function fileJudge(file) {
    if (file) {
        var fullnames = file.fullName.split(".");
        if (fullnames[1] != "xlsx") {
            alert("打开的文件有误");
            return;
        }
    }
}
/**
* 判断是否有后缀名
*/
function assetsNameJudge(AssetsName) {

    if (!AssetsName)                                               //取消直接结束
    {
        alert("你已取消了 本次导出!");
        return;
    }
}
