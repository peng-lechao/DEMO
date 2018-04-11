<?php
	require 'header.php';
	$cart = new Cart();
	$id = $_SESSION['id'];
	$result = $cart->getCartInfo($id);
	echo json_encode($result);
?>