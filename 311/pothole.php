<?php 
	session_start();
	if( ! ($_SESSION && $_SESSION['codepass'] == true))
	{
		header("location:index.php");
		exit();
	}
?>
<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1 minimum-scale=1" />
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700' rel='stylesheet' type='text/css'>	<link rel="stylesheet" href="http://code.jquery.com/mobile/1.0b3/jquery.mobile-1.0b3.min.css" />
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.6.3.min.js"></script>
	<script type="text/javascript" src="http://code.jquery.com/mobile/1.0b3/jquery.mobile-1.0b3.min.js"></script>
	<link rel="stylesheet" href="css/311services.css" />
	<title>311 Services</title>
</head>
<body style="height:100%">
<!-- The main page -->
<div id="pothole" class="page" data-role="page" data-theme="f">
	<div id="pothole-header" data-role="header" data-theme="f">
		<h2>Pothole Repair</h2>
	</div>
	<div data-role="content" data-theme="f">
		<a href="#pothole-map" data-role="button"><span id="location-button" class="location-button">Find My Location</span></a>
		<div id="pothole-address" class="address">
			<strong>Number:</strong> <span id="number"></span><br />
			<strong>Direction:</strong> <span id="direction"></span><br />
			<strong>Name:</strong> <span id="name"></span><br />
			<strong>Suffix:</strong> <span id="suffix"></span><br />
			<strong>City:</strong> <span id="city"></span><br />
			<strong>Postal Code:</strong> <span id="postalcode"></span><br />
		</div>
		<h6>&copy;Tom Kompare</h6>
	</div>
</div>
<!-- The map page -->
<div id="pothole-map" class="page map-page" data-role="page" data-theme="f"> 
	<div id="pothole-map-header" data-role="header" data-theme="f">
		<h2>Location of Pothole</h2>
	</div>
	<div id="pothole-map-theMap" class="map" data-role="content">
		<!-- The map goes here via loadMap() -->
	</div>
	<div id="pothole-map-footer" data-role="footer" data-position="fixed" data-theme="f">
		<div data-role="navbar">
			<ul>
				<li><a href="#pothole" data-direction="reverse">Use This Location</a></li>
			</ul>
		</div>
	</div>
</div>
</body>
<script src="js/311services.js" type="text/javascript"></script>
<script src="https://maps-api-ssl.google.com/maps/api/js?sensor=true" type="text/javascript"></script>
<script type="text/javascript">
$("#pothole-address").hide();
$('#pothole-map').live('pageshow', function(event, ui){
	loadMap('pothole','pothole-map-theMap');
});
</script>
</html>