<?php
	require 'user-class.php';
	$userInfo = array(
		'addressId' => $_POST['addressId'],
		'receiver'  => $_POST['receiver'],
		'phone'     => $_POST['phone'],
		'province'  => $_POST['province'],
		'city'      => $_POST['city'],
		'address'   => $_POST['address']
	); 
	$user = new USER();
	$result = $user->updateAddress($userInfo);
	echo json_encode($result);
?>