var args = arguments[0] || {};
var OrderID;
Alloy.Globals.ServiceVar=false;

exports.openWin=function(Tab,OrdID){
	Tab.open($.win);
	Alloy.Globals.PreviosWin.push($.win);
	
	OrderID=OrdID;
	
	DeliveryDetails(OrdID);
	
	if(Ti.App.Properties.getInt('Accept')==0)
	{
		$.AcceptBtn.visible=false;
	}
	else{
		$.AcceptBtn.visible=true;
	    }
	
};


$.AcceptBtn.addEventListener('click',function(){
	
	var dialogBox=Ti.UI.createAlertDialog({
    message: 'Are you sure you want to accept this order? If you are, your time will begin now.',
   
    buttonNames: ['No', 'Yes'],
    title: 'Alert'
  });
  
  dialogBox.addEventListener('click', function(e){
    dialogBox.hide();
    if (e.index == 1){
      AcceptOrder(OrderID);
    }
    
  });
   dialogBox.show();


});

function DeliveryDetails(OrderID){
	
	var xhr=Ti.Network.createHTTPClient({
		onload: function() {
			
		var JsonObject=JSON.parse(this.responseText);
		
		
		Ti.API.info('Delivery Details'+this.responseText);
		//alert(JsonObject);
		
			 if(JsonObject.data!=null&&JsonObject.data!="")
		{
			
		var DeadTime =JsonObject.data._Deadline;
		var DeadLine= DeadTime.split('.');
		$.ArrivalTime.text=JsonObject.data._Deadline;
		$.deliveryDetails.text= JsonObject.data.Details;
		
		//alert($.deliveryDetails.text);
		
		//$.deliveryType.text=JsonObject.data.DeliveryType;
		$.PickUpName.text=JsonObject.data.PickUpName;
		$.DeliveryName.text=JsonObject.data.DeliveryName;
		
		if (JsonObject.data.PickupDate == "ASAP")
		{
			$.PickupDate.text = "As Soon As Possible";
		}
		else{
			$.PickupDate.text = JsonObject.data.PickupDate;
		}
		
		
		//$.PickupTime.text = JsonObject.data.PickupTime;
		
		/*MASK PickUpTime - Modificado por Web informatica */
		var hour = JsonObject.data.PickupTime;
		var band = false;
		var hour12;
		
		if (hour != null)
		{
		
			arr_current_hour = hour.split(":");
			
			if (arr_current_hour[1] == "0")
			{
				arr_current_hour[1] = "00";
			}
			
			var array_hours24 = [
					[1,13],
					[2,14],
					[3,15],
					[4,16],
					[5,17],
					[6,18],
					[7,19],
					[8,20],
					[9,21],
					[10,22]
				];
			
			if (arr_current_hour[0] > 12)
			{
				for (var i=0; i < array_hours24.length; i++)
				{
					for (var j=0; j < array_hours24[i].length ; j++)
					{
						if (arr_current_hour[0] == array_hours24[i][j])
						{
							band = true;
							$.PickupTime.text = array_hours24[i][j-1]+":"+arr_current_hour[1]+":"+arr_current_hour[2]+" PM";
						}
					}
				}
			}
	
			if (!band)
			{
				if (arr_current_hour[0] > 11)
				{
					$.PickupTime.text = arr_current_hour[0]+":"+arr_current_hour[1]+":"+arr_current_hour[2]+" PM";		
				}
				else
				{
					$.PickupTime.text = arr_current_hour[0]+":"+arr_current_hour[1]+":"+arr_current_hour[2]+" AM";		
				}
			}
		}
		/*END MASK PickUpTime - Modificado por Web informatica */
		
		
		$.location.text=JsonObject.data.GRI_Address.Address1+' '+JsonObject.data.GRI_Address.Address2+' '+JsonObject.data.GRI_Address.GRI_ZipCode.GRI_City.Name+' '+JsonObject.data.GRI_Address.GRI_ZipCode.GRI_City.GRI_State.Name+' '+JsonObject.data.GRI_Address.GRI_ZipCode.ZipCode;
		$.deliveryAddress.text=JsonObject.data.GRI_Address1.Address1+' '+JsonObject.data.GRI_Address1.Address2+' '+JsonObject.data.GRI_Address1.GRI_ZipCode.GRI_City.Name+' '+JsonObject.data.GRI_Address1.GRI_ZipCode.GRI_City.GRI_State.Name+' '+JsonObject.data.GRI_Address1.GRI_ZipCode.ZipCode;
		//alert(JsonObject.data.token);
		
		    }	
	    },
		timeout:60000
	});

	var url=ServiceUrl+'Order/Get?OrderID='+OrderID;
	//alert(url);
	xhr.open("GET", url);
	

     xhr.setRequestHeader('x-ggi-session',Alloy.Globals.Token);
	xhr.setRequestHeader('Content-Type', "application/json");
	
	xhr.send();
	xhr.onerror = function(e) 
	{
		
    	//Ti.API.info(data);
    	if(this.status==401){
			var win=Alloy.createController('Login').getView();
               win.open();	
               $.win.close();
               //Alloy.Globals.USERID="";
		}
	
		
    	//alert("Error occured. Please try again later."+this.status);
    	
	};

}

function AcceptOrder(ID){
	Alloy.Globals.OrderID="";
	var data={
		OrderID:ID,
		Accept:true,
		Driver:true,
	};

	var xhr=Ti.Network.createHTTPClient({
		onload: function() {
			
		var JsonObject=JSON.parse(this.responseText);
	
		if(JsonObject){
			Ti.App.Properties.setInt('Accept',0);
			Ti.App.Properties.setInt('OrderID',ID);
			Alloy.Globals.OrderID=ID;
		    Alloy.Globals.TabWin.setActiveTab(1);
			$.win.close();
	         
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
			var win=Alloy.createController('Login').getView();
               win.open();	
               $.win.close();
               //Alloy.Globals.USERID="";
		}
		else{
			alert("Error occured. Please try again later.");
		}
    		
    		
    	}
    	else{
    		alert('No internet connection');
    	}
    	
	};

}
