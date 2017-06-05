var args = arguments[0] || {};
var TabWin;

exports.openWin=function(Tab){
	Alloy.Globals.PreviosWin.push($.win);
	
	TabWin=Tab;
	
	Tab.open($.win);
};

var Cancel =  Titanium.UI.createButton({
	title:'Cancel',
	style:Titanium.UI.iPhone.SystemButtonStyle.DONE
});
    var toolbar =Titanium.UI.iOS.createToolbar({
	top:0,
	items:[Cancel],
});

	$.textCost.keyboardToolbarHeight=16;
	$.textCost.autocapitalization=Titanium.UI.TEXT_AUTOCAPITALIZATION_ALL;
	
$.submit.addEventListener('click',function(){
	$.textCost.blur();
if($.textCost.value==""){
	
	var dialogBox=Ti.UI.createAlertDialog({
    message: 'Are you sure there were no purchase items?',
   
    buttonNames: ['No', 'Yes'],
    title: 'Alert'
  });
  
  dialogBox.addEventListener('click', function(e){
   dialogBox.hide();
    if (e.index == 1){
        if($.textCost.value==""){
        	
    	     var win=Alloy.createController('OrderSummary');
 
              win.openWin(TabWin,0.00,$.win);	
              
              //$.win.close();
    	    }
    	    
    }
    
  });
   dialogBox.show();

	
	
}
	
	
	else{
		
	var dialogBox=Ti.UI.createAlertDialog({
    message: 'Are you sure this is the correct amount of the purchased item(s)?',
   
    buttonNames: ['No', 'Yes'],
    title: 'Alert'
  });
  
  dialogBox.addEventListener('click', function(e){
    dialogBox.hide();
    if (e.index == 1){
    	var CostValue=$.textCost.value;
        var win=Alloy.createController('CameraScreen');
        win.openWin(TabWin,parseFloat(CostValue).toFixed(2),$.win);
    }
    else{
    	$.textCost.value="";
    	 
    }
    
  });
   dialogBox.show();


	
		
	}
	
});


/*exports.CloseWin=function(){
	//alert($.win);
	$.win.close();
};
*/