<?php
	require 'header.php';
	$admin = new ADMIN();
	$adminId = $_POST['adminId'];
	$result    = $admin->deleteAdmin($adminId);
	echo json_encode($result);
?>