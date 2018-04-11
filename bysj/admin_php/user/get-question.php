<?php
	require 'header.php';
	$userName = $_POST['userName'];
	$user = new USER();
	$result = $user->getQuestion($userName);
	echo json_encode($result);
?>