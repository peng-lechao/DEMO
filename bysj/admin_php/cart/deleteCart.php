<?php
	require 'header.php';
	$cart = new Cart();
	$info = array(
		'id'        => $_SESSION['id'],
		'goods_id'  => $_POST['goods_id']
	);
	$result = $cart->deleteCart($info);
	echo json_encode($result);
?>