<?php
	session_start();
	if( ! ($_SESSION && $_SESSION['codepass'] == true))
	{
		header("location:../index.php");
		exit();
	}
	if ($_POST)
	{
		$_SESSION['pothole']['email'] = $_POST['email'];
		$_SESSION['pothole']['firstname'] = $_POST['firstname'];
		$_SESSION['pothole']['lastname'] = $_POST['lastname'];
		$_SESSION['pothole']['dayphone'] = $_POST['dayphone'];
		header("location:finish.php");
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
		<a href="../about.php" data-icon="info" class="ui-btn-right" data-iconpos="notext">About</a>
	</div>
	<div data-role="content" data-theme="f">
		<h3>Pothole Repair</h3>
		<p>Please leave your contact information in case we need to follow up with you on this request. Your contact information is optional.</p>
		<form action="contact.php" method="post" data-ajax="false">
			<div data-role="fieldcontain"><label for="email">Email Address: </label><input id="email" type="email" name="email" maxlength="254" value="" /></div>
			<div data-role="fieldcontain"><label for="firstname">First Name: </label><input id="firstname" type="text" name="firstname" maxlength="254" value="" /></div>
			<div data-role="fieldcontain"><label for="lastname">Last Name: </label><input id="lastname" type="text" name="lastname" maxlength="254" value="" /></div>
			<div data-role="fieldcontain"><label for="dayphone">Daytime Phone: </label><input id="dayphone" type="tel" name="dayphone" maxlength="254" value="" /></div>
			<input type="submit" data-theme="f" value="Submit Service Request"/>
		</form>
		<h6>&copy;Tom Kompare</h6>
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
<script src="../js/311services.js" type="text/javascript"></script>
<script src="https://maps-api-ssl.google.com/maps/api/js?sensor=true" type="text/javascript"></script>
<script type="text/javascript">
$("#pothole-address").hide();
$('#pothole-map').live('pageshow', function(event, ui){
	loadMap('pothole','pothole-map-theMap');
});
</script>
</html>