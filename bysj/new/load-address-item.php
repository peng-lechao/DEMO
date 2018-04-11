<?php
	require 'user-class.php';
	$addressId = $_POST['addressId'];
	$user = new USER();
	$result = $user->loadAddressItem($addressId);
	echo json_encode($result);
?>