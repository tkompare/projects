<?php
	session_start();
	if( ! ($_SESSION && $_SESSION['codepass'] == true))
	{
		header("location:../index.php");
		exit();
	}
	var_dump($_SESSION['pothole']);
	exit();
?>