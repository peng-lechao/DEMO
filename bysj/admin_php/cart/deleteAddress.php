<?php
	require 'header.php';
	$cart = new Cart();
	$addressId = $_POST['addressId'];
	$result = $cart->deleteAddress($addressId);	
	echo json_encode($result);
?>