var args = arguments[0] || {};

function validateEmail(emailValue) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(emailValue);
}


function ResetPassword(){
if($.textEmail.value==""){
	alert('Enter Email');
}
	else if (validateEmail($.textEmail.value)==0) {
			
			alert('Enter Valid Email Address');
			$.textEmail.focus();
		}
		
	

else{
$.actIndicator.show();
	var xhr=Ti.Network.createHTTPClient({
		onload: function() {
			
		var JsonObject=JSON.parse(this.responseText);
		//Ti.API.info(JsonObject);
		
	
		if(JsonObject)
		{
			$.actIndicator.hide();
			alert('Success. Please check your email for password recovery.');
			$.resetPassword.close();
	
		    }	
	    },
		timeout:60000
	});
	
	
	var url=ServiceUrl+'ResetPassword/SendPassword?Email='+$.textEmail.value;
	Ti.API.info(url);
	xhr.open("GET", url);
	

    xhr.setRequestHeader('x-ggi-session', Alloy.Globals.Token);
	xhr.setRequestHeader('Content-Type', "application/json");
	
	xhr.send();
	xhr.onerror = function(e) 
	{
		
    	$.actIndicator.hide();
    	if(Ti.Network.online==true){
    		
    		if(this.status==401){
			var win=Alloy.createController('Login').getView();
               win.open();	
               $.resetPassword.close();
               //Alloy.Globals.USERID="";
		}
		
	
    		
    		//alert("Error occured. Please try again later.");
    	}
    	else{
    		alert('No internet connection');
    	}
    	
	};
}
}


$.LoginBtn.addEventListener('click',function(){

var win=Alloy.createController('Login').getView();
win.open();
	
});
