<?php
	require 'header.php';
	$cart = new Cart();
	$order_id = $_POST['order_id'];
	$result = $cart->cancelOrder($order_id);
	echo json_encode($result);
?>