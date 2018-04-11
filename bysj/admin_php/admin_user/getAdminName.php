<?php
	require 'header.php';
	$admin = new ADMIN();
	if(isset($_SESSION['adminInfo'])) {
		$adminInfo = array(
			'adminName' => $_SESSION['adminInfo']['adminName'],
			'level' => $_SESSION['adminInfo']['level'],
		);
		$result = array(
			'status' => 10,
			'data'   => $adminInfo,
			'msg'    => '获取成功！'
		);
	}
	else {
		$result = array(
			'status' => 0,
			'msg'    => '获取失败！'
		);
	}
	echo json_encode($result);
?>