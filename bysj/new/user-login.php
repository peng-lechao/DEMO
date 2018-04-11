<?php
	require "user-class.php";
	$userName = $_POST['userName'];
	$password = md5($_POST['password']);
	$user = new USER();
	$result = $user ->userLogin($userName,$password);
	echo json_encode($result);
?>