<?php
	require 'user-class.php';
	if(isset($_SESSION['userName'])){
		$userName = $_SESSION['userName'];
		$user = new USER();
		$result = $user->getUserAddress($userName);
	}
	else {
		$result = array(
			'status' => 1,
			'msg'	 => '未登录，强制登录！'
		);
	}
	echo json_encode($result);
?>