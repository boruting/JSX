//#target photoshop

//if 1,outFolder   //if 0.outPicture
var OPTION=1;

if(app.activeDocument){
 var   Doc= app.activeDocument;  
 var   Filename,FoldPath;
 var   PNStr="";  
 var   PNStTran="";    
 var   LayerN=0,GroupN=0;
        


  try{
     if(Doc.saved)
    {
            var     DocSub=  Doc.duplicate();
          DocSub.crop([0,0,DocSub.width.toString(),DocSub.height.toString()]);
           FoldCreat(Doc);
           var GLString= GroupSandLayerName(DocSub);  
      
            FileW(GLString);   
            DocSub.close(SaveOptions.DONOTSAVECHANGES);   
              if(APPLanguage() )
         {
           alert("所有图层已经全部导入到已存PSD路径!\n \n      ------------OK-----------");
         }else
        {
             alert("ALL File Export You PSD Path.\n \n ------------OK-----------");
        }
          
      }
     else{
                 if(APPLanguage() )
                 {     alert("请保存你的PSD文件！");            }
                 else{alert("Please Save You PSD File!");}
            }

      }catch(err){alert(err.line.toString()+"\r"+err.toString())};  
}
else{alert("NO Document!!");}

function FileW(txt)
{      var  FileN;
        FileN=new File (FoldPath+"/"+Filename+".xml");
        FileN.open("w");
        FileN.write("<?xml version=\"1.0\" encoding=\"utf-8\"?>"+"\n");
        FileN.write("<PSScene>\n");
        FileN.write("<Layers>"+txt.replace(new RegExp(" ","g"),"_")+"</Layers>");
        FileN.write("</PSScene>");
       
     
        
}
function  FoldCreat(Doc)
{
     var FileP,FoldN;
     var PSN=new Array();  
         PSN=Doc.name.toString();
         PSN =PSN.split(".");
         PSN =PSN.slice(0,-1);
          FoldN = new Folder(Doc.path+ "/"+PSN);              
             if (!FoldN.exists)
             {
                     FoldN.create();                     
              }   
       FoldPath=FoldN;
       Filename=PSN;     
       
}



function GroupSandLayerName(DocF)
{           var ALLTxt;
             if(DocF.layerSets.length>=1) 
             {             
             ALLTxt=HaveGroupandLayer(DocF)+NoGroupLayer(DocF);   
              }   
             else
              {              
              ALLTxt = NoGroupLayer(DocF);           
              }         
              return  ALLTxt ;      
}

function HaveGroupandLayer(Doc)
    {
       var layN,BLL_layN=new Array();
       var layS;SLayS="";
      for(var i=0;i<Doc.layerSets.length;i++)
      {     
         
 
          if(Doc.layerSets[i].layerSets.length>0)
       {
          SLayS =HaveGroupandLayer(Doc.layerSets[i])+NoGroupLayer (Doc.layerSets[i]);
        }else{
          SLayS=NoGroupLayer(Doc.layerSets[i]);                            
        }  
      BLL_layN+=SLayS; 
      }    
   
       return  BLL_layN;   
    }
    
function NoGroupLayer(Doc)
    {
       var layN,ALL_layN=new Array(); 
      for(var i=0;i<Doc.artLayers.length;i++)
      {  
            LayerN++;
        layN=Doc.artLayers[i].name;   
        if(OPTION==1)
        {  
            ParentName(Doc.artLayers[i]);
            
            ALL_layN.push(LayersOutandPos(Doc.artLayers[i]));     
             
            }
        if(OPTION==0) 
        {
             ParentName(Doc.artLayers[i]);
            ALL_layN.push( LayersOutandPos(Doc.artLayers[i]));      
          }
        
        Doc.artLayers[i].visible=true;   
      }
       return  ALL_layN.join("");    
    }
