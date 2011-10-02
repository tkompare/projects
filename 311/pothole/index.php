<?php
	session_start();
	if( ! ($_SESSION && $_SESSION['codepass'] == true))
	{
		header("location:../index.php");
		exit();
	}
	if ($_POST)
	{
		$_SESSION['service'] = 'pothole';
		$_SESSION['pothole']['number'] = $_POST['number'];
		$_SESSION['pothole']['direction'] = $_POST['direction'];
		$_SESSION['pothole']['name'] = $_POST['name'];
		$_SESSION['pothole']['suffix'] = $_POST['suffix'];
		header("location:describe.php");
		exit;
	}
?>
<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1 minimum-scale=1" />
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700' rel='stylesheet' type='text/css'>	<link rel="stylesheet" href="http://code.jquery.com/mobile/1.0b3/jquery.mobile-1.0b3.min.css" />
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.6.3.min.js"></script>
	<script type="text/javascript" src="http://code.jquery.com/mobile/1.0b3/jquery.mobile-1.0b3.min.js"></script>
	<link rel="stylesheet" href="../css/311services.css" />
	<title>311 Servic.es</title>
</head>
<body style="height:100%">
<!-- The pothole page -->
<div id="pothole" class="page" data-role="page" data-theme="f">
	<div id="pothole-header" data-role="header" data-theme="f">
		<h2>311 Servic.es</h2>
	</div>
	<div data-role="content" data-theme="f">
		<div data-role="navbar">
			<ul>
				<li><a href="#pothole-map">Find My Location</a></li>
			</ul>
		</div>
		<h3>Pothole Repair</h3>
		<div id="pothole-instructions" class="service-instructions">
			<p><em>If you believe the pothole is an immediate danger to pedestians or vehicles, please call <a href="tel:+1-312-744-5000">311</a> immediately.</em></p>
			<p>We need to know a few things:</p>
			<ol>
				<li>The Pothole Location</li>
				<li>Its shape and size</li>
				<li>Any other helpful comments</li>
			</ol>
			<p>Please stand near the pothole, but at a safe distance, and click on <em>Find My Location</em> above to start.</p>
		</div>
		<div id="pothole-address" class="address">
				<em>* required</em><br/>
				<form action="index.php" method="post" data-ajax="false">
					<div data-role="fieldcontain"><label for="number">*Address Number: <em>(ex: '123')</em></label><input id="number" type="text" name="number" maxlength="6" value="" /></div>
					<div data-role="fieldcontain"><label for="direction">*Direction: <em>(ex: 'W')</em></label><input id="direction" type="text" name="direction" maxlength="2" value="" /></div>
					<div data-role="fieldcontain"><label for="name">*Street Name: <em>(ex: 'Main')</em></label><input id="name" type="text" name="name" maxlength="30" value="" /></div>
					<div data-role="fieldcontain"><label for="suffix">Street Suffix: <em>(ex: 'St')</em></label><input id="suffix" type="text" name="suffix" maxlength="10" value="" /></div>
					<input type="submit" data-theme="f" value="Continue"/>
				</form>
		</div>
		<h6><a href="about.php">&copy;Tom Kompare</a></h6>
		<img src="../i/license.png" alt="Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License."/>
	</div>
</div>
<!-- The pothole page -->
<!-- The map page -->
<div id="pothole-map" class="page map-page" data-role="page" data-theme="f"> 
	<div id="pothole-map-header" data-role="header" data-theme="f">
		<h2>311 Servic.es</h2>
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
<!-- END the map page -->
</body>
<script src="https://maps-api-ssl.google.com/maps/api/js?sensor=true" type="text/javascript"></script>
<script src="../js/maps.google.polygon.containsLatLng.js" type="text/javascript"></script>
<script src="../js/311services.js" type="text/javascript"></script>
<script type="text/javascript">
$("#pothole-address").hide();
$('#pothole-map').live('pageshow', function(event, ui){
	loadMap('pothole','pothole-map-theMap');
});
</script>
</html>