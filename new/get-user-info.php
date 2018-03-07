<?php
	require 'user-class.php';
	$user = new USER();
	if(isset($_SESSION['userName'])){
		$userName = $_SESSION['userName'];
		$result = $user->getUserInfo($userName);
	}
	else {
		$result = array(
			'status' => 1,
			'msg'	 => '未登录，强制登录！'
		);
	}
	echo json_encode($result);
?>