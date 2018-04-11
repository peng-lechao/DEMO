<?php
	require 'header.php';
	$cart = new Cart();
	if(isset($_GET['from'])){
		$info = array(
			'id'          => $_SESSION['id'],
			'addressData' => $_POST,
			'from'        => 'cart'
		);		
	}
	else {
		$info = array(
			'id'          => $_SESSION['id'],
			'addressData' => $_POST
		);
	}
	$result = $cart->addOrders($info);
	echo json_encode($result);
?>