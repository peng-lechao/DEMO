<?php
	require 'header.php';
	$goods   = new GOODS();
	$type    = $_POST['type'];
	$content = $_POST['content'];
	if($type == 'goods_id') {
		$sql = "select * from goods where goods_id='$content'";
	}
	else {
		$sql = "select * from goods where goods_name like '%$content%'";
	}
	$result = $goods->searchInfo($sql);
	echo json_encode($result);
?>