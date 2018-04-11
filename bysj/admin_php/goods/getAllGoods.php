<?php
	require 'header.php';
	$goods    = new GOODS();
	$result  = $goods->getAllGoods();
	echo json_encode($result);
?>