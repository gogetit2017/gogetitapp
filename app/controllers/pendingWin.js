
var args = arguments[0] || {};
var TabWin;

exports.openWin=function(Tab){
	TabWin=Tab;
	Tab.open($.win);
};


$.win.addEventListener('focus',function(){
	
	if(Ti.App.Properties.getInt('OrderID')==""||Ti.App.Properties.getInt('OrderID')==null){
		$.OrderBtn.visible='false';
		$.OrderComBtn.visible='false';
		$.claimOrder.visible='true';
		$.NoData.text="Please Claim an Order";
		$.NoData.visible="true";
		$.pendingView.visible="false";
		$.pendingView.height="0dp";


}
else{
	DeliveryDetails(Ti.App.Properties.getInt('OrderID'));
		
	$.OrderBtn.visible='true';
	$.OrderComBtn.visible='true';
	$.claimOrder.visible='false';
	$.NoData.visible="false";
	$.NoData.text="";
	$.pendingView.visible="true";
	$.pendingView.height=Ti.UI.SIZE;
	
   
	
}

	
});

$.claimOrder.addEventListener('click',function(){
	Alloy.Globals.TabWin.setActiveTab(0);
	//$.win.close();
});



var PhoneCall;
$.OrderBtn.addEventListener('click',function(){
	
	var dialogBox=Ti.UI.createAlertDialog({
    message: 'Are you sure this order has been  compeleted?',
   
    buttonNames: ['No', 'Yes'],
    title: 'Alert'
  });
  dialogBox.show();
  dialogBox.addEventListener('click', function(e){
     
dialogBox.hide();
    
    if (e.index == 1){
   
   
      var win=Alloy.createController('CostWin');
         win.openWin($.TabPending);
     
  
    }
    
    
  });
  

});



