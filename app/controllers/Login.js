var args = arguments[0] || {};




function Login(){
	Alloy.Globals.USERID="";
	Alloy.Globals.Token="";
	//Ti.App.Properties.getString('TokenValue');
	//Ti.App.Properties.getInt('UserID');
	
	$.submitBtn.enabled='false';

	if($.textname.value==""){
	alert('Enter Username');
	$.submitBtn.enabled='true';
	
}
else if($.textPass.value==""){
	alert('Enter Password');
	$.submitBtn.enabled='true';
     }
     else{
	$.actIndicator.show();
	var data={
		username:$.textname.value,
		password:$.textPass.value,
	};
	var xhr=Ti.Network.createHTTPClient({
		onload: function() {
			
		var JsonObject=JSON.parse(this.responseText);
		//Ti.API.info(JsonObject);
		
		Ti.API.info('Login'+this.responseText);
		if(JsonObject.success){
			
		$.submitBtn.enabled='true';
		$.actIndicator.hide();
		Alloy.Globals.USERID=JsonObject.data.userID;
		Ti.App.Properties.setInt('UserID',JsonObject.data.userID);
		//alert(Ti.App.Properties.getInt('UserID'));
		Alloy.Globals.Token=JsonObject.data.token;
		
		Ti.App.Properties.setString('TokenValue',JsonObject.data.token);
	if(Alloy.Globals.DeviceToken!=null&& Alloy.Globals.DeviceToken!="")
	{
		PushService(Alloy.Globals.DeviceToken);
	}	
	
	
		var win=Alloy.createController('TabWin').getView();
		win.open();
		
		    }	
	    else{
	    	alert(JsonObject.msg);
	    	$.actIndicator.hide();
		   $.submitBtn.enabled='true';
	    }
	    },
		timeout:60000
	});
	
	var url=ServiceUrl+'RegisteredUser/UserLogin';
	//alert(url);
	xhr.open("POST", url);
	

    
	xhr.setRequestHeader('Content-Type', "application/json");
	
	xhr.send(JSON.stringify(data));
	xhr.onerror = function(e) 
	{
		$.actIndicator.hide();
		$.submitBtn.enabled='true';
    
    	if(Ti.Network.online==true){
    		
    		//alert("Error occured. Please try again later."+this.status);
    	}
    	else{
    		alert('No internet connection');
    	}
    	
	};

}
}




function PushService(Token){

	var xhr=Ti.Network.createHTTPClient({
		
		timeout:60000
	});
	
	var url=ServiceUrl+'Driver/SetDeviceToken?DeviceToken='+Token;
	//alert(url);
	xhr.open("PUT", url);
	
    xhr.setRequestHeader('x-ggi-session',Alloy.Globals.Token);
    
	xhr.setRequestHeader('Content-Type', "application/json");
	
	xhr.send();
	xhr.onerror = function(e) 
	{
		$.actIndicator.hide();
		$.submitBtn.enabled='true';
    	//Ti.API.info("ERROR " + e.error+this.status); 
    	//var win=Alloy.createController('DashBoard').getView();
    	//win.open();
    	if(Ti.Network.online==true){
    		
    		alert("Error occured. Please try again later.");
    	}
    	else{
    		alert('No internet connection');
    	}
    	
	};


}

	


$.forgotBtn.addEventListener('click',function(){
	var win=Alloy.createController('FogetPassword').getView();
     win.open();
});


















