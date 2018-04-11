<?php
require "../db.php";
session_start();
date_default_timezone_set('PRC'); 
class Cart {
	private $db;
	public function __construct() {
		$this->db = new DB('14237plc-bysj');
	}
	public function addCart($info) {
		$sql = "select * from cart where goods_id='{$info['goods_id']}' and user_id='{$info['id']}'";
		$result = $this->db->query($sql);
		if($result) {
			$sql = "update cart set goods_num = goods_num+{$info['goods_num']} where goods_id='{$info['goods_id']}' and user_id='{$info['id']}'";
			$res = $this->db->exec($sql);
		}
		else {
			$sql = "insert into cart values(null,'{$info['goods_id']}','{$info['goods_num']}','{$info['userName']}','{$info['id']}')";
			$res = $this->db->exec($sql);
		}
		if($res){
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
	public function getCartInfo($id) {
		$sql = "select * from goods a join cart b on a.goods_id = b.goods_id where user_id='{$id}'";
		$result = $this->db->query($sql);
		if($result!==false){
			$array = array(
				'status' => 10,
				'data'   => $result,
				'msg'    => '查询成功！'
			);
		}
		else {
			$array = array(
				'status' => 0,
				'msg'    => '查询失败！'
			);
		}		
		return $array;
	}
	public function deleteCart($deleteInfo) {
		$sql = "delete from cart where user_id='{$deleteInfo['id']}' and goods_id='{$deleteInfo['goods_id']}'";
		$result = $this->db->exec($sql);
		if($result) {
			$array = array(
				'status' => 10,
				'msg'    => '移除成功！'
			);			
		}
		else {
			$array = array(
				'status' => 0,
				'msg'    => '移除失败！'
			);	
		}
		return $array;		
	}
	public function updateCart($updateInfo) {
		$sql = "update cart set goods_num='{$updateInfo['goods_num']}' where user_id='{$updateInfo['id']}' and goods_id='{$updateInfo['goods_id']}'";
		$result = $this->db->exec($sql);
		if($result) {
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
	public function addOrders($orderInfo) {
		$orderId = date('Ymd') . str_pad(mt_rand(1, 99999), 5, '0', STR_PAD_LEFT);
		$lastDate = date('Y-m-d H:i:s',time());
		$sql = "insert into `order` values('$orderId','{$_SESSION['id']}','{$orderInfo['addressData']['receiver']}','{$orderInfo['addressData']['province']}','{$orderInfo['addressData']['city']}','{$orderInfo['addressData']['address']}','$lastDate','{$orderInfo['addressData']['total']}','{$orderInfo['addressData']['pay']}','{$orderInfo['addressData']['tips']}',default)";
		$result = $this->db->exec($sql);
		$data = $_SESSION['cartInfo'];
		$insertSql = 'insert into order_details values ';
		$deleteSql = "delete from cart where goods_id in(";
		forEach($data as $key => $value) {
			extract($value);
			$insertSql = $insertSql."(null,'$orderId','$goods_id','$count','$sum_price','{$_SESSION['id']}')," ;
			$deleteSql = $deleteSql."'$goods_id'"; 
		};
		$insertSql = substr($insertSql,0,strlen($insertSql)-1);
		$deleteSql = $deleteSql.") and user_id = '{$_SESSION['id']}'";
		$result = $this->db->exec($insertSql);
		if(isset($orderInfo['from'])){
			$result = $this->db->exec($deleteSql);
		}
		$array = array(
			'status' => 10,
			'data'   => $orderId,
			'msg'    => '提交成功！'
		);	
		return $array;			
	}
	public function getOrderList($user_id){
		$sql = "select * from `order` where user_id = '$user_id' ORDER BY `date` DESC";
		$data = $this->db->query($sql);
		if(count($data)!==0 && $data!==false) {
			$sql = "select * from `order_details` a join `goods` b on a.goods_id = b.goods_id where a.user_id = '$user_id'";
			$result = $this->db->query($sql);
			forEach($data as $key => $value) {
				$value['item'] =[];
				forEach($result as $index => $item) {
					if($value['order_id'] == $item['order_id']) {
						$value['item'][] = $item;
					}
				}
				$res[] = $value;
			}
			$array = array(
				'status' => 10,
				'data'   => $res,
				'msg'    => '成功！'
			);
		}
		else if($result === false) {
			$array = array(
				'status' => 0,
				'msg'    => '失败！'
			);				
		} 
		else {
			$array = array(
				'status' => 10,
				'msg'    => '成功！'
			);			
		}
		return $array;
	}
	public function getOrder($order_id) {
		$sql = "select * from `order` where order_id = '$order_id'";
		$res = $this->db->query($sql);
		$sql = "select * from `order_details` a join `goods` b on a.goods_id = b.goods_id where a.order_id='$order_id'";
		$result = $this->db->query($sql);
		$res[0]['item'] = $result;
		$array = array(
			'status' => 10,
			'data'   => $res,
			'msg'    => '成功！'
		);
		return $array;	
	} 
	public function cancelOrder($order_id) {
		$sql = "update `order` set status = '已关闭' where order_id = '$order_id'";
		$res = $this->db->exec($sql);
		$array = array(
			'status' => 10,
			'msg'    => '成功！'
		);
		return $array;			
	}
	public function deleteAddress($addressId) {
		$sql = "delete from `user_address` where addressId='$addressId'";
		$res = $this->db->exec($sql);
		$array = array(
			'status' => 10,
			'msg'    => '成功！'
		);
		return $array;		
	}
}