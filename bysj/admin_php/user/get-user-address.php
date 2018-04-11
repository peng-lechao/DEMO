<?php
	require 'header.php';
	$userName = $_SESSION['userName'];
	$id = $_SESSION['id'];
	$user = new USER();
	$result = $user->getUserAddress($id);
	echo json_encode($result);
?>