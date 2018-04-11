<?php
  	session_start();
	unset($_SESSION['userName']);
	unset($_SESSION['id']);
	if(isset($_SESSION['orderInfo'])){
		unset($_SESSION['orderInfo']);
	}
	if(isset($_SESSION['cartInfo'])){
		unset($_SESSION['cartInfo']);
	}
	$array = array(
		'status' =>10,
		'msg'    =>'退出登录成功！'
 	);
 	echo json_encode($array);
?>