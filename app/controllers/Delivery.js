var args = arguments[0] || {};


$.win.addEventListener('focus',function(){
	getDetails();
	Ti.App.Properties.setBool('ServiceVar',true);
	
});
$.win.addEventListener('onblur',function() {
	
 Ti.App.Properties.setBool('ServiceVar',false);
});

TimeSet();
function TimeSet(){

 	setInterval(function()
	{ 
		

	 	 if(Ti.App.Properties.getBool('SwitchFlag')==1&&Ti.App.Properties.getBool('ServiceVar')==true)
	        {
	        	
             DeleviryList1();
            
	         
	          }
	 
	 	
	 
	}, 30000);
 }

$.dliveryList.visible=true;
function DeleviryList1(){	
	var xhr=Ti.Network.createHTTPClient({
		onload: function(){
		
		var JsonObject=JSON.parse(this.responseText);
	    
	     Ti.API.info('loop 1' + this.responseText);
		
		var arr=[];
		
		
		if(JsonObject.success){
		if(JsonObject.data!=null&&JsonObject.data!="")
		  {
		 for(var i=0;i<JsonObject.data.length;i++)
		 {
		 var row=Ti.UI.createTableViewRow({
		 	  height:'80dp',
		 	  OrderID:JsonObject.data[i].OrderID,
		 	  className:'Delivery',
		 	  
		 	  
		 	
		   });
		 var labelView=Ti.UI.createView({
		
		  height:"70dp",
		  layout:"vertical",
		  left:'17dp',
		  backgroundColor:"#fff",
		  width:"90%",
	      });
		   
		   
		  
		   var DistanceView=Ti.UI.createView({
		   	height:'30dp',
		   	left:'0dp',
		   	top:'20dp',
		   	
		   	
		   });
		 
		   var DistanceLabel=Ti.UI.createLabel({
		   	text:JsonObject.data[i].Distance+' Miles',
		   	font:{
		   		fontSize:"14dp",
		   	    },
		   	    //left:'130dp',
		   	    width:'50%',
		   	    left:'7dp',
		   	    //backgroundColor:'red'
		   });
		    DistanceView.add(DistanceLabel);
		    /*var DeliveryType=Ti.UI.createLabel({
		    	text:JsonObject.data[i].Deliverytype,
		   	font:{
		   		fontSize:"14dp",
		   	    },
		   	    left:'7dp',
		   	    width:'130dp',
		    });*/
		     //DistanceView.add(DeliveryType);
		     
		     
		     var DeadLineText=Ti.UI.createLabel({
		    	text:JsonObject.data[i]._Deadline,
		   	font:{
		   		fontSize:"14dp",
		   	    },
		   	    right:'2dp',
		   	    width:'65dp',
		    });
		        
		  DistanceView.add(DeadLineText);
		
		  labelView.add(DistanceView);
		  row.add(labelView);
		  arr[i]=row;
		  }
		  try{
		  	$.dliveryList.setData([]);
		  }
           catch(e){}
           	
        
		   $.dliveryList.data=arr;
		  }	
	   else{
	   	      $.dliveryList.setData([]);
	    	
	    }
	   }
	   
	    },
		timeout:60000
	});
	
	var data={
		
		 pageIndex :'0',
		 pageSize:'25',
		 data:'Unassigned',
		 ascending:true,
	};
	
	var url=ServiceUrl+'Order/List';
	
	xhr.open("POST", url);
	

    xhr.setRequestHeader('x-ggi-session', Alloy.Globals.Token);
	xhr.setRequestHeader('Content-Type', "application/json");

	xhr.send(JSON.stringify(data));
	xhr.onerror = function(e) 
	{
		Ti.API.info(this.status);
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

$.dliveryList.addEventListener('click',function(e){
	
	var winHome= Alloy.createController('DeliveryDetails');
	winHome.openWin($.TabDevilery,e.row.OrderID);
	
	
});

$.SwitchField.addEventListener('change',function(e){
	
	
	SwitchBtn(e.value);
});

function SwitchBtn(BtnValue){
	
	var xhr=Ti.Network.createHTTPClient({
		onload: function() {
			
		var JsonObject=JSON.parse(this.responseText);
	
			getDetails();
		
		   
		
	    },
		timeout:60000
	});
	
	
	var url=ServiceUrl+'Driver/SetPush?RecievePush='+BtnValue;

	xhr.open("PUT", url);
    xhr.setRequestHeader('x-ggi-session',Alloy.Globals.Token);
	xhr.setRequestHeader('Content-Type', "application/json");
	
	xhr.send();
	xhr.onerror = function(e) 
	{
		Ti.API.info(this.status);
	   if(this.status==401){
			/*var win=Alloy.createController('Login').getView();
               win.open();	
               $.win.close();*/
               
		}

    	
	};

}



function getDetails(){

	var xhr=Ti.Network.createHTTPClient({
		onload: function() {
			
		var JsonObject=JSON.parse(this.responseText);
		
		
		Ti.API.info('driver'+this.responseText);
		
		 if(JsonObject.success)
		{
			
		   Ti.App.Properties.setBool('SwitchFlag',JsonObject.data.driverDetail.RecievePush);
		   if(Ti.App.Properties.getBool('SwitchFlag')==1)
	        {
             DeleviryList1();
             $.dliveryList.visible=true;
	         $.SwitchField.value=Ti.App.Properties.getBool('SwitchFlag');
	          }
	      else{
	      	//DeleviryList();
	      	$.dliveryList.visible=false;
	        $.SwitchField.value=Ti.App.Properties.getBool('SwitchFlag');	
	        }
	
		    }	
	    },
		timeout:60000
	});
	
	
	var url=ServiceUrl+'Driver/Get?UserID='+Alloy.Globals.USERID;

	xhr.open("GET", url);
	
        //Ti.API.info(Alloy.Globals.Token);
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

