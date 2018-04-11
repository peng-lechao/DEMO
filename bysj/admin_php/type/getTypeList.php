<?php
	require 'header.php';
	$type    = new TYPE();
	$item    = $_GET['type'];
	$result  = $type->getTypeList($item);
	echo json_encode($result);
?>