$.OrderComBtn.addEventListener('click',function(){
	
	
	var dialogBox=Ti.UI.createAlertDialog({
    message: 'Are you cancelling the delivery request, or is the  customer cancelling the delivery request?',
   
    buttonNames: ['I am', 'Customer','Cancel'],
    title: 'Alert'
  });
  dialogBox.show();
  dialogBox.addEventListener('click', function(e){
     dialogBox.hide();  
    Ti.App.sigue = "N"; 	
    if (e.index ==0){
    	
    
    	  Flag=true;

    	  AcceptOrder(Ti.App.Properties.getInt('OrderID'),Flag);
    	   
         
  
    }
    else if(e.index == 2){
  
  
    }
    else{
    	
    	
    	Flag=false;
    
    	
    	
    	 AcceptOrder(Ti.App.Properties.getInt('OrderID'),Flag);
    }
    
  });
  	
});
function DeliveryDetails(OrderID){
//	Ti.App.sigue = "S";
//var service2 = Ti.App.iOS.registerBackgroundService({url:'bg-service-geo.js'});
	
	var xhr=Ti.Network.createHTTPClient({
		onload: function() {
			
		var JsonObject=JSON.parse(this.responseText);
		
		Ti.API.info('PendingDetails'+this.responseText);
		
			
	
	
	 if(JsonObject.data!=null&&JsonObject.data!=""){
		
		//$.deliveryType.text=JsonObject.data.DeliveryType;
		
		Ti.API.info(' Datos del cliente ' + JsonObject.data.UserID);
		$.deliveryDetails.text=JsonObject.data.Details;
	 										
	 	if(JsonObject.data.UserID == '5776' || JsonObject.data.UserID == '5649'){
	 		segGograbGeoLogin();
	 		
	 		var detalle = JsonObject.data.Details.replace('#API ', '');; 
		 	var gograborden =JSON.parse(detalle);
		 	
		 	$.deliveryDetails.text='Receiver Name: ' + gograborden.receiverName + '\n Zip: '+ gograborden.zipCode+'\n Address'  +  gograborden.address ;
		 	 
	 	 
	 	var tiempo = setInterval(function()
				{
				 
				 if (Ti.App.Properties.getInt('OrderID') > 0){
				 var longitude = "" ;
				     var latitude = "";
				            
				            
					if(Ti.Network.online){
				        Ti.Geolocation.purpose = "Receive User Location";
				        Titanium.Geolocation.getCurrentPosition(function(e){
				
				            if (!e.success || e.error)
				            {
				                Ti.API.info('Could not find the device location');
				                return;
				            }
				             longitude = e.coords.longitude;
				             latitude = e.coords.latitude;
				
				            Ti.API.info("latitude: " + latitude + "longitude: " + longitude);
				            
				            
						 	Ti.API.info('Haciendo Trackin' + gograborden.orderId + ' Lat: ' + latitude + ' Long: ' + longitude);
						 	 
						 	 segGograbGeo(gograborden.orderId ,latitude, longitude);
				
				        });
				    }else{
				        Ti.API.info("Internet connection is required to use localization features");
				    }
	 	 
	 	 }
	 	 		 Ti.API.info("Orden Id: " + Ti.App.Properties.getInt('OrderID'));
	 	 		 
	 	 		 
				}, 30000);
			 
			 
		}	 
	
		
		//$.deliveryType.text=JsonObject.data.DeliveryType;
		$.PickUpName.text=JsonObject.data.PickUpName;
		$.DeliveryName.text=JsonObject.data.DeliveryName;
		
		$.location.text=JsonObject.data.GRI_Address.Address1+' '+JsonObject.data.GRI_Address.Address2+','+JsonObject.data.GRI_Address.GRI_ZipCode.GRI_City.Name+' '+JsonObject.data.GRI_Address.GRI_ZipCode.GRI_City.GRI_State.Name+' '+JsonObject.data.GRI_Address.GRI_ZipCode.ZipCode;
		$.deliveryAddress.text=JsonObject.data.GRI_Address1.Address1+' '+JsonObject.data.GRI_Address1.Address2+', '+JsonObject.data.GRI_Address1.GRI_ZipCode.GRI_City.Name+' '+JsonObject.data.GRI_Address1.GRI_ZipCode.GRI_City.GRI_State.Name+' '+JsonObject.data.GRI_Address1.GRI_ZipCode.ZipCode;
		$.NameCustomer.text=JsonObject.data.CustomerName;
		$.PhoneNo.text=JsonObject.data.CustomerPhone;
		$.deliverytime.text=JsonObject.data._Deadline;
		PhoneCall=JsonObject.data.CustomerPhone;
		
		
	   }	
	    },
		timeout:60000
	});

	var url=ServiceUrl+'Order/Get?OrderID='+OrderID;
	
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




$.deliveryAddress.addEventListener('click',function()
{
 Ti.Platform.openURL('http://maps.apple.com/?q='+$.deliveryAddress.text);	

});
$.location.addEventListener('click',function()
{
 Ti.Platform.openURL('http://maps.apple.com/?q='+$.location.text);	

});


$.PhoneNo.addEventListener('click',function(){
	var NewPhone=PhoneCall.replace('-',"");
	
	Ti.Platform.openURL("tel:"+parseInt(NewPhone.replace('-',"")));
});


function AcceptOrder(OderID,Flag){
	
	var data={
		OrderID:OderID,
		Accept:false,
		Driver:Flag,
	};
	
		
	var xhr=Ti.Network.createHTTPClient({
		onload: function() {
			
		var JsonObject=JSON.parse(this.responseText);
		
		
		
	
		if(JsonObject){
		
		Ti.App.Properties.setInt('OrderID',"");
		Alloy.Globals.OrderID=0;
		Ti.App.Properties.setInt('Accept',1);
	    Ti.App.Properties.setInt('clientID',"");	
		Alloy.Globals.TabWin.setActiveTab(0);
	 
		Ti.API.info("Cancelando Orden");
		
		
		    }	
	    else{
	    	//$.OrderComBtn.enabled=false;
	    	alert('The time period to cancel an order has expired. You can NOT cancel an order after 5 minutes of accepting an order. Please complete this order');
	    }
	    },
		timeout:60000
	});
	
	var url=ServiceUrl+'Order/Accept';
	
	xhr.open("PUT", url);
	
    xhr.setRequestHeader('x-ggi-session',Alloy.Globals.Token);
    
	xhr.setRequestHeader('Content-Type', "application/json");
	
	xhr.send(JSON.stringify(data));
	xhr.onerror = function(e) 
	{
		
    	if(Ti.Network.online==true){
    			if(this.status==401){
			/*var win=Alloy.createController('Login').getView();
               win.open();	
               $.win.close();*/
               
		}
	
    		
    		
    	}
    	else{
    		alert('No internet connection');
    	}
    	
	};

}


function segGograbGeo(OderID,latitud, longitud){
		Ti.API.info('Entro segGoGrab' + OderID + ' - ' + latitud + ' - ' + longitud);
		
	var data={
		orderId:OderID,
		latitude:latitud,
		longitude:longitud,
	};
	
	var xhr=Ti.Network.createHTTPClient({
		onload: function() {
			
		var JsonObject=JSON.parse(this.responseText);
		Ti.API.info(' Resultado Go Grabit: ' + this.responseText);
		if(JsonObject){
			Ti.API.info(' Resultado Go Grabit: ' );
		    }	
	    },
		timeout:60000
	});
	
	var url='https://vps.grograb.com:8080/api/geopos.delveryPos?orderId=' + OderID + '&latitude='+latitud+'&longitude='+longitud;	
	Ti.API.info(' url:  ' + url );
	xhr.open("GET", url);
    xhr.setRequestHeader('x-ggi-session',Alloy.Globals.Token);
 	xhr.setRequestHeader('Content-Type', "application/json");
	xhr.send();
	xhr.onerror = function(e) 
	{
		Ti.API.info(' Error ' + this.responseText);
    	if(Ti.Network.online==true){
    			if(this.status==401){   
    					Ti.API.info('Error al invocar GoGrab');            
		}
			
    	}
    	else{
    		alert('No internet connection');
    	}
    	
	};

}

function segGograbGeoLogin(){
	
	var xhr=Ti.Network.createHTTPClient({
		onload: function() {
			
		var JsonObject=JSON.parse(this.responseText);
		Ti.API.info(' Resultado Go Grabit: ' + this.responseText);
		if(JsonObject){
			Ti.API.info(' Resultado Go Grabit: ' );
		    }	
	    },
		timeout:60000
	});
	
	var url='https://vps.grograb.com:8080/api/user.authenticate?username=gogetitDriver&password=uno.2.tres';	
	Ti.API.info(' url:  ' + url );
	xhr.open("GET", url);
    xhr.setRequestHeader('x-ggi-session',Alloy.Globals.Token);
 	xhr.setRequestHeader('Content-Type', "application/json");
	xhr.send();
	xhr.onerror = function(e) 
	{
		Ti.API.info(' Error en login ' + this.responseText);
    	if(Ti.Network.online==true){
    			if(this.status==401){   
    					Ti.API.info('Error al invocar GoGrab');            
		}
			
    	}
    	else{
    		alert('No internet connection');
    	}
    	
	};

}


 
  
