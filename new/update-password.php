<?php
	require 'user-class.php';
	if(isset($_POST['userName'])){
		$userName = $_POST['userName'];
	}
	else{
		$userName = $_SESSION['userName'];
	}
	$password = md5($_POST['password']);
	$userInfo = array(
		'userName' => $userName,
		'password' => $password
	);
	$user = new USER();
	$result = $user->updatePassword($userInfo);
	echo json_encode($result);
?>