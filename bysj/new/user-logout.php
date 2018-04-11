<?php
  session_start();
	unset($_SESSION['userName']);
	$array = array(
		'status' =>10,
		'msg'    =>'退出登录成功！'
 	);
 	echo json_encode($array);
?>