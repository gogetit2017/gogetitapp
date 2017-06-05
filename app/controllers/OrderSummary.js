


var TabWin;
var Amount=0;

var PreviousWin=null;

/*Modificado por web informatica*/
var _CouponCode = "";
var _DiscountType = "";
var _CouponValu = "";
var _CouponValue = ""; 
var _Tip = 0;


var SubTotalWithPercentage = 0;
var SubTotal=0;
/*Modificado por web informatica*/

exports.openWin=function(Tab,cost,cameraWin)
{   PreviousWin=cameraWin;	
	TabWin=Tab;
	Alloy.Globals.PreviosWin.push($.win);
	
	/*Modificado por web informatica*/
	getOrderByID(cost);
	/*Modificado por web informatica*/
	
	
	//getDetails(cost);
	
	Tab.open($.win);

	
};



$.PayBtn.addEventListener('click',function(){
	   
        var win=Alloy.createController('TipWin');
	     win.openWin(TabWin,Amount, _Tip, _DiscountType, _CouponValue, $.win);
	     //alert('OrderWin'+$.win);
	      //$.win.close();

	
 });
 
 
/*Modificado por web informatica*/ 
function getOrderByID(cost)
{
	var xhr2=Ti.Network.createHTTPClient({
		
		onload: function() {
			
			var JsonObject=JSON.parse(this.responseText);
			//Ti.API.info('OrderDetails'+this.responseText);
		
	   		if(JsonObject.data!=null&&JsonObject.data!="")
			{
				
				_Tip = JsonObject.data.Tip;
				
				if (JsonObject.data.CouponCode.length > 0)
				{

					/*GetCouponByCouponCode*/
					var xhr3 = Ti.Network.createHTTPClient({
				
						onload: function() {
							
							var JsonObject2=JSON.parse(this.responseText);
					   		
					   		if(Object.keys(JsonObject2).length > 0)
							{
								_CouponCode = JsonObject2.CouponCode;
								_CouponValue = JsonObject2.CouponValue;
								_DiscountType = JsonObject2.DiscountType;
								
								getDetails(cost);
								/*if (_DiscountType == "fixed")
								{
									getDetails(_CouponValue.toFixed(2));
								}
								else {
									getDetails(cost);
								}*/
						   	}
						   	
					    },
						timeout:60000
					});
					
					try{
						var url2=ServiceUrl+'Coupon/GetSingleCoupon?CouponCode='+JsonObject.data.CouponCode;
						
						xhr3.open("GET", url2);
					    xhr3.setRequestHeader('x-ggi-session',Alloy.Globals.Token);
						xhr3.setRequestHeader('Content-Type', "application/json");
						
						xhr3.send();
					}
					catch(Exception)
					{
						console.log(" Fallo !");
					}
				}
				else {
					getDetails(cost);
				}
				
		    }	
	    },
		timeout:60000
	});
	
	var url=ServiceUrl+'Order/Get?OrderID='+Ti.App.Properties.getInt('OrderID');
	
	xhr2.open("GET", url);
    xhr2.setRequestHeader('x-ggi-session',Alloy.Globals.Token);
	xhr2.setRequestHeader('Content-Type', "application/json");
	
	xhr2.send();
	
	
}
/*Modificado por web informatica*/ 


function getDetails(cost){
	
	
	
	var xhr=Ti.Network.createHTTPClient({
		onload: function() {
			
		var JsonObject=JSON.parse(this.responseText);
		Ti.API.info('OrderDetails'+this.responseText);
		
	   if(JsonObject.data!=null&&JsonObject.data!="")
		{
			
		    var distance=JsonObject.data.distance;
			
			var AmountMt=(cost*JsonObject.data.itemPercent);
		
			
			
			Amount= JsonObject.data.amount; 

			var devileryFee= Amount-cost; 
			
		    var CustName=JsonObject.data.customer;
		   
			var AmtCost= devileryFee-AmountMt;
			//var Mint=(JsonObject.data.minutes).split('');
			
			$.TimeText.text=(JsonObject.data.minutes).toFixed(0)+' min';
			$.distanceText.text=distance+' miles';
			$.CostText.text='$'+parseFloat(cost).toFixed(2);


			$.customerName.text=CustName;
			$.PrecentText.text='$'+parseFloat(AmountMt).toFixed(2);
			$.TipText.text='$'+devileryFee.toFixed(2);
			$.TotalAmt.text='$'+Amount.toFixed(2);
			
			$.ccNo.text='****'+JsonObject.data.last4;
			
			$.CouponCodeLabel.text = _CouponCode;
			
			if (_DiscountType == "percentage")
			{
				//$.CouponValueLabel.text = _CouponValue+"% off!";
				SubTotalWithPercentage =  (AmtCost.toFixed(2))/(1-(parseFloat(_CouponValue).toFixed(2)/100)); //parseFloat(Amount).toFixed(2) - (parseFloat(Amount).toFixed(2) * (parseFloat(_CouponValue).toFixed(2)/100));
				$.CouponValueLabel.text = _CouponValue+"% off!";
				$.TimeMileText.text='$'+ SubTotalWithPercentage;
			}
			else if (_DiscountType == "cash")
			{
				//$.CouponValueLabel.text = "$ "+_CouponValue.toFixed(2)+" off!";
				var valuec = parseFloat(_CouponValue);
				SubTotalWithPercentage = (AmtCost + valuec).toFixed(2); //parseFloat(Amount).toFixed(2) - parseFloat(_CouponValue).toFixed(2);
				$.CouponValueLabel.text = "$ "+_CouponValue+" off!";
				$.TimeMileText.text='$'+ SubTotalWithPercentage;
			}
			else if (_DiscountType == "fixed")
			{
				//$.CouponValueLabel.text = "$ "+_CouponValue.toFixed(2)+" fixed";
				//$.TotalAmt.text="$ "+_CouponValue.toFixed(2);
				SubTotalWithPercentage = parseFloat(_CouponValue).toFixed(2);
				$.CouponValueLabel.text = "$ "+_CouponValue.toFixed(2)+" fixed";
				$.TimeMileText.text='$'+ SubTotalWithPercentage;
			}
			else {

				$.TimeMileText.text='$'+ AmtCost.toFixed(2);
				
				
				
			}
					
		}	
	  },
		timeout:60000
	});
	
	
	var url=ServiceUrl+'Order/GetSummary?OrderID='+Ti.App.Properties.getInt('OrderID')+'&CostOfItem='+cost;
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
               //Alloy.Globals.USERID="";
		}
		
	
    		
    		//alert("Error occured. Please try again later.");
    	}
    	else{
    		alert('No internet connection');
    	}
    	
	};

}

exports.CloseWin=function(){
//alert(PeviousWin);
PreviousWin.CloseWin();
$.win.close();	
};