<?php
	session_start();
	if( ! (isset($_SESSION['codepass']) && $_SESSION['codepass'] == true))
	{
		header("location:../index.php");
		exit();
	}
	$body = 'Someone has requested a 311 service.

Type: POTHOLE REPAIR

Address: '.$_SESSION['pothole']['number'].' '.$_SESSION['pothole']['direction'].' '.$_SESSION['pothole']['name'].' '.$_SESSION['pothole']['suffix'].'

Location: '.$_SESSION['pothole']['where'].'

Shape: '.$_SESSION['pothole']['shape'].'

Size: '.$_SESSION['pothole']['size'].' feet

More than one? '.$_SESSION['pothole']['multiple'].'

Comment: '.$_SESSION['pothole']['comment'].'

Contact Information

First Name: '.$_SESSION['pothole']['firstname'].'

Last Name: '.$_SESSION['pothole']['lastname'].'

Email: '.$_SESSION['pothole']['email'].'

Daytime Phone: '.$_SESSION['pothole']['dayphone'].'


Cheers,
http://311servic.es/';
	$headers = 'From: noreply@311servic.es' . "\r\n" .
    'Reply-To: noreply@311.servic.es' . "\r\n" .
    'X-Mailer: 311Servic.es Web Application';
	mail('tom@kompare.us', '311 Service Request', $body, $headers);
	session_unset();
	session_destroy();
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
<!-- The main page -->
<div id="index" class="page" data-role="page" data-theme="f">
	<div data-role="header" data-theme="f">
		<h2>311 Servic.es</h2>
	</div>
	<div data-role="content" data-theme="f">
		<p>The entire City of Chicago thanks you for submitting this request for services. You are the eyes and ears of its neighborhoods. If you filled in contact information, you may be contacted by the City for follow-up.</p>
		<p>Thank you for using 311 Servic.es.</p>
		<h6><a href="../about.php">&copy;Tom Kompare</a></h6>
		<img src="../i/license.png" alt="Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License."/>
	</div>
</div>
</body>
</html>