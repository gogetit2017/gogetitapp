

if(Ti.App.Properties.getString('TokenValue')==null||Ti.App.Properties.getString('TokenValue')==""){
var win=Alloy.createController('Login').getView();
win.open();	

}
else{
	Alloy.Globals.Token=Ti.App.Properties.getString('TokenValue');
	Alloy.Globals.USERID=Ti.App.Properties.getInt('UserID');
	
	  
	getDetails();
	
	
	
}

function getDetails(){

	var xhr=Ti.Network.createHTTPClient({
		onload: function() {
			
		var JsonObject=JSON.parse(this.responseText);
		
		
		Ti.API.info('driver'+this.responseText);
		
		
		 if(JsonObject.success)
		{
	
		    var win=Alloy.createController('TabWin').getView();
		    win.open();
	
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
		
		//alert(this.status);
		
		//alert(e);
    	//Ti.API.info(data);
    	if(Ti.Network.online==true){
    		if(this.status==401){
			var win=Alloy.createController('Login').getView();
               win.open();	
              // $.win.close();
               //Alloy.Globals.USERID="";
		}
    		
    		//("Error occured. Please try again later.");
    	}
    	else{
    		alert('No internet connection');
    	}
    	
    	
	};

}

