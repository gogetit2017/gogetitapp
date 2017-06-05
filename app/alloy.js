// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
//alert(Ti.Platform.displayCaps.platformWidth);
var ServiceUrl='http://letusgogetit.com/DesktopModules/GoGetIt/API/';
var handlerUrl='http://letusgogetit.com/handler/';
//var ServiceUrl='http://gogetit.com/DesktopModules/GoGetIt/API/';
//var handlerUrl='http://gogetit.com/handler/';

SetToken();

function SetToken(){
	//alert('setToken');
// Check if the device is running iOS 8 or later
if (Ti.Platform.name == "iPhone OS" && parseInt(Ti.Platform.version.split(".")[0]) >= 8) {
 
	// Wait for user settings to be registered before registering for push notifications
    Ti.App.iOS.addEventListener('usernotificationsettings', function registerForPush() {
 
        // Remove event listener once registered for push notifications
        Ti.App.iOS.removeEventListener('usernotificationsettings', registerForPush); 
 
        Ti.Network.registerForPushNotifications({
            success: deviceTokenSuccess,
            error: deviceTokenError,
            callback: receivePush
        });
    });
 
    // Register notification types to use
    Ti.App.iOS.registerUserNotificationSettings({
	    types: [
            Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT,
            Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND,
            Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE
        ]
    });
}
 
// For iOS 7 and earlier
else {
    Ti.Network.registerForPushNotifications({
        // Specifies which notifications to receive
        types: [
            Ti.Network.NOTIFICATION_TYPE_BADGE,
            Ti.Network.NOTIFICATION_TYPE_ALERT,
            Ti.Network.NOTIFICATION_TYPE_SOUND
        ],
        success: deviceTokenSuccess,
        error: deviceTokenError,
        callback: receivePush
    });
}
// Process incoming push notifications
function receivePush(e) {
    //alert('Received push: ' + JSON.stringify(e));
}

function deviceTokenSuccess(e) {
   
  //alert(e.deviceToken);
   Alloy.Globals.DeviceToken=e.deviceToken;
				
}
function deviceTokenError(e) {
    alert('Failed to register for push notifications! ' + e.error);
}
}


Alloy.Globals.PreviosWin=[];
