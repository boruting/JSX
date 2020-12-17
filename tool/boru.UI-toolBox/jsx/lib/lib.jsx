/**
 * 返回指定图层信息对象中指定的属性
 * @param targetReference - 目标图层类型 ，可以是 Kinase.REF_ActiveLayer - 当前选中图层、Kinase.REF_LayerID - 根据图层 ID 、Kinase.REF_ItemIndex - 根据图层 ItemIndex。
 * @param target - 目标图层参数，根据图层类型，填入图层 ID 或者 ItemIndex 。当目标图层类型是 Kinase.REF_ActiveLayer 时，请填 null。
 * @param xxx - 属性名称
 * @param getSimpleObject - 获取简单对象
 * @returns {{}}
 */
var layer={};
layer.get_XXX_Objcet = function (targetReference, target, xxx, getSimpleObject)
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
        return mu.actionDescriptorToSimpleObject(layerDesc)
    } else
    {
        return mu.actionDescriptorToObject(layerDesc);
    }


}