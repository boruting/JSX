var test = function () {
	// cs = new CSInterface();
	// var libPath = txt_path.value;
	// var psdPath = libPath + "psd";
	
	
    // cs.evalScript("testJsx('"+ psdPath +"')",function(result){
	// 	psdName = result ;
	// 	//alert (window);
    //     return psdName;
	// });
	//alert("psdName.length");
	listBtn(psdNameList);
	
   
    
}

/**
 * 初始化
 * 
 */
window.onload = function () {
	cs = new CSInterface();
	libPath = txt_path.value;
	psdPath = libPath + "psd/";

	//alert (psdPath);
    cs.evalScript("testJsx('"+ psdPath +"')",function(result){
		
		
		psdName = result ;
		psdNameList = psdName.split(",");
		//alert (psdName.length);
		
        return psdNameList;
	});
	
	

	//listBtn(psdName);

}
/**
 * 生产PSD 按钮列表
 * @param {*} arrayObj psd 路径和名字的数组
 */
var listBtn = function (arrayObj) {
	alert(libPath);
	var div = new Array();
	
	for (var i = 0; i < arrayObj.length; i++) {

		var imgName = arrayObj[i].substring(0,arrayObj[i].length-4) + ".png";
		var n = arrayObj[i];
		var imgPath = libPath + "image/" +imgName;
		//alert (imgPath);
		div[i] = document.createElement("div");
		var br = document.createElement("p");
		div[i].innerHTML = '<input type="image" id="' + n + '" src="' + imgPath + '" onclick="addPSD(this.id)" />';
		br.innerHTML = '<p>';
		document.body.appendChild(br);
		//alert (div[i]);
		document.body.appendChild(div[i]);

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
function addPSD(id) {
	//alert(id);
	var pat = psdPath + id;
	//var pat = "aaaaaaaa";
	//alert(pat);
	cs.evalScript("importLnkd('"+ pat +"')");
}
	
	