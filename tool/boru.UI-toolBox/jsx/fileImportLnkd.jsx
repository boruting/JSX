﻿//#include "importLnkd.jsx"
var file = File($.fileName);
var p = decodeURI(file.parent.parent);
$.evalFile(p + "/jsx/importLnkd.jsx");


if (documents.length == 0) {
    alert("没有psd文件 请先打开一个PSD文件");
} else {
    pat = app.openDialog()[0];
    fileJudge(pat); //判断打开的文档是否是psd

}


// pat = app.openDialog()[0];
// fileJudge(pat); //判断打开的文档是否是psd

/**
 * 判断打开的文档是否是psd,jpg,png
 */
function fileJudge(pro) {
    if (pro) {
        var proPSD = pro.fullName.split(".");

        if (proPSD[1] == "psd" || proPSD[1] == "jpg" || proPSD[1] == "png") {
            importLnkd(pat);
            return;
        } else {

            return alert("打开的文件有误");
        }



    }
}