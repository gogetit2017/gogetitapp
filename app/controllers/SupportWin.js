
var args = arguments[0] || {};
getDetails();

var Finalimage="";
function getDetails(){
	//alert(AccessToken);
	
	
	var xhr=Ti.Network.createHTTPClient({
		onload: function() {
		
		var JsonObject=JSON.parse(this.responseText);
		
		//Ti.API.info('Support'+this.responseText);
		if(JsonObject.data!=null&&JsonObject.data!="")
		{
	
		$.firstName.text=JsonObject.data.firstName+' '+JsonObject.data.lastName;
	      
	        //$.profileImage.backgroundImage=JsonObject.data.driverDetail.ProfilePic;
	        //alert(JsonObject.data.driverDetail.ProfilePic);
	       if(JsonObject.data.driverDetail.ProfilePic!=null&&JsonObject.data.driverDetail.ProfilePic!=""){
	       	
	       	$.profileImage.image='http://gogetit.com/userfiles/'+JsonObject.data.driverDetail.ProfilePic;
	       	 	
	       }
	       else{
	       	 $.profileImage.image='/images/BlueProfileIcon.png';
	       }
	     
		
		    }	
	    },
		timeout:60000
	});
	
	
	var url=ServiceUrl+'Driver/Get?UserID='+Alloy.Globals.USERID;
	//alert(url);
	xhr.open("GET", url);
	

    xhr.setRequestHeader('x-ggi-session',Alloy.Globals.Token);
	xhr.setRequestHeader('Content-Type', "application/json");
	
	xhr.send();
	xhr.onerror = function(e) 
	{
		if(Ti.Network.online==true){
    		
    	if(this.status==401){
			var win=Alloy.createController('Login').getView();
               win.open();	
               $.win.close();
               
		}
	
    		
    	}
    	else{
    		alert('No internet connection');
    	}
    	
    	
    	
	};

}


$.profileView.visible=true;
$.driverBtn.addEventListener('click',function(){
	$.ViewSupport.visible=true;
	$.profileView.visible=false;
	$.profileBtn.backgroundColor="#3BB9FF";
	$.driverBtn.backgroundColor="#3a9fe5";
	
});
$.profileBtn.addEventListener('click',function(){
	$.ViewSupport.visible=false;
	$.profileView.visible=true;
	$.profileBtn.backgroundColor="#3a9fe5";
	$.driverBtn.backgroundColor="#3BB9FF";
});



$.submit.addEventListener('click',function(){
	
	
	if($.currentPass.value=="")
	{
		alert('Enter Current Password');
	}
	else if($.newPass.value==""){
		alert('Enter New Password');
	}
	else if($.veryfyPass.value!=$.newPass.value){
		alert('Verified password is not match');
	}
	else{
		$.actIndicator.show();
		
	
	
	var xhr=Ti.Network.createHTTPClient({
		onload: function() {
			
		var JsonObject=JSON.parse(this.responseText);
		
		
		if(JsonObject.success)
		{
			$.currentPass.value="";
			$.newPass.value="";
			$.veryfyPass.value="";
	        $.actIndicator.hide();
	        alert('Password changed sucessfully');
		
		    }	
		    else{
		    	alert(JsonObject.data);
		    	
		    	$.actIndicator.hide();
		    }
	    },
		timeout:60000
	});
	
	
	var url=ServiceUrl+'ResetPassword/UpdatePassword?UserID='+Alloy.Globals.USERID+'&OldPassword='+$.currentPass.value+'&NewPassword='+$.newPass.value;
	
	xhr.open("POST", url);
    xhr.setRequestHeader('x-ggi-session',Alloy.Globals.Token);
	xhr.setRequestHeader('Content-Type', "application/json");
	
	xhr.send();
	xhr.onerror = function(e) 
	{
		
    	$.actIndicator.hide();
    	if(this.status==401){
			var win=Alloy.createController('Login').getView();
               win.open();	
               $.win.close();
               
		}
		
    	
    	
	};

}

			
		      });
		$.callBtn.addEventListener('click',function()
		{
			
			Ti.Platform.openURL('tel:5619100672');
		});

