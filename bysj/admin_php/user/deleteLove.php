<?php
	require 'header.php';
	$user_id = $_SESSION['id'];
	$goods_id = $_POST['goods_id']; 
	$user = new USER();
	$loveInfo = array(
		'user_id'  => $_SESSION['id'],
		'goods_id' => $_POST['goods_id']
	);
	$result = $user->deleteLove($loveInfo);
	echo json_encode($result);
?>