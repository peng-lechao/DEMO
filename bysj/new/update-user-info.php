<?php
	require 'user-class.php';
	$userName       = $_SESSION['userName'];
	$phone          = $_POST['phone'];
	$email          = $_POST['email'];
	$realname       = $_POST['realname'];
	$introduction   = $_POST['introduction'];
	$userInfo = array(
		'userName'       => $userName,
		'phone'          => $phone,
		'email'          => $email,
		'realname'       => $realname,
		'introduction'   => $introduction
	);

	$user = new USER();
	$result = $user->updateUserInfo($userInfo);
	echo json_encode($result);
?>