<?php
	require 'header.php';
	$goods   = new GOODS();
	$goods_id      = $_POST['id'];
	$result  = $goods->getGoodsInfo($goods_id);
	echo json_encode($result);
?>