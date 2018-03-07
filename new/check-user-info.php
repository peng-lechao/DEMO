<?php
	require 'user-class.php';
	session_start();
	if(isset($_POST['userName'])){
		$userName = $_POST['userName'];
	}
	else{
		$userName = $_SESSION['userName'];
	}
	$type = $_POST['type'];
	if($type == 'password'){
		$typeData = md5($_POST['typeData']);
	}
	else {
		$typeData = $_POST['typeData'];
	}
	$userInfo = array(
		'userName'=>$userName,
		'type'    =>$type,
		'typeData'=>$typeData
	);
	$user = new USER();
	$result = $user->checkUserInfo($userInfo);
	echo json_encode($result);
?>