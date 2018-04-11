<?php
	require 'header.php';
	$goods   = new GOODS();
	$cat_id = $_POST['selectedOptions'][count($_POST['selectedOptions'])-1];
	$img = $_POST['fileList'][0];
	$formData = array(
		'goods_id'           => $_POST['goods_id'],
		'goods_name'         => $_POST['goods_name'],
		'cat_id'             => $cat_id,
		'goods_desc'         => $_POST['goods_desc'],
		'store_count'        => $_POST['store_count'],
		'weight'             => $_POST['weight'],
		'market_price'       => $_POST['market_price'],
		'shop_price'         => $_POST['shop_price'],
		'give_integral'      => $_POST['give_integral'],
		'original_img'       => '/admin_php/image/goods/major/'.$_POST['goods_id'].$img['name'],
		'img_name'           => $img['name'],
		'is_hot'             => $_POST['is_hot'],
		'is_free_shipping'   => $_POST['is_free_shipping'],
		'is_on_sale'         => $_POST['is_on_sale']
	);
	$result  = $goods->addGoods($formData);
	echo json_encode($result);
?>