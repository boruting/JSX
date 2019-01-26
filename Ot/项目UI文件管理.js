Company = {};
Company.projectName = {};
Company.projectName.PSD = {};
Company.projectName.UI = {};
//切图文件路径 
/**
 * 例如：主界面(psd)
 * PSD目录：fskj/wwjx/psd/主界面/主角头像信息.psd
 * UI目录： fskj/wwjx/ui/主界面/主角头像信息/示意图_主角头像信息.png 
 * 
 * 
 */
var test = "这是个测试";

/**
 * 切图插件 
 * 获取psd 和 UI 路径 
 * 保证 psd 文件夹 和 UI 文件夹 路径结构统一
 * 切图方式参考 psd到unity 脚本
 */

var fullPath = "fskj/wwjx/psd/主界面/主角头像信息.psd";//var fullPath = doc.fullName;
var psdPath = fullPath.substr(0, pat.length - 5);
var pasPathArr = psdPath.split("/");
var lower = pasPathArr[2].toLowerCase();
if (lower == "psd") {
    pasPathArr.splice(2, 1, "ui");
}
var uiPath = pasPathArr.join("/");
console.log(uiPath); 
