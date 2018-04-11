<?php
	require 'header.php';
	$goods   = new GOODS();
	$search  = $_POST['search'];
	$result  = $goods->getSearchGoods($search);
	echo json_encode($result);
?>