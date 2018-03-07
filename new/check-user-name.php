<?php
	require 'user-class.php';
	$userName = $_POST['userName'];
	$user = new USER();
	$result = $user->checkUserName($userName);
	echo json_encode($result);
?>