<?php
session_start();
if( ! isset($_SESSION['codepass']))
{
	header("location:index.php");
	exit();
}
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
	header("location:entercode.php?error=true");
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
	<script type="text/javascript">var RecaptchaOptions = { lang:'en',};</script>
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
	<?php if ($_SESSION['codepass'] == true) { ?>
		<p class="padding">You already successfully entered two words. Cheers.</p>
	<?php } else { ?>
		<div data-role="navbar">
			<ul>
				<li><a href="javascript:Recaptcha.reload()">Too Hard</a></li>
				<li><a href="javascript:Recaptcha.switch_type('audio')">Audio</a></li>
				<li><a href="javascript:Recaptcha.switch_type('image')">Text</a></li>
				<li><a href="javascript:Recaptcha.showhelp()">Help</a></li>
			</ul>
		</div>
		<form action="entercode.php" method="post" data-ajax="false">
			<div class="captcha">
				<script type="text/javascript" src="http://www.google.com/recaptcha/api/challenge?k=6LclpcgSAAAAAOK-l3LpffSAPCcl6Zx1UD2jOkDY"></script>
			</div>
			<input type="submit" data-theme="f" value="Submit Words"/>
		</form>
	<?php } ?>
		<h6 class="padding"><a href="about.php">&copy;Tom Kompare</a></h6>
		<img class="padding" src="i/license.png" alt="Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License."/>
	</div>
</div>
<?php if($_GET['error']) { ?>
<script type="text/javascript">
	alert("The words you entered were incorrect. Your 311 service request is important to us. Please try again.");
</script>
<?php } ?>
</body>
</html>