<?php
session_start();
$_SESSION['codepass'] = false;
require_once('recaptchalib.php');
if($_POST)
{
	/*
	 * reCAPTCHA keys for '311servic.es'
	 */
	$privatekey = "6LclpcgSAAAAALJ6LipdkPN5wP-K5mVTBsCbGyLk";
	$resp = recaptcha_check_answer ($privatekey,
	$_SERVER["REMOTE_ADDR"],
	$_POST["recaptcha_challenge_field"],
	$_POST["recaptcha_response_field"]);
	if ($resp->is_valid) {
		$_SESSION['codepass'] = true;
		header("location:service.php");
		exit();
	}
	header("location:entercode.php?error=true.php");
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
<div id="entercode" class="page" data-role="page" data-theme="f">
	<div data-role="header" data-theme="f">
		<h2>311 Servic.es</h2>
	</div>
	<div data-role="content" class="nopadding" data-theme="f">
		<?php if($_GET['error']) { ?>
			<p class="error padding">The words you entered were incorrect. Your 311 service request is important to us. Please try again.</p>
		<?php } ?>
		<form action="entercode.php" method="post" data-ajax="false">
			<div class="captcha">
				<script type="text/javascript" src="http://www.google.com/recaptcha/api/challenge?k=6LclpcgSAAAAAOK-l3LpffSAPCcl6Zx1UD2jOkDY"></script>
			</div>
			<input type="submit" data-theme="f" value="Submit Words"/>
		</form>
		<h6 class="padding">&copy;Tom Kompare</h6>
	</div>
</div>
</body>
</html>
