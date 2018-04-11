<?php
	require 'header.php';
	$type     = new TYPE();
	$id = $_POST['id'];
	$result  = $type->deleteType($id);
	echo json_encode($result);
?>