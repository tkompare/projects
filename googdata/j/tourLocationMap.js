// This function makes the map
function InitializeMap(idElement,renderType) {
	var initialLocation;
	var browserSupportFlag =  new Boolean();
	var idElements = idElement.split("-");
	var thisTour = idElements[1];
	var thisLocation = idElements[3];
	idElement = idElement + '-content';
	$.getJSON('http://tables.googlelabs.com/api/query?sql=SELECT * FROM 840293 WHERE fkTour = ' + thisTour + ' AND pkLocation = ' + thisLocation + ' LIMIT 1&jsonCallback=?', function(locData) {
		tlLatLng=new google.maps.LatLng(locData.table.rows[0][9],locData.table.rows[0][10]); // Tour Stop Location
		tlName=locData.table.rows[0][2]; // Tour Stop Location Name
		tlAddress=locData.table.rows[0][8]; // Tour Stop Street Address
		tlStopNum=locData.table.rows[0][1]; // Tour Stop Number
		var myOptions = {
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
		var theMap = new google.maps.Map(putMap, myOptions);
		// Try W3C Geolocation (Preferred)
		if(navigator.geolocation) {
			browserSupportFlag = true;
			navigator.geolocation.getCurrentPosition(function(position) {
				initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
				theMap.setCenter(tlLatLng);
				// User's Location
				var markerYou = new google.maps.Marker({
					icon: 'http://wsnet.uchicago.edu/prototype/googdata/i/here.png',
					position: initialLocation, 
					map: theMap, 
					title: 'You are here.',
					visible: true
				});
				var infowindowYou = new google.maps.InfoWindow({
					content: 'You are here'
				});
				google.maps.event.addListener(markerYou, 'click', function() {
					infowindowYou.open(theMap,markerYou);
				});
				// Tour Location
				var markerTL = new google.maps.Marker({
					icon: 'http://wsnet.uchicago.edu/prototype/googdata/i/' + tlStopNum + '.png',
					position: tlLatLng, 
					map: theMap, 
					title: tlName,
					visible: true
				});
				var InfoWindow = new google.maps.InfoWindow({
					content: tlName
				});
				google.maps.event.addListener(markerTL, 'click', function() {
					InfoWindow.open(theMap,markerTL);
				});
				// Start routing directions
				var directionDisplay;
				var directionsService = new google.maps.DirectionsService();
				var renderingOptions = {
					suppressMarkers: true,
					preserveViewport: true
				};
				directionsDisplay = new google.maps.DirectionsRenderer(renderingOptions);
				if (renderType == 'map') {
					directionsDisplay.setMap(theMap);
					var end = tlLatLng;
				} else {
					directionsDisplay.setPanel(document.getElementById(idElement));
					var end = tlAddress;
				}
				var start = initialLocation;
				var request = {
					origin: start, 
					destination: end,
					travelMode: google.maps.DirectionsTravelMode.WALKING
				};
				directionsService.route(request, function(result, status) {
					if (status == google.maps.DirectionsStatus.OK) {
						directionsDisplay.setDirections(result);
					}
				});
			// Even though the user's browser has geolocation hooks, It's not getting a location. 
			}, function() {
				handleNoGeolocation(browserSupportFlag);
			});
		// Browser does not support Geolocation
		} else {
			browserSupportFlag = false;
			handleNoGeolocation(browserSupportFlag);
		}
		// Alert an Error message and Show a map of the tour location
		function handleNoGeolocation(errorFlag) {
			if (errorFlag == true) {
				alert("Geolocation service failed.");
			} else {
				alert("Your browser does not support geolocation.");
			}
			initialLocation = tlLatLng;
			var markerTL = new google.maps.Marker({
				position: tlLatLng, 
				map: theMap, 
				title: tlName
			});
			var InfoWindow = new google.maps.InfoWindow({
				content: tlName
			});
			InfoWindow.open(theMap,markerTL);
			theMap.setCenter(initialLocation);
		}
	});
}
$('.mappage').live('pageshow',function(event, ui){
	InitializeMap($(this).attr("id"),'map');
});
$('.directionspage').live('pageshow',function(event, ui){
	InitializeMap($(this).attr("id"),'panel');
});