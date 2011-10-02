<?php
	session_start();
	if( ! ($_SESSION && $_SESSION['codepass'] == true))
	{
		header("location:../index.php");
		exit();
	}
	if ($_POST)
	{
		$_SESSION['pothole']['where'] = $_POST['where'];
		$_SESSION['pothole']['shape'] = $_POST['shape'];
		$_SESSION['pothole']['size'] = $_POST['size'];
		$_SESSION['pothole']['multiple'] = $_POST['multiple'];
		header("location:contact.php");
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
		<p>Please describe the pothole. If there is more than one, describe the largest pothole.</p>
		<form action="describe.php" method="post" data-ajax="false">
		<div data-role="fieldcontain">
			<fieldset data-role="controlgroup">
				<legend>Where is it?</legend>
				<label for="where-center">Center Lane</label>
				<input type="radio" name="where" id="where-center" checked="checked" value="Center Lane"/>
				<label for="where-curb-lane">Curb Lane</label>
				<input type="radio" name="where" id="where-curb-lane" value="Curb Lane"/>
				<label for="where-curb">On Curb</label>
				<input type="radio" name="where" id="where-curb" value="On Curb"/>
				<label for="where-crosswalk">In A Crosswalk</label>
				<input type="radio" name="where" id="where-crosswalk" value="In A Crosswalk"/>
			</fieldset>
		</div>
		<div data-role="fieldcontain">
			<label for="size">How big? (in feet, at its widest/longest)</label>
			<input type="range" name="size" id="size" value="3" min="1" max="10" />
		</div>
		<div data-role="fieldcontain">
			<fieldset data-role="controlgroup">
				<legend>What general shape?</legend>
				<label for="shape-round">Round</label>
				<input type="radio" name="shape" id="shape-round" checked="checked" value="Round"/>
				<label for="shape-oval">Oval</label>
				<input type="radio" name="shape" id="shape-oval" value="Oval"/>
				<label for="shape-linear">Line</label>
				<input type="radio" name="shape" id="shape-linear" value="Line"/>
			</fieldset>
		</div>
		<div data-role="fieldcontain">
			<label for="multiple">More than one pothole?</label>
			<select name="multiple" id="multiple" data-role="slider">
				<option value="No" selected="selected">No</option>
				<option value="Yes">Yes</option>
			</select>
		</div>
		<input type="submit" data-theme="f" value="Continue"/>
		</form>
		<h6>&copy;Tom Kompare</h6>
	</div>
</div>
<!-- The pothole page -->
</body>
</html>