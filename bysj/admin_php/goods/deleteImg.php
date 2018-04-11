<?php
	require 'header.php';
	$goods   = new GOODS();
	$id      = $_POST['id'];
	$result  = $goods->deleteImg($id);
	echo json_encode($result);
?>