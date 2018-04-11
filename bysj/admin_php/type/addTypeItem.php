<?php
	require 'header.php';
	$type    = new TYPE();
	$typeInfo = array(
		'name'   => $_POST['name'],
		'p_id'   => $_POST['id'],
		'isShow' => $_POST['isShow'],
		'sort'	 => $_POST['sort']
	);
	$result  = $type->addTypeItem($typeInfo);
	echo json_encode($result);
?>