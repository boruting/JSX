var json = [];












var role={

    name:"",
    lv:0,
    exp:0

}
json.push(role);
saveJSON(role,"text_aa");

var file = new File("C:/Users/Administrator/Desktop/test/test.json");
    file.remove();
    file.open("a");
    file.lineFeed = "\n";
    file.encoding = "utf-8";
    file.write(json.push(role));
    file.close();


function saveJSON(data, filename){
	if(!data) {
		alert('保存的数据为空');
		return;
	}
	if(!filename) 
		filename = 'json.json'
	if(typeof data === 'object'){
		data = JSON.stringify(data, undefined, 4)
	}
	var blob = new Blob([data], {type: 'text/json'}),
	e = document.createEvent('MouseEvents'),
	a = document.createElement('a')
	a.download = filename
	a.href = window.URL.createObjectURL(blob)
	a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
	e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
	a.dispatchEvent(e)
}
