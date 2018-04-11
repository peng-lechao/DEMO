<?php
	require 'header.php';
	$goods   = new GOODS();
	$type    = $_POST['type'];
	$content = $_POST['content'];
	// if($type == 'id') {
	// 	$sql = "select * from user where id='$content'";
	// }
	// else {
	// 	$sql = "select * from goods where goods_name like '%$content%'";
	// }
	$sql = "select * from user where $type='$content'";
	$result = $goods->searchUserInfo($sql);
	echo json_encode($result);
?>