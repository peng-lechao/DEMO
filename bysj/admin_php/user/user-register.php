<?php
	require 'header.php';
	$userName = $_POST['userName'];
	$password = password_hash($_POST['password'],PASSWORD_DEFAULT);
	$phone    = $_POST['phone'];
	$email    = $_POST['email'];
	$question = $_POST['question'];
	$answer   = $_POST['answer'];
	$userInfo = array(
		'userName' => $userName,
		'password' => $password, 
		'phone'    => $phone,
		'email'    => $email,
		'question' => $question,
		'answer'   => $answer
	);
	$user = new USER();
	$result = $user->userRegister($userInfo);
	echo json_encode($result);	
?>