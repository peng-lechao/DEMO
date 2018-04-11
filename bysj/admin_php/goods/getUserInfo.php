<?php
	require 'header.php';
	$goods    = new GOODS();
	$result  = $goods->getUserInfo();
	echo json_encode($result);
?>