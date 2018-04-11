<?php
	require 'header.php';
	$cart = new Cart();
	$result = array(
		'status' => 10,
		'data'   => $_SESSION['cartInfo'],
		'msg'    => '成功！'
	);
	echo json_encode($result);
?>