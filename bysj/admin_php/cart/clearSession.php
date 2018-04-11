<?php
	require 'header.php';
	$cart = new Cart();
	unset($_SESSION['cartInfo']);
	$result = array(
		'status' => 10,
		'msg'    => '成功！'
	);	
	echo json_encode($result);
?>