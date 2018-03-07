<?php
	require "user-class.php";
	$user = new USER();
	$result = $user->checkUserLogin();
	echo json_encode($result);
?>