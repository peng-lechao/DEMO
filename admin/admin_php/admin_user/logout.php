<?php
	require 'header.php';
	$admin = new ADMIN();
	unset($_SESSION['adminInfo']);
	$result = array(
		'status' => 10,
		'msg'    => '退出成功！'
	);
	echo json_encode($result);
?>