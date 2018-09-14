/**
 * 初始化
 * 
 */
window.onload = function () {
	var arrayObj = arr();

	listBtn(arrayObj);

}
/**
 * 生产PSD 按钮列表
 * @param {*} arrayObj psd 路径和名字的数组
 */
var listBtn = function (arrayObj) {

	var td1 = new Array();

	for (var i = 0; i < arrayObj.length; i++) {

		td1[i] = document.createElement("td");
		td1[i].innerHTML = '<input type="button" value="' + arrayObj[i] + '" onclick="addPSD(this)" />';

		document.body.appendChild(td1[i]);

	}
}
/**
 * 获取 PSD 文件 路径和名字
 */
var arr = function () {
	var arrayObj = ["aaaaaa", "bbbbb", "cccc", "dddd", "eeee"];
	return arrayObj;
}
/**
 * 添加连接对象到 对当前PSD中
 */
function addPSD() {

	alert("添加psd");
}