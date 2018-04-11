<?php
	require 'header.php';
	$cart = new Cart();
	if(isset($_SESSION['userName'])){
		$user_id = $_SESSION['id'];
		$result = $cart->getOrderList($user_id);
	}
	else {
		$result = array(
			'status' => 1,
			'msg'	 => '未登录，强制登录！'
		);
	}		
	echo json_encode($result);
?>
