<?php
	require 'header.php';
	$cart = new Cart();
	$info = array(
		'id'        => $_SESSION['id'],
		'userName'  => $_SESSION['userName'],
		'goods_id'  => $_POST['goods_id'],
		'goods_num' => $_POST['goods_num'],
	);
	$result = $cart->addCart($info);
	echo json_encode($result);
?>