<?php
$thisSession = session_start();
$_SESSION = array();
$_SESSION['codepass'] = false;
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
	</div>
	<div data-role="content" data-theme="f">
		<p>Thank you for using 311Servic.es. Please complete these items to make your request:</p>
		<ol>
			<li>Enter Two Words</li>
			<li>Choose Request Type</li>
			<li>Find Your Location</li>
			<li>Give Us The Details</li>
			<li>Enter Your Contact Information For Follow-Up (Optional)</li>
		</ol>
		<p class="error">Please note that this BETA version only accepts requests within Chicago's 49th Ward boundary.</p>
		<a href="entercode.php" data-role="button" rel="external">Begin</a>
		<h6><a href="about.php">&copy;Tom Kompare</a></h6>
		<img src="i/license.png" alt="Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License."/>
	</div>
</div>
<script type="text/javascript">
alert('This web site is still under development! Your request will not be sent at this time.');
</script>
</body>
</html>
