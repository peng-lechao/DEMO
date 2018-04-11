<?php
	require 'header.php';
	$type    = new TYPE();
	$result  = $type->getFloorList();
	echo json_encode($result);
?>