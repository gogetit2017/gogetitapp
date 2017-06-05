var TabWin;
var CostOfItem;
var Flag=false;
var ValueTips=0;
var SubTotal=0;

var TipPercent;
var imageItem="";
var PreviousWin=null;
var signaturestring="";
var SubTotalWithPercentage = 0;

/*Original 
exports.openWin=function(Tab,TotalAmt,BackWin){
	if(Ti.Platform.displayCaps.platformWidth<=320)
	{
		$.mainView.width='100%';
	}
	else{
		$.mainView.width='90%';
		$.mainView.left="6%";
		$.mainView.right="5%";
		
	}
	Alloy.Globals.PreviosWin.push($.win);
	TabWin=Tab;
	PreviousWin=BackWin;
	//alert(BackWin);
	SubTotal=TotalAmt.toFixed(2);
	$.subTotal.text='$'+TotalAmt.toFixed(2);
	
	 TipPercent=((SubTotal*25)/100).toFixed(2);
	//alert(TipPercent);
	$.TipBtn.text='$'+TipPercent;
	$.orderTotal.text='$'+ (parseFloat(TipPercent)+parseFloat(SubTotal)).toFixed(2);
	
	Tab.open($.win);
	
};*/

/*Modificado por Web Informatica*/
exports.openWin=function(Tab,TotalAmt,ParamTip, DiscountType, CouponValue, BackWin){
	if(Ti.Platform.displayCaps.platformWidth<=320)
	{
		$.mainView.width='100%';
	}
	else{
		$.mainView.width='90%';
		$.mainView.left="6%";
		$.mainView.right="5%";
		
	}
	Alloy.Globals.PreviosWin.push($.win);
	TabWin=Tab;
	PreviousWin=BackWin;
	//alert(BackWin);
	SubTotal=TotalAmt.toFixed(2);
	
	$.subTotal.text='$'+TotalAmt.toFixed(2);
	
	/*if (DiscountType == "percentage")
	{
		$.Discount.text = CouponValue+"% off!";
	}
	else 
	{
		$.Discount.text = "$ "+CouponValue+" off!";
	}*/
	
	
	
	if (ParamTip >= 0) {
		TipPercent= ParamTip;
	} else {
		TipPercent=((SubTotal*25)/100).toFixed(2);
	}
	 
	//alert(TipPercent);
	$.TipBtn.text='$'+TipPercent;
	
	/*if (DiscountType != "" && CouponValue != 0)
	{
		if (DiscountType == "percentage")
		{
			SubTotalWithPercentage = parseFloat(SubTotal).toFixed(2) - (parseFloat(SubTotal).toFixed(2) * (parseFloat(CouponValue).toFixed(2)/100));
			$.Discount.text = CouponValue+"% off!";
		}
		else if (DiscountType == "cash") 
		{
			SubTotalWithPercentage = parseFloat(SubTotal).toFixed(2) - parseFloat(CouponValue).toFixed(2);
			$.Discount.text = "$ "+CouponValue+" off!";
		}
		else {
			SubTotalWithPercentage = parseFloat(CouponValue).toFixed(2);
			$.Discount.text = "$0.00";
			$.subTotal.text='$'+SubTotalWithPercentage;
		}
		
		SubTotal = SubTotalWithPercentage;
	}*/
	
	
	$.orderTotal.text='$'+ (parseFloat(TipPercent)+parseFloat(SubTotal)).toFixed(2);
	
	Tab.open($.win);
	
};
/*Modificado por Web Informatica*/



var Cancel =  Titanium.UI.createButton({
	title:'Cancel',
	style:Titanium.UI.iPhone.SystemButtonStyle.DONE
});
    var toolbar =Titanium.UI.iOS.createToolbar({
	top:0,
	items:[Cancel],
});

	
Cancel.addEventListener('click',function() {
		//$.TipsText.blur();
	});

