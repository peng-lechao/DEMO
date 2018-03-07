<?php
	require 'user-class.php';
	$userName = $_POST['userName'];
	$password = md5($_POST['password']);
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