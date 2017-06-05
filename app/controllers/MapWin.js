
//Define the textbox

 
//Define a button


 
//Define a map
var myMapView = Titanium.Map.createView({
top       : 0,
height   : Ti.Platform.displayCaps.platformHeight,      //Define the height of the map
mapType : Titanium.Map.STANDARD_TYPE,               //Map type that will be displayed
region : {                                                               // define the region that will be centered on the map
latitude : 20.06667,                                         //Define the latitude point of that region
longitude : 85.83333,                                       //Define the longitude point of that region
latitudeDelta : 0.5,                                          //North to South distance displayed in decimal degrees
longitudeDelta : 0.5                                         //East to West distance displayed in decimal degrees
},
animate : true,                                                        //Map region animated
regionFit : true,                                                       //Fits the  aspect ratio
userLocation : false                                                 //To display user location
});
 
//Map added to window
currentWin.add(myMapView);
 
//Event to show the location

  function CreateMap(){
  	var xhrLocationCode = Ti.Network.createHTTPClient();
xhrLocationCode.setTimeout(120000);
 
var requestUrl = "http://maps.google.com/maps/api/geocode/json?address=" + txtAddress.value.replace(' ', '+');
requestUrl += "&sensor=" + (Ti.Geolocation.locationServicesEnabled == true);
xhrLocationCode.open("GET", requestUrl);
 
//Define the content type
xhrLocationCode.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
 
//Send request
xhrLocationCode.send();
 
//If error occurs
xhrLocationCode.onerror = function(e) {
//TODO: code to handle error
};
 
//On Success
xhrLocationCode.onload = function(e) {
 
//Get the response
var response = JSON.parse(this.responseText);
 
//Check the response
if (response.status == 'OK' && response.results != undefined && response.results.length > 0) {
 
//Define annotation to show location
var objLocationAnnotation = Titanium.Map.createAnnotation({
latitude: response.results[0].geometry.location.lat,
longitude: response.results[0].geometry.location.lng,
title: txtAddress.value,
subtitle: 'My Place',
animate:true,
id: 1,
pincolor: Titanium.Map.ANNOTATION_GREEN
});
mapview.addAnnotation(objLocationAnnotation);
 
objLocationAnnotation = null;
}
response = null;
}; 


 


 




  }
 

