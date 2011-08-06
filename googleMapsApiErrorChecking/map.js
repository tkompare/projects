function loadMap()
{
	/*
	 * If the user's browser understands how to try to get location information...
	 */
	if(navigator.geolocation)
	{
		/*
		 * Try to get the latest geolocation data from the user's device
		 */
		navigator.geolocation.getCurrentPosition
		(
			/*
			 * If the device returns a position...
			 */
			function(Position)
			{
				/*
				 * Make the map
				 */
				var TheMap = new google.maps.Map
				(
					/*
					 * Put the map in the correct element in the DOM
					 */
					document.getElementById('theMap'),
					{
						/*
						 * Make the map a road map
						 */
						mapTypeId: google.maps.MapTypeId.ROADMAP,
						/*
						 * Don't show map controls that we don't want
						 * to appear. This web site is for small screen
						 * devices; mostly mobile phones. Don't clutter
						 * the screen.
						 */
						mapTypeControl: false,
						streetViewControl: false,
						panControl: false,
						/*
						 * Zoom level 14 seems like a good generic start level.
						 */
						zoom: 14,
						/* 
						 * Zoom control buttons needed for all (some?) Android
						 * devices as they don't do un/pinch for un/zooming.
						 * For consistancy through all devices, let's just
						 * show them on all devices.
						 */
						zoomControl: true,
						zoomControlOptions: { style: google.maps.ZoomControlStyle.SMALL }
					}
				);
				/*
				 * Create the location object
				 */
				var MyLocation = new google.maps.LatLng(Position.coords.latitude,Position.coords.longitude);
				/*
				 * Center the map on the user's location
				 */
				TheMap.setCenter(MyLocation);
				/*
				 * Create the user's marker and put it on the map
				 */
				var MarkerYou = new google.maps.Marker
				(
					{
						position: MyLocation, 
						map: TheMap, 
						title: 'You are here.',
						visible: true
					}
				);
				/*
				 * Bounce the marker on the map. Super cheesey.
				 */
				MarkerYou.setAnimation(google.maps.Animation.BOUNCE);
				/*
				 * Make the marker information window pop-up
				 */
				var InfoWindowYou = new google.maps.InfoWindow
				(
					{
						content: 'You are here'
					}
				);
				/*
				 * Listen for the user's click on the marker to show the pop-up
				 */
				google.maps.event.addListener
				(
					MarkerYou,
					'click',
					function()
					{
						infowindowYou.open(TheMap,MarkerYou);
					}
				);
				// Watch the user's device GPS for new location.
				var Watcher = navigator.geolocation.watchPosition
				(
					/*
					 * When a new positon is returned to the browser...
					 */
					function(NewPosition)
					{
						/*
						 * Move the marker to the new location.
						 */
						MyLocation = new google.maps.LatLng(NewPosition.coords.latitude,NewPosition.coords.longitude);
						MarkerYou.setPosition(MyLocation);
					}, 
					/*
					 * Do nothing on watch position failure; just keep
					 * listenting for a new location.
					 */
					function() {}, 
					/*
					 * Set a few defaults.
					 * enableHighAccuracy allows the location to have
					 * better accuracy on devices that have it. No
					 * harm if the device does not.
					 */
					{
						enableHighAccuracy:true,
						maximumAge:30000,
						timeout:27000
					}
				);
				/*
				 * Listen for the map page to be closed and stop listenting
				 * to the user's device location service.
				 */
				$('#map').live('pagebeforehide', function(event,ui)
					{
						navigator.geolocation.clearWatch(Watcher);
						Watcher = false;
					}
				);
			},
			/*
			 * Location Services returns an error.
			 */
			function(Error)
			{
				switch(Error.code) 
				{
					case Error.TIMEOUT:
						alert ('Location services have timed out.');
						break;
					case Error.POSITION_UNAVAILABLE:
						alert ('Location services is busy with another application on your device.');
						break;
					case Error.PERMISSION_DENIED:
						alert ("Your device denied location services to our web site. Check your device\'s location services settings.");
						break;
					default:
						alert ('Your device reported an unknown error. Sorry!');
						break;
				}
			}
		);
	}
	else
	{
		/*
		 * The browser does not understand geolocation
		 */
		alert('Your web browser is not capable of locating you.');
	}
}