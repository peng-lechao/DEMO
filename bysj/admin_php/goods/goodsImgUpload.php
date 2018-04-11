<?php
	require 'header.php';
	$goods  = new GOODS();
	$goods_id = '';
	$name = $_FILES["file"]["name"];
	foreach ($_POST as $value) {
		$goods_id = $goods_id.$value;
	}
	if(isset($_GET['type'])) {
		$type = $_GET['type'];
		if($_GET['type'] === 'major') {
			$path = "D:\bysj\admin_php\image\\goods\\major\\".$goods_id.$_FILES["file"]["name"];
			$newPath = "/admin_php/image/goods/major/".$goods_id.$_FILES["file"]["name"];
		}
		if($_GET['type'] === 'others') {
			$path = "D:\bysj\admin_php\image\\goods\\others\\".$goods_id.$_FILES["file"]["name"];
			$newPath = "/admin_php/image/goods/others/".$goods_id.$_FILES["file"]["name"];
		}
		$goods->updateImg($goods_id,$type,$newPath,$name);
	}
	else {
		$path = "D:\bysj\admin_php\image\\goods\\major\\".$goods_id.$_FILES["file"]["name"];
		$newPath = "/admin_php/image/goods/major/".$goods_id.$_FILES["file"]["name"];	
	}	
	$path = iconv("UTF-8","gb2312",$path);
	move_uploaded_file($_FILES['file']["tmp_name"],$path);
?>