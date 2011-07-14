function loadMap()
{
	var browserSupportFlag =  new Boolean();
	if(navigator.geolocation)
	{
		browserSupportFlag = true;
		// Get your the latest geolocation data from the user's device
		navigator.geolocation.getCurrentPosition(function(position) {
			// Make the map
			var map = new google.maps.Map(document.getElementById('theMap'), {
				zoom: 14,
				mapTypeControl: false,
				streetViewControl: false,
				panControl: false,
				zoomControl: false,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			});
			// Create the Google Maps API location object
			var myLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
			// Tell the map to center on the user's location
			map.setCenter(myLocation);
			// Make the user's marker object and put it on the map
			var markerYou = new google.maps.Marker({
				position: myLocation, 
				map: map, 
				title: 'You are here.',
				visible: true
			});
			// Bounce the marker on the map
			markerYou.setAnimation(google.maps.Animation.BOUNCE);
			// Make the marker information pop-up
			var infowindowYou = new google.maps.InfoWindow({
				content: 'You are here'
			});
			// Listen for the user's click on the marker to show the pop-up
			google.maps.event.addListener(markerYou, 'click', function() {
				infowindowYou.open(map,markerYou);
			});
			// Watch the user's device GPS for new location.
			var watcher = navigator.geolocation.watchPosition(function(newPosition) {
					// Each time a new location is registered, move the marker.
					myLocation = new google.maps.LatLng(newPosition.coords.latitude,newPosition.coords.longitude);
					markerYou.setPosition(myLocation);
			}, function() {}, {enableHighAccuracy:true, maximumAge:30000, timeout:27000});
			// Listen for the map page to be closed and stop listenting to the user's device GPS
			$('#map').live('pagebeforehide', function(event,ui){
				navigator.geolocation.clearWatch(watcher);
				watcher = false;
			});
		}, function() {
			// If the device has a GPS, but still can't be located...
			handleNoGeolocation(browserSupportFlag);
		});
	}
	else
	{
		// If the device does not have GPS...
		browserSupportFlag = false;
		handleNoGeolocation(browserSupportFlag);
	}
	function handleNoGeolocation(errorFlag)
	{
		if (errorFlag == true)
		{
			alert("Geolocation service failed.");
		}
		else
		{
			alert("Your device does not support geolocation.");
		}
	}
}