var args = arguments[0] || {};
var CostOfItem;
var TabWin;
Alloy.Globals.arrReceipt="";
var PreviousWin=null;

exports.openWin=function(Tab,Cost,costWin){
	
	Alloy.Globals.PreviosWin.push($.win);
	//alert('costWin'+costWin);
	PreviousWin=costWin;
	CostOfItem=Cost;
	TabWin=Tab;
	Tab.open($.win);
	Alloy.Globals.i=0;
	
};


var Finalimage="";

$.Camera.addEventListener('click',function(){
$.NoReceiptBtn.enabled=false;
$.Camera.enabled=false;

ClickPhoto();
	
});

function ClickPhoto()
{
	//alert(photoFlag);
 Titanium.Media.showCamera({
 
                success:function(event)
                {
                	
                	
                	 if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                	 	
                	 	var imageView=event.media;
                	 	    //alert(event.media);
                	 	  // Finalimage=imageView.imageAsThumbnail(300);
                	        Finalimage=imageView.imageAsResized(500,500);
                	 	    
                	 	    UploadFile1(Finalimage);
                	 		
                	 		//Finalimage=image.imageAsResized(100,100);
                	 		 	
                   }
                   
                },
                cancel:function() {
                	$.NoReceiptBtn.enabled=true;
                    $.Camera.enabled=true;
 },
                error:function(error)
                {   $.NoReceiptBtn.enabled=true;
                	$.Camera.enabled=true;
                	 //$.AddImageVideo.image='images/Camera.png';
                	 var dlg = Titanium.UI.createAlertDialog({
    				  message:'error', 
  		   	   		 buttonNames: ['Ok']
		 	 });
	 	    
                   
                },
               
                mediaTypes: Titanium.Media.MEDIA_TYPE_PHOTO,
                
                
               
                
                
            });
    
	
	
	
} 






function UploadFile1(Finalimage){
	//alert('upload');
	$.actIndicator.show();
	
	 var xhr = Titanium.Network.createHTTPClient();

               xhr.onload= function(e)
               {
               	var jsonObject=null;
               	try{
               	jsonObject=JSON.parse(this.responseText);
               	
               	}catch(ex)
               	{
               		jsonObject=null;
               	}
               	   
               	 if(jsonObject!=null&& jsonObject.success!=null&&jsonObject.success==1)
               	   {
               	   	$.NoReceiptBtn.enabled=true;
               	   	$.Camera.enabled=true;
               	   	if(Alloy.Globals.i==0){
               	   	Alloy.Globals.arrReceipt=jsonObject.fileName;	
               	   	}
               	   	else{
               	   		Alloy.Globals.arrReceipt=Alloy.Globals.arrReceipt+','+jsonObject.fileName;
               	   	}
               	   	
               	   	Alloy.Globals.i=Alloy.Globals.i+1;
               	   	$.actIndicator.hide();
               	   	//alert(Alloy.Globals.arrReceipt);
               	    alert('Image Uploaded Sucessfully');
               	   
               	     var dialogBox=Ti.UI.createAlertDialog({
                      message: 'Do you need  to take another photo of a  second receipt?',
   
                 buttonNames: ['No', 'Yes'],
                 title: 'Alert'
  });
  
  dialogBox.addEventListener('click', function(e){
    dialogBox.hide();
    $.Camera.enabled=true;
    $.NoReceiptBtn.enabled=true;
    if (e.index == 0){
           var win=Alloy.createController('OrderSummary');
         win.openWin(TabWin,CostOfItem,$.win);
      
    }
    
    
  });
   dialogBox.show();

               	   }
				  else{
				  		$.actIndicator.hide();
				  		 // MsgType='Text';
				  		    $.Camera.enabled=true;
				  			var dlg = Titanium.UI.createAlertDialog({
    			     		message:"There was a problem uploading the file. Please try again!", 
  		   	    			buttonNames: ['Ok']
		 	       });
	 	
 		       dlg.show();
	         	
				  	
				  }

				
				
					
					
					
					
               },
                xhr.timeout=600000;
                xhr.onsendstream = function(e) {
	              //progress.value = e.progress;
	
};
                              xhr.open('POST',handlerUrl+'upload.ashx');

               xhr.send({

                   'media[]': Finalimage,
                  //'media[]':Finalimage,

                 });
}




$.NoReceiptBtn.addEventListener('click',function(){
	
	var win=Alloy.createController('OrderSummary');
         win.openWin(TabWin,CostOfItem,$.win);
        // $.win.close();
	
});

/*exports.CloseWin=function(){
	
PreviousWin.CloseWin();
$.win.close();	

};
*/