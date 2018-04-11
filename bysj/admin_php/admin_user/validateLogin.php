<?php
	require 'header.php';
	$admin = new ADMIN();
	$adminInfo = array(
		'adminName' => $_POST['adminName'],
		'password'  => $_POST['password']
	);
	$result = $admin->validateLogin($adminInfo);
	echo json_encode($result);
?>