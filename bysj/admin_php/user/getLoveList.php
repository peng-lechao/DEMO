<?php
	require 'header.php';
	$user = new USER();
	if(isset($_SESSION['id'])){
		$user_id = $_SESSION['id'];
		$result = $user->getLoveList($user_id);
	}
	else {
		$result = array(
			'status' => 1,
			'msg'	 => '未登录，强制登录！'
		);
	}
	echo json_encode($result);
?>