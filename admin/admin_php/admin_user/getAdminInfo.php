<?php
	require 'header.php';
	$admin = new ADMIN();
	$result = $admin->getAdminInfo();
	echo json_encode($result);
?>