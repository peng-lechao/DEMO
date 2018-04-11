<?php
	require 'header.php';
	$cart = new Cart();
	if(isset($_SESSION['userName'])){
		$order_id = $_POST['order_id'];
		$result = $cart->getOrder($order_id);
	}
	else {
		$result = array(
			'status' => 1,
			'msg'	 => '未登录，强制登录！'
		);
	}		
	echo json_encode($result);
?>
