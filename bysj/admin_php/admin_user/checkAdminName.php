<?php
	require 'header.php';
	$admin = new ADMIN();
	$adminName = $_POST['adminName'];
	$result    = $admin->checkAdminName($adminName);
	echo json_encode($result);
?>