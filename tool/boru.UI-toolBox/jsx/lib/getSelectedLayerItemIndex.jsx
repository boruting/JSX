/** 
 * 获取选中图层ItemIndex 返回 resultLayerItemIndexs数组
*/
function getSelectedLayerItemIndex ()
{
   var resultLayerItemIndexs = []; //存放结果的数组
   //var backgroundIndexOffset = 0;
    
  //取选中的图层：
  var ref = new ActionReference();
  var args = new ActionDescriptor();
  ref.putProperty( charIDToTypeID('Prpr') , stringIDToTypeID("targetLayers") );
  ref.putEnumerated( charIDToTypeID('Dcmn'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
  args.putReference( charIDToTypeID('null'), ref );
  var resultDesc = executeAction( charIDToTypeID('getd'), args, DialogModes.NO );

  //只选中了一个图层：
  if (! resultDesc.hasKey( stringIDToTypeID("targetLayers") ))
  {
    resultLayerItemIndexs.push( app.activeDocument.activeLayer.itemIndex);
    return resultLayerItemIndexs; 
  }

 //选中了多个图层：
  var selIndexList = resultDesc.getList( stringIDToTypeID("targetLayers") );

  for (i = 0; i < selIndexList.count; ++i)
  {
      //ItemIndex 是从 1 开始，而 PS 内部序号是从 0 开始，所以这里需要 + 1。
    resultLayerItemIndexs.push(selIndexList.getReference(i).getIndex( charIDToTypeID('Lyr ') )  + 1 );
    //$.writeln("r: " + selIndexList.getReference(i).getIndex( charIDToTypeID('Lyr ') )  + "+" + (1));
  }

  return resultLayerItemIndexs;  
}
