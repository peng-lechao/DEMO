<?php
	require 'header.php';
	$cart = new Cart();
	$data = json_decode($_POST['data'],true);
	$_SESSION['cartInfo'] = $data;
	$result = array(
		'status' => 10,
		'msg'    => '成功！'
	);
	echo json_encode($result);
?>