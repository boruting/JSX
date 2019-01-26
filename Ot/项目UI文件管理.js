var Company = function(){
    return this;
}
Company.projectName={};
Company.projectName.PSD={};
Company.projectName.UI={};
//切图文件路径 
/**
 * 例如：主界面(psd)
 * PSD目录：fskj/wwjx/psd/主界面/主角头像信息.psd
 * UI目录： fskj/wwjx/ui/主界面/主角头像信息/示意图_主角头像信息.png 
 * 
 * 分析：
 */
var pat = "fskj/wwjx/psd/主界面/主角头像信息.psd";
var a = pat.split("/");