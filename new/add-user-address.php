<?php
	require 'user-class.php';
	$receiver = $_POST['receiver'];
	$phone    = $_POST['phone'];
	$province = $_POST['province'];
	$city     = $_POST['city'];
	$address  = $_POST['address'];
	$userInfo = array(
		'userName' => $_SESSION['userName'],
		'receiver' => $_POST['receiver'],
		'phone'    => $_POST['phone'],
		'province' => $_POST['province'],
		'city'     => $_POST['city'],
		'address'  => $_POST['address']
	);
	$user = new USER();
	$result = $user->addUserAddress($userInfo);
	echo json_encode($result);
?>