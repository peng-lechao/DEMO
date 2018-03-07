<?php
	require 'header.php';
	$admin = new ADMIN();
	$result = $admin->checkLogin();
	echo json_encode($result);
?>