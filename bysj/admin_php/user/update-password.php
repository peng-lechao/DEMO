<?php
	require 'header.php';
	if(isset($_POST['userName'])){
		$userName = $_POST['userName'];
	}
	else{
		$userName = $_SESSION['userName'];
	}
	$password = password_hash($_POST['password'],PASSWORD_DEFAULT);
	$userInfo = array(
		'userName' => $userName,
		'password' => $password
	);
	$user = new USER();
	$result = $user->updatePassword($userInfo);
	echo json_encode($result);
?>