$.CalView.addEventListener('click',function() {
	$.TipsText.blur();
});
var textFlag=0;
$.TipsText.addEventListener('change',function(){
	if($.TipsText.value=="")
	{  $.TipsText.value=0;
		
		var EnterTip=$.TipsText.value;
		TipPercent=EnterTip;
		$.TipBtn.text='$'+parseFloat(EnterTip).toFixed(2);
		$.orderTotal.text='$'+ (parseFloat(EnterTip)+parseFloat(SubTotal)).toFixed(2);
		
	}
	else{
		var EnterTip=$.TipsText.value;
		TipPercent=EnterTip;
		$.TipBtn.text='$'+parseFloat(EnterTip).toFixed(2);
		$.orderTotal.text='$'+ (parseFloat(EnterTip)+parseFloat(SubTotal)).toFixed(2);
	  }
	
	
});
$.otheBtn.addEventListener('click',function(){
textFlag=1;

Flag='false';
   $.pesent15.backgroundColor="#3BB9FF";
	$.pesent20.backgroundColor="#3BB9FF";
	$.pesent25.backgroundColor="#3BB9FF";
	$.NoTip.backgroundColor="#3BB9FF";
	$.otheBtn.backgroundColor="#3a9fe5";
$.TipsTextView.visible='true';
//
	ValueTips=$.TipsText.value;
	//alert($.TipsText.value);
});

$.NoTip.addEventListener('click',function(){
	ValueTips=0;
	$.TipsText.blur();
	 TipPercent=((SubTotal*0)/100).toFixed(2);
	$.TipBtn.text='$'+TipPercent;
	$.orderTotal.text='$'+(parseFloat(TipPercent)+parseFloat(SubTotal)).toFixed(2);
	$.pesent15.backgroundColor="#3BB9FF";
	$.pesent20.backgroundColor="#3BB9FF";
	$.pesent25.backgroundColor="#3BB9FF";
	$.NoTip.backgroundColor="#3a9fe5";
	
	$.otheBtn.backgroundColor="#3BB9FF";
	Flag='false';
	//ValueTips=0;
	$.TipsText.value="";
	$.TipsTextView.visible='false';
});

$.pesent15.addEventListener('click',function(){
	ValueTips=20;
	$.TipsText.blur();
	//var TipPercent=$.subTotal.text;
	$.pesent15.backgroundColor="#3a9fe5";
	Flag='true';
	
	 TipPercent=((SubTotal*20)/100).toFixed(2);
	
	$.TipBtn.text='$'+TipPercent;
	
	$.orderTotal.text='$'+(parseFloat(TipPercent)+parseFloat(SubTotal)).toFixed(2);
	
	
	//$.TipsText.value="";
	//$.pesent15.backgroundColor="#FDE700";
	$.pesent20.backgroundColor="#3BB9FF";
	$.pesent25.backgroundColor="#3BB9FF";
	$.NoTip.backgroundColor="#3BB9FF";
	$.otheBtn.backgroundColor="#3BB9FF";
	$.TipsTextView.visible='false';
	
	
	
});
$.pesent20.addEventListener('click',function(){
	ValueTips=25;
	$.TipsText.blur();
	//$.TipBtn.text=($.subTotal.text*25)/100;
	 TipPercent=((SubTotal*25)/100).toFixed(2);
	$.TipBtn.text='$'+TipPercent;
	$.orderTotal.text='$'+(parseFloat(TipPercent)+parseFloat(SubTotal)).toFixed(2);
	Flag='true';
	$.TipsText.value="";
	$.pesent15.backgroundColor="#3BB9FF";
	$.pesent20.backgroundColor="#3a9fe5";
	$.pesent25.backgroundColor="#3BB9FF";
	$.NoTip.backgroundColor="#3BB9FF";
	$.otheBtn.backgroundColor="#3BB9FF";
	$.TipsTextView.visible='false';
	
	
});
$.pesent25.addEventListener('click',function(){
	ValueTips=30;
	$.TipsText.blur();
	 TipPercent=((SubTotal*30)/100).toFixed(2);
	$.TipBtn.text='$'+TipPercent;
	$.orderTotal.text='$'+(parseFloat(TipPercent)+parseFloat(SubTotal)).toFixed(2);
	Flag='true';
	$.TipsText.value="";
	$.pesent15.backgroundColor="#3BB9FF";
	$.pesent20.backgroundColor="#3BB9FF";
	$.pesent25.backgroundColor="#3a9fe5";
	$.NoTip.backgroundColor="#3BB9FF";
	$.otheBtn.backgroundColor="#3BB9FF";
	$.TipsTextView.visible='false';
});

