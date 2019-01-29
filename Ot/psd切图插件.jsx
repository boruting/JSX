/**
 * 判断图层是否是画板
 * 筛选需要 切图的 图层或组 (可以根据图层后缀)
 * 文件夹类型切图
 * 文本类型切图
 * 切图 格式 jpeg(品质可选) png
 * 筛选需要 切图的 图层或组
 */



 



/**
 * 切图插件 
 * @param {*} generateImg 生成图片 
 */
var generateImg = {};
var doc = app.activeDocument;
var fullPath = "fskj/csj/psd/主界面/主角头像信息.psd";
/**
* 获取psd 和 UI 路径 
* 保证 psd 文件夹 和 UI 文件夹 路径结构统一
* 切图方式参考 psd到unity 脚本
* @param {*} fullPath 路径 当前psd文档路径 var fullPath = doc.fullName;
*/
generateImg.get_uiPath = function (fullPath) {
    var psdPath = fullPath.substr(0, fullPath.length - 5);//去掉路径后缀
    var pasPathArr = psdPath.split("/");//路径转换成数组 
    var lower = pasPathArr[2].toLowerCase();//获取数组中的 对应psd的 元素
    if (lower == "psd") {//把数组中 psd 文件夹  修改成 UI
        pasPathArr.splice(2, 1, "ui");
    }
    var uiPath = pasPathArr.join("/");
    return uiPath;
}

var outfile = generateImg.get_uiPath(fullPath);
/**
 * @param {*} doc 当前激活的psd文档
 * @param {*} outfile 导出路径
 */
generateImg.saveImg = function (doc, outfile) {

    if (outfile.exists) {
        saveOption = new ExportOptionsSaveForWeb();
        saveOption.format = SaveDocumentType.PNG;//-24 //JPEG, COMPUSERVEGIF, PNG-8, BMP 
        saveOption.transparency = true;
        saveOption.blur = 0.0;
        saveOption.includeProfile = false;
        saveOption.interlaced = false;
        saveOption.optimized = true;
        saveOption.quality = 100;
        saveOption.PNG8 = false;
    }

    doc.exportDocument(outfile, ExportType.SAVEFORWEB, saveOption);
    //app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);//关闭psd
}
console.log(generateImg.get_uiPath(fullPath));

//=======================================================================================

/**
 * 判断图层是否是画板
 * @param targetReference
 * @param target
 * @returns {boolean}
 */
var isArtBoard = function (targetReference, target)
{

    try
    {
        var artBoard_raw = get_XXX_Objcet(targetReference, target, "artboardEnabled", "Lyr ");

        if (artBoard_raw.artboardEnabled.value == true)
        {
            
            return true;
        } else
        {
            
            return false;
        }

    } catch (e)
    {
        return false
    }

}
/**
 * 返回指定图层信息对象中指定的属性
 * @param targetReference - 目标图层类型 ，可以是 Kinase.REF_ActiveLayer - 当前选中图层、Kinase.REF_LayerID - 根据图层 ID 、Kinase.REF_ItemIndex - 根据图层 ItemIndex。
 * @param target - 目标图层参数，根据图层类型，填入图层 ID 或者 ItemIndex 。当目标图层类型是 Kinase.REF_ActiveLayer 时，请填 null。
 * @param xxx - 属性名称
 * @param getSimpleObject - 获取简单对象
 * @returns {{}}
 */
var get_XXX_Objcet = function (targetReference, target, xxx, getSimpleObject)
{

    try
    {
        var ref = new ActionReference();
        ref.putProperty(charIDToTypeID("Prpr"), stringIDToTypeID(xxx));
        targetReference(ref, target, "layer");//"contentLayer"
        var layerDesc = executeActionGet(ref);
    }
    catch (e)
    {
        $.writeln(e)
    }

    if (getSimpleObject === true)
    {
         $.writeln("ssssss");
        return actionDescriptorToSimpleObject(layerDesc)
    } else
    {
        return actionDescriptorToObject(layerDesc);
    }


}
/**
 * 把 actionDescriptor 解析为一个 Object 并返回
 * @param actionDescriptor
 * @param in_outSimple bool 为真输出便于阅读的简单对象，否则输出带属性 Type 的完整对象
 * @returns {{}} actionDescriptor 解析后的 Object
 */
