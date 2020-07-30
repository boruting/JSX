var r = new ActionReference();
var d = new ActionDescriptor();

r.putEnumerated(stringIDToTypeID("layer"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"));
d.putReference(charIDToTypeID('null'), r);
var options = executeAction(charIDToTypeID("getd"), d, DialogModes.NO);
options = options.getObjectValue(stringIDToTypeID("smartObject"));
var SmartName = options.getString(stringIDToTypeID("documentID"));
$.writeln(SmartName);