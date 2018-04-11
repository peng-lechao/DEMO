<?php
require "../db.php";
class GOODS {
	private $db;
	public function __construct() {
		$this->db = new DB('14237plc-bysj');
	}
	public function getAllGoods(){
		$sql = "select * from goods";
		$goodsData = $this->db->query($sql);
		$sql = "select * from goods_image";
		$imageData = $this->db->query($sql);
		$sql = "select * from goods_category";
		$typeData = $this->db->query($sql);
		$result = [];
		foreach ($goodsData as $key => $value) {
			$value['img'] = array();
			foreach ($imageData as $index => $val) {
				if($value['goods_id'] === $val['goods_id']){
					$value['img'][] = array('goods_id' => $val['goods_id'],'url' => $val['url'],'name' => $val['name'],'id' => $val['id']);		
				}
			}
			$result[] = $value;
		}
		$goodsData = $result;
		$result = [];
		foreach ($goodsData as $key => $value) {
			$value['category'] = array();
			foreach ($typeData as $index => $val) {
				if($value['cat_id'] === $val['id']){
					$value['category'][] = array('id'=>$val['id'],'name'=>$val['name'],'p_id'=>$val['p_id']);
					$i = $val['p_id'];	
					while($i != 0){
						$par = $this->parent($val['p_id'],$typeData);
						$value['category'][] = $par;
						$i = $par['p_id'];
					}			
				}
			}
			$result[] = $value;
		}
		$array = array(
			'status' => 10,
			'data'   => $result,
			'msg'    => '获取商品信息成功！'
		);
		return  $array;
	}
	public function parent($id,$data) {
		foreach ($data as $key => $value) {
			if($value['id'] === $id){
				$arr = array('id'=>$value['id'],'name'=>$value['name'],'p_id'=>$value['p_id']);
				return $arr;
			}
		}
	}
	public function updateImg($goods_id,$type,$newPath,$name) {
		if($type === 'major') {
			$sql = "update goods set original_img='{$newPath}',img_name='{$name}' where goods_id={$goods_id}";
			$result = $this->db->exec($sql);
		}
		if($type === 'others') {
			$sql = "insert into goods_image values(null,'{$goods_id}','{$newPath}','{$name}')";
			$result = $this->db->exec($sql);
		}
		if($result){
			$array = array(
				'status' => 10,
				'msg'    => '新增成功！'
			);
		}
		else {
			$array = array(
				'status' => 0,
				'msg'    => '新增失败！'
			);
		}
		return $array;		
	}
	public function getImgLists($goods_id) {
			$sql = "select * from goods_image where goods_id='{$goods_id}'";
			$data = $this->db->query($sql);
			$array = array(
				'status' => 10,
				'data'   => $data,
				'msg'    => '查询成功！'
			);	
			return $array;		
	}
	public function deleteImg ($id) {
		$sql = "delete from goods_image where id='{$id}'";
		$result = $this->db->exec($sql);
		if($result){
			$array = array(
				'status' => 10,
				'msg'    => '删除成功！'
			);
		}
		else {
			$array = array(
				'status' => 0,
				'msg'    => '删除失败！'
			);
		}
		return $array;	
	}
	public function deleteGoods ($goods_id) {
		$sql = "delete from goods where goods_id='{$goods_id}'";
		$result = $this->db->exec($sql);
		if($result){
			$array = array(
				'status' => 10,
				'msg'    => '删除成功！'
			);
		}
		else {
			$array = array(
				'status' => 0,
				'msg'    => '删除失败！'
			);
		}
		return $array;		
	}
	public function updateGoods($formData) {
		$sql = "update goods set goods_name='{$formData['goods_name']}',cat_id='{$formData['cat_id']}',store_count='{$formData['store_count']}',weight='{$formData['weight']}',market_price='{$formData['market_price']}',shop_price='{$formData['shop_price']}',goods_desc='{$formData['goods_desc']}',is_free_shipping='{$formData['is_free_shipping']}',is_hot='{$formData['is_hot']}',give_integral='{$formData['give_integral']}',is_on_sale='{$formData['is_on_sale']}' where goods_id ='{$formData['goods_id']}'";
		$result = $this->db->exec($sql);
		if($result){
			$array = array(
				'status' => 10,
				'msg'    => '更新成功！'
			);
		}
		else {
			$array = array(
				'status' => 0,
				'msg'    => '更新失败！'
			);
		}
		return $array;		
	}
	public function searchInfo($sql) {
		$data = $this->db->query($sql);
		$sql = "select * from goods_category";
		$catData = $this->db->query($sql);
		$result = [];
		foreach ($data as $key => $value) {
			$value['category'] = array();
			foreach ($catData as $index => $val) {
				if($value['cat_id'] === $val['id']){
					$value['category'][] = array('id'=>$val['id'],'name'=>$val['name'],'p_id'=>$val['p_id']);
					$i = $val['p_id'];	
					while($i != 0){
						$par = $this->parent($val['p_id'],$catData);
						$value['category'][] = $par;
						$i = $par['p_id'];
					}			
				}
			}
			$result[] = $value;
		}
		$array = array(
			'status' => 10,
			'data'   => $result,
			'msg'    => '查询成功！'
		);	
		return $array;
	}
	public function addGoods($formData) {
		$sql = "insert into goods (goods_id,cat_id,goods_name,store_count,weight,market_price,shop_price,goods_desc,is_free_shipping,is_hot,is_on_sale,give_integral,original_img,img_name) values('{$formData['goods_id']}','{$formData['cat_id']}','{$formData['goods_name']}','{$formData['store_count']}','{$formData['weight']}','{$formData['market_price']}','{$formData['shop_price']}','{$formData['goods_desc']}','{$formData['is_free_shipping']}','{$formData['is_hot']}','{$formData['is_on_sale']}','{$formData['give_integral']}','{$formData['original_img']}','{$formData['img_name']}')";
		$result = $this->db->exec($sql);
		if($result){
			$array = array(
				'status' => 10,
				'msg'    => '新增成功！'
			);
		}
		else {
			$array = array(
				'status' => 0,
				'msg'    => '新增失败！'
			);
		}
		return $array;	
	}
	public function checkGoodsId($goods_id) {
		$sql = "select * from goods where goods_id='{$goods_id}'";
		$result = $this->db->query($sql);
		$count  = count($result);
		if($count!=0) {
			$array = array(
				'status' => 0,
				'msg'    => '商品ID已存在！'
			);	
		}
		else {
			$array = array(
				'status' => 10,
				'msg'    => '商品ID可用！'
			);	
		}
		return $array;	
	}
	public function getUserInfo() {
		$sql = "select * from user";
		$sql2 = "select * from user_address";
		$userData = $this->db->query($sql);
		$address = $this->db->query($sql2);
		$result = [];
		forEach($userData as $key => $value) {
			$value['home'] = array();
			forEach($address as $index => $item) {
				if($value['userName'] == $item['userName']) {
					$value['home'][] = array('addressId'=>$item['addressId'],'receiver' => $item['receiver'],'phone'=>$item['phone'],'province'=>$item['province'],'city'=>$item['city'],'address'=>$item['address']);
				}	
			}
			$result[] = $value;
		}
		$userData = $result;
		$array = array(
			'status' => 10,
			'data'   => $userData,
			'msg'    => '获取用户信息成功！'
		);
		return  $array;
	}
	public function searchUserInfo($sql) {
		$userData = $this->db->query($sql);
		$sql = "select * from user_address";
		$address = $this->db->query($sql);
		$result = [];
		forEach($userData as $key => $value) {
			$value['home'] = array();
			forEach($address as $index => $item) {
				if($value['userName'] == $item['userName']) {
					$value['home'][] = array('addressId'=>$item['addressId'],'receiver' => $item['receiver'],'phone'=>$item['phone'],'province'=>$item['province'],'city'=>$item['city'],'address'=>$item['address']);
				}	
			}
			$result[] = $value;
		}
		$array = array(
			'status' => 10,
			'data'   => $result,
			'msg'    => '获取用户信息成功！'
		);
		return  $array;		
	}
	public function getGoodsInfo($goods_id) {
		$sql = "select * from goods where goods_id='{$goods_id}'";
		$goodsData = $this->db->query($sql);
		$sql = "select * from goods_image";
		$imageData = $this->db->query($sql);
		$sql = "select * from goods_category";
		$typeData = $this->db->query($sql);
		$result = [];
		foreach ($goodsData as $key => $value) {
			$value['img'] = array();
			foreach ($imageData as $index => $val) {
				if($value['goods_id'] === $val['goods_id']){
					$value['img'][] = array('goods_id' => $val['goods_id'],'url' => $val['url'],'name' => $val['name'],'id' => $val['id']);		
				}
			}
			$result[] = $value;
		}
		$goodsData = $result;
		$result = [];
		foreach ($goodsData as $key => $value) {
			$value['category'] = array();
			foreach ($typeData as $index => $val) {
				if($value['cat_id'] === $val['id']){
					$value['category'][] = array('id'=>$val['id'],'name'=>$val['name'],'p_id'=>$val['p_id']);
					$i = $val['p_id'];	
					while($i != 0){
						$par = $this->parent($val['p_id'],$typeData);
						$value['category'][] = $par;
						$i = $par['p_id'];
					}			
				}
			}
			$result[] = $value;
		}
		$array = array(
			'status' => 10,
			'data'   => $result,
			'msg'    => '获取商品信息成功！'
		);
		return  $array;
	}
	public function getItemGoods($id) {
		$sql = "select * from `goods` where cat_id='$id'";
		$result = $this->db->query($sql);
		if($result !== false) {
			$array = array(
				'status' => 10,
				'data'   => $result,
				'msg'    => '获取商品信息成功！'
			);			
		}
		else {
			$array = array(
				'status' => 0,
				'msg'    => '获取商品信息失败！'
			);			
		}
		return $array;
	}
	public function getTypeGoods($id) {
		$sql = "select * from `goods` where cat_id in (select id from `goods_category` where p_id='$id')";
		$result = $this->db->query($sql);
		if($result !== false) {
			$array = array(
				'status' => 10,
				'data'   => $result,
				'msg'    => '获取商品信息成功！'
			);			
		}
		else {
			$array = array(
				'status' => 0,
				'msg'    => '获取商品信息失败！'
			);			
		}
		return $array;
	}
	public function getSearchGoods($search) {
		$sql = "select * from `goods` where goods_name like '%$search%'";
		$result = $this->db->query($sql);
		if($result !== false) {
			$array = array(
				'status' => 10,
				'data'   => $result,
				'msg'    => '获取商品信息成功！'
			);			
		}
		else {
			$array = array(
				'status' => 0,
				'msg'    => '获取商品信息失败！'
			);			
		}
		return $array;
	}
}