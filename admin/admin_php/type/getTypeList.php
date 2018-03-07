<?php
	require 'header.php';
	$type    = new TYPE();
	$result  = $type->getTypeList();
	echo json_encode($result);
?>