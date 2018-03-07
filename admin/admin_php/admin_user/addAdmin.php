<?php
	require 'header.php';
	$admin = new ADMIN();
	$adminInfo = array(
		'adminName' => $_POST['adminName'],
		'password'  => password_hash($_POST['password'],PASSWORD_DEFAULT),
		'date'      => date('y-m-d H:i:s',time()),
		'level'     => $_POST['level']
	);
	$result    = $admin->addAdmin($adminInfo);
	echo json_encode($result);
?>