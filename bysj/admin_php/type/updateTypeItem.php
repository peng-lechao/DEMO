<?php
	require 'header.php';
	$type    = new TYPE();
	$typeInfo = array(
		'name'   => $_POST['name'],
		'id'     => $_POST['id'],
		'isShow' => $_POST['isShow'],
		'sort'	 => $_POST['sort']
	);	
	$result  = $type->updateTypeItem($typeInfo);
	echo json_encode($result);
?>