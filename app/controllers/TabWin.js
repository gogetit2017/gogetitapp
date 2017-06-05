var args = arguments[0] || {};
$.TabGroupID.setActiveTab(0);
Alloy.Globals.TabWin=$.TabGroupID;
//Alloy.Globals.OrderID=0;

/*$.TabGroupID.addEventListener('focus',function(e){
if($.TabGroupID.activeTab==e.tab)
 return;	
	
});
*/



$.TabGroupID.addEventListener('focus',function(e){

if($.TabGroupID.activeTab.title=='Log out')
{
	var dialogBox=Ti.UI.createAlertDialog({
    message: 'Are you sure you want to log out?',
   
    buttonNames: ['No', 'Yes'],
    title: 'Alert'
  });
  dialogBox.show();
  dialogBox.addEventListener('click', function(e){
     
dialogBox.hide();
    
    if (e.index == 1){
   
        Alloy.Globals.USERID="";
        Alloy.Globals.Token="";
     	var win=Alloy.createController('Login').getView();
		win.open();
     
  
    }
    else
    {
    	var win=Alloy.createController('TabWin').getView();
		win.open();
    }
    
  });
}
});
