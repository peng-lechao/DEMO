<?php
	require 'header.php';
	if(isset($_POST['userName'])){
		$userName = $_POST['userName'];
	}
	else{
		$userName = $_SESSION['userName'];
	}
	$type = $_POST['type'];
	$typeData = $_POST['typeData'];
	$userInfo = array(
		'userName'=>$userName,
		'type'    =>$type,
		'typeData'=>$typeData
	);
	$user = new USER();
	$result = $user->checkUserInfo($userInfo);
	echo json_encode($result);
?>