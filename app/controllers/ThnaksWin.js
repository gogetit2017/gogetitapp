var args = arguments[0] || {};

exports.openWin=function(TabWin){
	
	TabWin.open($.win);
};
$.Rtnhome.addEventListener('click',function(){
	
	Alloy.Globals.TabWin.setActiveTab(0);
	$.win.close();
	
});

