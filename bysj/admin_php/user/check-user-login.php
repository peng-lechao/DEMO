<?php
	require 'header.php';
	$user = new USER();
	$result = $user->checkUserLogin();
	echo json_encode($result);
?>