var actionDescriptorToObject = function (actionDescriptor, in_outSimple)
{
    if(actionDescriptor==undefined)
    {
        return null;
    }



    var out_ob = {};
    _scanAD(actionDescriptor, out_ob, false, in_outSimple)


    function _scanAD(ad, ob, isAList, outSimple)
    {
        var len = ad.count;
        for (var i = 0; i < len; i++)
        {
            if (isAList)
            {
                var key = i;
            } else
            {
                var key = ad.getKey(i);
            }

            var obType = ad.getType(key)
            var obValue = null;

            if ("DescValueType.BOOLEANTYPE" == obType)
            {
                obValue = ad.getBoolean(key);
            }
            else if ("DescValueType.STRINGTYPE" == obType)
            {
                obValue = ad.getString(key);
            }
            else if ("DescValueType.INTEGERTYPE" == obType)
            {
                obValue = ad.getInteger(key);
            }
            else if ("DescValueType.DOUBLETYPE" == obType)
            {
                obValue = ad.getDouble(key);
            }
            else if ("DescValueType.CLASSTYPE" == obType)
            {
                obValue = ad.getClass(key);
            }
            else if ("DescValueType.RAWTYPE" == obType)
            {
                obValue = ad.getData(key);
            }
            else if ("DescValueType.LARGEINTEGERTYPE" == obType)
            {
                obValue = ad.getLargeInteger(key);
            }
            else if ("DescValueType.ALIASTYPE" == obType)
            {
                obValue = ad.getPath(key).fullName;

            }
            else if ("DescValueType.UNITDOUBLE" == obType)
            {
                obValue = {
                    doubleType: typeIDToStringID(ad.getUnitDoubleType(key)),
                    doubleValue: ad.getUnitDoubleValue(key)
                };
            }
            else if ("DescValueType.ENUMERATEDTYPE" == obType)
            {
                obValue = {
                    enumerationType: typeIDToStringID(ad.getEnumerationType(key)),
                    enumerationValue: typeIDToStringID(ad.getEnumerationValue(key))
                };
            }
            else if ("DescValueType.REFERENCETYPE" == obType)
            {
                obValue = Muclease.prototype.actionReferenceToObject(ad.getReference(key));
            }
            else if ("DescValueType.OBJECTTYPE" == obType)
            {
                obValue = {}
                _scanAD(ad.getObjectValue(key), obValue, false, outSimple)
            }
            else if ("DescValueType.LISTTYPE" == obType)
            {
                if (outSimple)
                {
                    obValue = [];
                    _scanAD(ad.getList(key), obValue, true, outSimple)
                }
                else
                {
                    obValue = {};
                    _scanAD(ad.getList(key), obValue, true, outSimple)

                }
            }


            if (isAList)
            {
                var name = key;
            } else
            {
                var name = typeIDToStringID(key);
            }

            if (outSimple)
            {
                if (isAList)
                {
                    ob[key] = obValue;
                }
                else
                {
                    ob[name] = obValue;
                    if ("DescValueType.OBJECTTYPE" == obType)
                    {
                        ob[name]._objectType = typeIDToStringID(ad.getObjectType(key));
                    }
                }

            }
            else
            {
                ob[name] = {
                    value: obValue,
                    type: obType.toString()
                };
                if ("DescValueType.OBJECTTYPE" == obType)
                {
                    ob[name].objectType = typeIDToStringID(ad.getObjectType(key));
                }

            }

        }

    }
    return out_ob
}
var actionDescriptorToSimpleObject = function (actionDescriptor)
{
    return actionDescriptorToObject(actionDescriptor, true);
}
var REF_LayerID = function (ref, layerID, classString)
{
    if (classString != undefined)
    {
        var typeID = stringIDToTypeID(classString);
    } else
    {
        var typeID = charIDToTypeID("Lyr ");
    }

    ref.putIdentifier(typeID, layerID);
}