function LayersOutandPos(Layers)
{
    var  Posx,Posy;
    var  PATHPOS;         
        Posx=(Layers.bounds[2].value-Layers.bounds[0].value)/2-(DocSub.width.toString()/2)+Layers.bounds[0].value;  
        Posy=(Layers.bounds[3].value-Layers.bounds[1].value)/2+(Layers.bounds[1].value)-(DocSub.height.toString()/2);   
        Posy=-Posy; 
     if(OPTION==1)
     {
   //      ParentName(Layers);
         FoldCreatLayer(Layers);
         PATHPOS="<Layer>"+"<name>"+Layers.name.replace(new RegExp(" ","g"),"_")+"</name>"+ "<Path>"+(PNStr+Layers.name)+"</Path>"+"<itemIndex>"+Layers.itemIndex+"</itemIndex>"+"<Posx>"+Posx+"</Posx>"+"<Posy>"+Posy+"</Posy>"+"</Layer>";
         
     }      
        SelectionandSave(Layers);
        if(OPTION== 0)
     { 
     //    ParentName(Layers);
              
                PATHPOS= "<Layer>"+"<name>"+PNStTran +Layers.name.replace(new RegExp(" ","g"),"_")+"</name>"+"<Path>"+(PNStTran+Layers.name)+"</Path>"+"<itemIndex>"+Layers.itemIndex+"</itemIndex>"+"<Posx>"+Posx+"</Posx>"+"<Posy>"+Posy+"</Posy>"+"</Layer>"
      }
        PNStr="";
             PNStTran=""; 
    return PATHPOS;
 } 

function SelectionandSave(layerRef)
{
   if(  (  layerRef.bounds[2].value-layerRef.bounds[0].value!=0)||(layerRef.bounds[3].value-layerRef.bounds[1].value!=0))
   {    layerRef.visible=true;
       DocSub.selection.selectAll();
      // app.activeDocument.selection.copy();
        
    //    activeDocument.selection.copy();
      layerRef.copy();       
       var width=layerRef.bounds[2].value-layerRef.bounds[0].value;
       var hight=layerRef.bounds[3].value-layerRef.bounds[1].value;
       
      var docRef=app.documents.add(width,hight,72,layerRef.name.replace(new RegExp(" ","g"),"_"),NewDocumentMode.RGB,DocumentFill.TRANSPARENT, 1);
             activeDocument.paste (); 
             app.activeDocument.artLayers[0].opacity=layerRef.opacity;
              activeDocument.trim(TrimType.TRANSPARENT,true,true,true,true);
   
   //       app.activeDocument.crop(Bounds);
    //    alert(PNStTran);
      
        if(OPTION==1)
     { 
         var file = File( FoldPath+"/"+PNStr.replace(new RegExp(" ","g"),"_")+layerRef.name.replace(new RegExp(" ","g"),"_")+".png");
     }
        if(OPTION==0)
     {
        PNStTran=PNStr.replace(new RegExp("/","g"),"_");
      var file = File( FoldPath+"/"+PNStTran+layerRef.name.replace(new RegExp(" ","g"),"_")+".png");
        alert(PNStTran);
      }
      
    
	      if (file.exists) file.remove();
        docExportOptions = new ExportOptionsSaveForWeb 

docExportOptions.format = SaveDocumentType.PNG //-24 //JPEG, COMPUSERVEGIF, PNG-8, BMP 
docExportOptions.transparency = true 
docExportOptions.blur = 0.0 
docExportOptions.includeProfile = false 
docExportOptions.interlaced = false 
docExportOptions.optimized = true 
docExportOptions.quality = 100 
docExportOptions.PNG8 = false 
docRef.exportDocument (file,ExportType.SAVEFORWEB,docExportOptions) 
  //    activeDocument.saveAs(file, new PNGSaveOptions(), true, Extension.LOWERCASE); 
app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);               
       }        
}

function  ParentName(Layers)
{
             PN=Layers;
            
          if((PN.parent.name!=DocSub.name.toString())&&(PN.parent.name!="Adobe Photoshop") )
          {    GroupN++;      
               PNStr=PN.parent.name.toString()+"/"+PNStr;    
               PN=PN.parent;    
               ParentName(PN);  
           }else(PNStr=PNStr)
        
    return PN;
}     


function  FoldCreatLayer(Layer)
{
     var FilePL,FoldNL; 
         
    
        
           FoldNL= new Folder(FoldPath+"/"+PNStr.replace(new RegExp(" ","g"),"_") );                
             if (!FoldNL.exists)
             {
                     FoldNL.create();                     
              }

}

function APPLanguage()
{
     if($.locale=="zh_CN")
     {return true;}
     else{return false;}
    
}


