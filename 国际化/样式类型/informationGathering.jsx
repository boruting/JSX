function informationGathering () {

        AssetsName = prompt ("输入导出文件夹名默认为 文字\n\n取消结束本次导出 ", "文字", "导出文件夹名")
        pngOutAssetsName = AssetsName;
        saveOption = new ExportOptionsSaveForWeb();
        saveOption.format = SaveDocumentType.PNG;
        saveOption.PNG8 = false;
        var todoDocuments = [];
        var doc=getActiveDoc();
        if(doc)
        {
            todoDocuments.push(doc);
        }
        if(AssetsName){
            file=app.openDialog()[0];
            
             if(file){
                
                    var fullnames=file.fullName.split (".");
                    
                    if(fullnames[1] !="xlsx"){
                        
                        alert("打开的文件有误");
                        
                     }else{
                         
                         parseFiles(todoDocuments);
                         
                         }
                    
            }else {
                alert ("你已取消了 本次导出!")
            }
            
            //导出png的配置，使用png24导出

             
        } else {
        alert ("你已取消了 本次导出!")
        }

}