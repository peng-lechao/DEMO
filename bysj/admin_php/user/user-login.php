<?php
	require 'header.php';
	$userName = $_POST['userName'];
	$password = $_POST['password'];
	$user = new USER();
	$result = $user ->userLogin($userName,$password);
	echo json_encode($result);
?>