function ClickPhoto()
{
	
 Titanium.Media.showCamera({
 
                success:function(event)
                {
                	
                	
                	 if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                	 	
                	 	    var imageView =event.media;
                	 	   
                	 	   Finalimage=imageView.imageAsResized(105,105);
                	 	    UploadFile1(Finalimage);
                	 		
                	 		 	
                   }
                   
                },
                cancel:function() { },
                error:function(error)
                {
                	$.profileImage.enabled=true;
                	 //$.AddImageVideo.image='images/Camera.png';
                	 var dlg = Titanium.UI.createAlertDialog({
    				  message:'error', 
  		   	   		 buttonNames: ['Ok']
		 	 });
	 	     dlg.addEventListener('click', function(ev) {
	 	 		
  		 	 if (ev.index == 0) { // clicked "Yes"
  		  		
   			 } 
  		   });
 		 dlg.show();
 		
                   
                },
               
                mediaTypes: Titanium.Media.MEDIA_TYPE_PHOTO,
                saveToPhotoGallery:true,
                allowEditing:false,
                videoMaximumDuration:60000,
                videoQuality:Titanium.Media.QUALITY_LOW,
                
            });
    
	
	
	
} 



function saveImage(Finalimage){

	//alert('upload');
	//$.actIndicator.show();
	
	 var xhr = Titanium.Network.createHTTPClient();

               xhr.onload= function(e)
               {
               	
               	
               	var jsonObject=JSON.parse(this.responseText);
               	     Ti.API.info('loop 2' + this.responseText);
               	    
          
               	             
               	   if(jsonObject)
               {
               	
               	$.actIndicator.hide();
               	$.profileImage.enabled=true;
	                getDetails(); 
               }               	            
               },
               
                   xhr.timeout=600000;
                   
                    var url=ServiceUrl+'Driver/SetPic?pic='+Finalimage;
                     xhr.open("PUT",url);
                xhr.setRequestHeader('x-ggi-session',Alloy.Globals.Token);
	             xhr.setRequestHeader('Content-Type', "application/json");
                     xhr.send();
                     xhr.onerror = function(e) 
	{
		$.actIndicator.hide();	
		$.profileImage.enabled=true;
    	
    	if(Ti.Network.online==true){
    		    if(this.status==401){
			  var win=Alloy.createController('Login').getView();
               win.open();	
               $.win.close();
               
		}
	
    
    	}
    	else{
    		alert('No internet connection');
    	}
    	
	};
}

$.profileImage.addEventListener('click',function(){
	$.selectOption.visible=true;
	 $.profileImage.enabled=false;
});

$.TakePhoto.addEventListener('click',function(){
	$.selectOption.visible=false;
	ClickPhoto();
});
$.PhotoGallery.addEventListener('click',function(){
	$.selectOption.visible=false;
	selectPhoto();
});
$.cancel.addEventListener('click',function(){
	$.selectOption.visible=false;
	//selectPhoto();
});


function selectPhoto(){
	
	Titanium.Media.openPhotoGallery(
	{	
		success:function(event)
		{ 
			 	 if(event.mediaType==Ti.Media.MEDIA_TYPE_PHOTO) {
                	 	
                	 		
                	 		 var imageView =event.media;
                	 	 
                	 	        Finalimage=imageView.imageAsResized(105,105);
                	 	       
                	 	    	UploadFile1(Finalimage);
                	 		
                	 	
                	 		
                	 	
                	 	
                	 		
                	 	}
			 
			 
						
		},
		cancel:function()
		{
	
		},
		error:function(error)
		{
			$.profileImage.enabled=true;
		}
		
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
               	   
               	 if(jsonObject!=null&&jsonObject.success!=null&&jsonObject.success==1)
               	   {
               	   	//alert(jsonObject.fileName);
               	    alert('Image Uploaded Sucessfully');
               	    saveImage(jsonObject.fileName);
               	     $.profileImage.enabled=true;
               	   
               	   }
				  else{
				  		$.actIndicator.hide();
				  		$.profileImage.enabled=true;
				  		 // MsgType='Text';
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






