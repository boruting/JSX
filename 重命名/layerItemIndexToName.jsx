 function layerItemIndexToName ( ItemIndex )
{
   // 判断背景图层是否存在。背景图层无论存在与否始终占有是 0  位，所如果背景图层不存在，第一个图层就是内部序号就是 1 而不是 0 ，所以要 + 1。
   backgroundIndexOffset = 1;
  try {
    if (app.activeDocument.backgroundLayer)
      backgroundIndexOffset = 0;
  }
  catch (err)
  {}
    
  var ref = new ActionReference();
  ref.putProperty( app.charIDToTypeID('Prpr'), stringIDToTypeID("name") );
     //ItemIndex 是从 1 开始，而 PS 内部序号是从 0 开始，所以这里需要 - 1。
  ref.putIndex( charIDToTypeID('Lyr '), ItemIndex -1 + backgroundIndexOffset );
  var resultDesc = executeActionGet( ref );
  return resultDesc.getString(stringIDToTypeID("name"));
}