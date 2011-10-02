<?php
	session_start();
	if(( ! (isset($_SESSION) && $_SESSION['codepass'] == true)) || ! isset($_POST))
	{
		header("location:../index.php");
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
	<title>311 Servic.es</title>
</head>
<body style="height:100%">
<!-- The main page -->
<div id="index" class="page" data-role="page" data-theme="f">
	<div data-role="header" data-theme="f">
		<h2>311 Servic.es</h2>
		<a href="about.php" data-icon="info" class="ui-btn-right" data-iconpos="notext">About</a>
	</div>
	<div data-role="content" data-theme="f">
		<p>You've selected:<br /><?php echo(htmlspecialchars($_POST['address'])); ?></p>
		<p>We're sorry. This location is not within Chicago's 49th Ward. Please call <a href="tel:311">311</a> directly to submit your service request.</p>
		<h6>&copy;Tom Kompare</h6>
	</div>
</div>
</body>
</html>
