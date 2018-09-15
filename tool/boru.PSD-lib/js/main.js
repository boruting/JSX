/**
 * 载入PSD文件
 * 
 */
var test = function () {

	//alert(psdNameList);
	onload();
	listBtn(psdNameList);
	//BUG 有新的文件出现需要载入2次
}

/**
 * 初始化
 * 
 */
//window.onload = function () {
var onload = function () {
	cs = new CSInterface();
	libPath = txt_path.value;
	psdPath = libPath + "psd/";

	//alert (psdPath);
    cs.evalScript("getPsdName('"+ psdPath +"')",function(result){
		
		
		psdName = result ;
		psdNameList = psdName.split(",");
		//alert (psdName.length);
		
        return psdNameList;
	});
	
	



}
/**
 * 生成PSD 按钮列表
 * @param {*} arrayObj psd名字的数组
 */
var listBtn = function (arrayObj) {
	//alert(libPath);
	var div = new Array();
	//alert(arrayObj.length);
	for (var i = 0; i < arrayObj.length; i++) {

		
		var imgName = arrayObj[i].substring(0,arrayObj[i].length-4) + ".png";
		var n = arrayObj[i];
		var imgPath = libPath + "image/" +imgName;
		//alert (imgPath);
		div[i] = document.createElement("div");
		var br = document.createElement("p");
		div[i].innerHTML = '<input type="image" id="' + n + '" src="' + imgPath + '" onclick="addPSD(this.id)" />';
		br.innerHTML = '<p>';//分割排版用
		if(document.getElementById(n)){ 
			//存在 
			continue;
			
		}
		document.body.appendChild(br);
		//alert (div[i]);
		document.body.appendChild(div[i]);

	}
}
/**
 * 添加连接对象到 对当前PSD中
 * @param {*} id 动态创建按钮的ID 也是psd文件名字 
 */
function addPSD(id) {
	//alert(id);
	var pat = psdPath + id;
	//var pat = "aaaaaaaa";
	//alert(pat);
	cs.evalScript("importLnkd('"+ pat +"')");
}
	




/**
 * 获取 PSD 文件 路径和名字测试用
 */
var arr = function () {
	var arrayObj = ["aaaaaa", "bbbbb", "cccc", "dddd", "eeee"];
	return arrayObj;
}