<?php
	require 'header.php';
	$admin = new ADMIN();
	$type  = $_GET['type'];
	$level = $_SESSION['adminInfo']['level'];
	if($type == 'super') {	
		if($level == '3') {
			$result = array(
				'status' => 10,
				'msg'    => '管理员可操作！'
			);
		}
		else {
			$result = array(
				'status' => 0,
				'msg'    => '权限不足！无法操作！'
			);
		}
	}
	else if($type == 'normal') {
		if($level == '2') {
			$result = array(
				'status' => 10,
				'msg'    => '管理员可操作！'
			);
		}
		else {
			$result = array(
				'status' => 0,
				'msg'    => '权限不足！无法操作！'
			);
		}
	}
	echo json_encode($result);
?>