var Paint = require('ti.paint');


var paintView = Paint.createPaintView({
    top:1, right:0, bottom:15, left:0,
    
    strokeColor:'#000', strokeAlpha:230, strokeWidth:4,
    eraseMode:false,
   
});
imageItem=paintView;
//imgView.getDrawable()
//alert(paintView.getSize());

//$.signatureView.add(paintView);

//var clear = Ti.UI.createButton({ bottom:0, left:'40%', width:50, height:20, title:'Clear' });
//clear.addEventListener('click', function() { paintView.clear(); });
//$.signatureView.add(clear);
var done = Ti.UI.createButton({ bottom:0, right:10, width:50, height:20, title:'Done' });
//var SignimageItem= paintView.toImage();
//alert(imageItem);
paintView.addEventListener('touchmove',function(e){
      
      imageItem=e.x;
       //alert(e.x+','+e.y); 
   });
done.addEventListener('click', function() {
	 
	});

$.nextBtn.addEventListener('click',function(){
	/*if(textFlag==1)
	{
		textFlag=0;
		ValueTips=$.TipsText.value;
	    TipPercent=((SubTotal*25)/100).toFixed(2);
		$.TipBtn.text='$'+TipPercent;
	    $.orderTotal.text='$'+(parseFloat(TipPercent)+parseFloat(SubTotal)).toFixed(2);
	}
	if(imageItem!=0&&imageItem!="")
	{
	 UploadFile1(SignimageItem);	
	}
	else{
		alert('Please sign here');
	  }*/
	if($.customer_name.value==""){
		alert('Enter customer name');

	}
	else
	{
		signaturestring = $.customer_name.value;
		//alert(signaturestring);
		PayNow();
	}
});

function UploadFile1(imageItem){

	 var xhr = Titanium.Network.createHTTPClient();

               xhr.onload= function(e)
               {
               	var jsonObject=null;
               	try{
               	jsonObject=JSON.parse(this.responseText);
               Ti.API.info(this.responseText);
               	}catch(ex)
               	{
               		jsonObject=null;
               	}
               	  
               	 if(jsonObject!=null&& jsonObject.success!=null&&jsonObject.success==1)
               	   {
               	   
               	  
               	   Alloy.Globals.fileName=jsonObject.fileName;
               	 
               	     PayNow();
               	   
               	   }
				  else{
				  		//$.actIndicator.hide();
				  		
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

                   'media[]':imageItem,
                  //'media[]':Finalimage,

                 });
                 
                
}
function PayNow(){
	//alert(signaturestring);
//alert(Alloy.Globals.arrReceipt);

	var data={
		orderID:Ti.App.Properties.getInt('OrderID'),
		customerSign:signaturestring,
		tip:TipPercent,
		receipt:Alloy.Globals.arrReceipt,
	};
	console.log(data);
	/*
	alert(data);
	return;
	*/
	
	var xhr=Ti.Network.createHTTPClient({
		onload: function() {
	
		var JsonObject=JSON.parse(this.responseText);
		console.log(JsonObject);
		Ti.API.info('loop 3' + JsonObject);
		
		
		if(JsonObject.success){
			Alloy.Globals.arrReceipt="";
			Alloy.Globals.i=0;
			
		  Ti.App.Properties.setInt('OrderID',"");
		   Ti.App.Properties.setInt('Accept',1);
		    Alloy.Globals.OrderID=0;
		  
		  
		    var Win=Alloy.createController('ThnaksWin');
	        Win.openWin(TabWin);
	         closewin();
	     		    }	
	    else{
	    	alert(JsonObject.msg);
	    	
	    }
	    },
		timeout:60000
	});
	
	var url=ServiceUrl+'Order/Pay';
	//alert(url);
	xhr.open("POST", url);
	

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
		}else
    		{
    				alert("Error occured. Please try again later.");
    		}
    	
    	}
    	else{
    		alert('No internet connection');
    	}
    	
	};
	
	
	
	
}


function closewin(){
	
	     while(Alloy.Globals.PreviosWin.length>0)
		   {
		   	var PopWin=Alloy.Globals.PreviosWin.pop();
		  
		   	PopWin.close();
		   }
}
