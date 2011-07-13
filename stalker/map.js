function loadMap()
{
	var browserSupportFlag =  new Boolean();
	if(navigator.geolocation)
	{
		var myOptions =
		{
			zoom: 14,
			mapTypeControl: false,
			streetViewControl: false,
			panControl: false,
			zoomControl: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		browserSupportFlag = true;
		navigator.geolocation.getCurrentPosition(function(position) {
			var map = new google.maps.Map(document.getElementById('theMap'), myOptions);
			var myLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
			map.setCenter(myLocation);
			// User's Location Marker
			var markerYou = new google.maps.Marker({
				position: myLocation, 
				map: map, 
				title: 'You are here.',
				visible: true
			});
			markerYou.setAnimation(google.maps.Animation.BOUNCE);
			var infowindowYou = new google.maps.InfoWindow({
				content: 'You are here'
			});
			google.maps.event.addListener(markerYou, 'click', function() {
				infowindowYou.open(map,markerYou);
			});
			var watcher = navigator.geolocation.watchPosition(function(newPosition) {
					myLocation = new google.maps.LatLng(newPosition.coords.latitude,newPosition.coords.longitude);
					markerYou.setPosition(myLocation);
			}, function() {}, {enableHighAccuracy:true, maximumAge:30000, timeout:27000});
			$('#map').live('pagebeforehide', function(event,ui){
				navigator.geolocation.clearWatch(watcher);
				watcher = false;
		});
		}, function() {
			handleNoGeolocation(browserSupportFlag);
		});
	}
	else
	{
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
			alert("Your browser does not support geolocation.");
		}
	}
}