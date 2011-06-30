var T1L1_initialLocation;
var T1L1_browserSupportFlag =  new Boolean();
// Tour Location Array
var T1L1_Locations=new Array();
// Tour 1 Location 1
T1L1_Locations[1]=new Array();
//T1L1_Locations[1][0]=new google.maps.LatLng(41.79407, -87.60188);
//T1L1_Locations[1][1]='Ratner Building';
//T1L1_Locations[1][2]='<a href="index.html#t1-l1" data-transition="slide" target="_self">Ratner Building</a>';
//T1L1_Locations[1][3]='5530 South Ellis Avenue, Chicago IL 60637';
// This function refreshes the map
function T1L1_InitializeMap(idElement,renderType) {
	var idElements = idElement.split("-");
	var thisTour = idElements[1];
	var thisLocation = idElements[3];
	idElement = idElement + '-content';
	$.getJSON('http://tables.googlelabs.com/api/query?sql=SELECT * FROM 829392 WHERE fkTour = ' + thisTour + ' AND pkLocation = ' + thisLocation + '&jsonCallback=?', function(locData) {
		T1L1_Locations[1][0]=new google.maps.LatLng(locData.table.rows[0][9],locData.table.rows[0][10]); // Tour Stop Location
		T1L1_Locations[1][1]=locData.table.rows[0][2]; // Tour Stop Location Name
		T1L1_Locations[1][2]=locData.table.rows[0][2]; // Tour Stop Location Name
		T1L1_Locations[1][3]=locData.table.rows[0][8]; // Street Address
	});
	var T1L1_myOptions = {
		zoom: 15,
		mapTypeControl: false,
		streetViewControl: false,
		panControl: false,
		zoomControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var putMap;
	if (renderType == 'map') {
		putMap = document.getElementById(idElement);
	} else {
		putMap = document.getElementById(idElement+'-novis');
	}
	var T1L1_map = new google.maps.Map(putMap, T1L1_myOptions);
	// Try W3C Geolocation (Preferred)
	if(navigator.geolocation) {
		T1L1_browserSupportFlag = true;
		navigator.geolocation.getCurrentPosition(function(position) {
			T1L1_initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
			T1L1_map.setCenter(T1L1_initialLocation);
			// User's Location
			var T1L1_markerYou = new google.maps.Marker({
				//icon: './i/here.png',
				position: T1L1_initialLocation, 
				map: T1L1_map, 
				title: 'You are here.'
			});
			var T1L1_infowindowYou = new google.maps.InfoWindow({
				content: 'You are here'
			});
			google.maps.event.addListener(T1L1_markerYou, 'click', function() {
				T1L1_infowindowYou.open(T1L1_map,T1L1_markerYou);
			});
			// Tour1 Location1
			var T1L1_marker = new google.maps.Marker({
				//icon: './i/1.png',
				position: T1L1_Locations[1][0], 
				map: T1L1_map, 
				title: T1L1_Locations[1][1]
			});
			var T1L1_InfoWindow = new google.maps.InfoWindow({
				content: T1L1_Locations[1][2]
			});
			google.maps.event.addListener(T1L1_marker, 'click', function() {
				T1L1_InfoWindow.open(T1L1_map,T1L1_marker);
			});
			var T1L1_directionDisplay;
			var T1L1_directionsService = new google.maps.DirectionsService();
			var T1L1_renderingOptions = {
				suppressMarkers: true,
				preserveViewport: true
			};
			T1L1_directionsDisplay = new google.maps.DirectionsRenderer(T1L1_renderingOptions);
			if (renderType == 'map') {
				T1L1_directionsDisplay.setMap(T1L1_map);
				var T1L1_end = T1L1_Locations[1][0];
			} else {
				T1L1_directionsDisplay.setPanel(document.getElementById(idElement));
				var T1L1_end = T1L1_Locations[1][3];
			}
			var T1L1_start = T1L1_initialLocation;
			var T1L1_request = {
				origin: T1L1_start, 
				destination: T1L1_end,
				travelMode: google.maps.DirectionsTravelMode.WALKING
			};
			T1L1_directionsService.route(T1L1_request, function(T1L1_result, T1L1_status) {
				if (T1L1_status == google.maps.DirectionsStatus.OK) {
					T1L1_directionsDisplay.setDirections(T1L1_result);
				}
			});
		}, function() {
			T1L1_handleNoGeolocation(T1L1_browserSupportFlag);
		});
		T1L1_map.setCenter(T1L1_initialLocation);
	// Browser doesn't support Geolocation
	} else {
		T1L1_browserSupportFlag = false;
		T1L1_handleNoGeolocation(T1L1_browserSupportFlag);
	}
	function T1L1_handleNoGeolocation(T1L1_errorFlag) {
		if (T1L1_errorFlag == true) {
			alert("Geolocation service failed.");
			T1L1_initialLocation = T1L1_Locations[1][0];
			var T1L1_marker = new google.maps.Marker({
				position: T1L1_Locations[1][0], 
				map: T1L1_map, 
				title: T1L1_Locations[1][1]
			});
			var T1L1_InfoWindow = new google.maps.InfoWindow({
				content: T1L1_Locations[1][2]
			});
			T1L1_InfoWindow.open(T1L1_map,T1L1_marker);
		} else {
			alert("Your browser doesn't support geolocation.");
			T1L1_initialLocation = T1L1_Locations[1][0];
			var T1L1_marker = new google.maps.Marker({
				position: T1L1_Locations[1][0], 
				map: T1L1_map, 
				title: T1L1_Locations[1][1]
			});
			var T1L1_InfoWindow = new google.maps.InfoWindow({
				content: T1L1_Locations[1][2]
			});
			T1L1_InfoWindow.open(T1L1_map,T1L1_marker);
		}
		T1L1_map.setCenter(T1L1_initialLocation);
	}
}
/*
$('#t1-l1-map').live('pageshow',function(event, ui){
	T1L1_InitializeMap('t1-l1-map-content','map');
});
$('#t1-l1-directions').live('pageshow',function(event, ui){
	T1L1_InitializeMap('t1-l1-directions-content','panel');
});
*/
$('.mappage').live('pageshow',function(event, ui){
	T1L1_InitializeMap($(this).attr("id"),'map');
});
$('.directionspage').live('pageshow',function(event, ui){
	T1L1_InitializeMap($(this).attr("id"),'panel');
});