#include "importLnkd.jsx"
pat=app.openDialog()[0];

fileJudge(pat);//判断打开的文档是否是psd

/**
* 判断打开的文档是否是psd
*/
function fileJudge(pro)
{
    if (pro)
        {
            var proPSD = pro.fullName.split(".");
            
            if(proPSD[1] == "psd")
            {
                importLnkd (pat);
               return ; 
            }else
            {
                
                return alert("打开的文件有误");
            }
            
        
            
    }
}
