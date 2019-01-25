var layer = activeDocument.layers[0];  
//var layer = activeDocument.activeLayer;  
  
var lb = layer_bounds(layer);  
var ab = artboard_rectangle(layer);  
  
alert("DOM width = " + (activeDocument.activeLayer.bounds[2]-activeDocument.activeLayer.bounds[0]) + "\n\n"+  
      "AM layer width in px = " + (lb[2]-lb[0]) + "\n\n"+  
      "AM artboardr width in px = " + (ab[2]-ab[0]));  
  
/////////////////////////////////////////////////////////////////////////////////  
function layer_bounds(layer, no_effects)  
    {  
    try {          
        var prop = stringIDToTypeID("bounds");  
  
        if (no_effects == true)  prop = stringIDToTypeID("boundsNoEffects");  
        if (no_effects == false) prop = stringIDToTypeID("boundsNoMask");  
  
        var r = new ActionReference();      
        r.putProperty(stringIDToTypeID("property"), prop);  
        if (layer) r.putIdentifier(stringIDToTypeID("layer"), layer.id);  
        else       r.putEnumerated(stringIDToTypeID("layer"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"));  
      
        var d = executeActionGet(r).getObjectValue(prop);  
      
        var bounds = new Array();  
      
        bounds[0] = d.getUnitDoubleValue(stringIDToTypeID("left"));
        bounds[1] = d.getUnitDoubleValue(stringIDToTypeID("top"));  
        bounds[2] = d.getUnitDoubleValue(stringIDToTypeID("right"));  
        bounds[3] = d.getUnitDoubleValue(stringIDToTypeID("bottom"));  
          
        return bounds;  
        }  
    catch(e) { alert(e); }  
    }  
  
/////////////////////////////////////////////////////////////////////////////////  
function artboard_rectangle(layer)  
    {  
    try {          
        var r    = new ActionReference();      
        r.putProperty(stringIDToTypeID("property"), stringIDToTypeID("artboard"));  
        if (layer) r.putIdentifier(stringIDToTypeID("layer"), layer.id);  
        else       r.putEnumerated(stringIDToTypeID("layer"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"));  
  
        var d = executeActionGet(r).getObjectValue(stringIDToTypeID("artboard")).getObjectValue(stringIDToTypeID("artboardRect"));  
  
        var bounds = new Array();  
  
        bounds[0] = d.getUnitDoubleValue(stringIDToTypeID("left"));  
        bounds[1] = d.getUnitDoubleValue(stringIDToTypeID("top"));  
        bounds[2] = d.getUnitDoubleValue(stringIDToTypeID("right"));  
        bounds[3] = d.getUnitDoubleValue(stringIDToTypeID("bottom"));  
                                    
        return bounds;  
        }  
    catch(e) { alert(e); }  
    }  