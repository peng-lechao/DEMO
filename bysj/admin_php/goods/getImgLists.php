<?php
	require 'header.php';
	$goods   = new GOODS();
	$goods_id      = $_POST['goods_id'];
	$result  = $goods->getImgLists($goods_id);
	echo json_encode($result);
?>