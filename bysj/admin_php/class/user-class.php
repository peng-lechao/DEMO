<?php
require "../db.php";
session_start();
class USER {
	private $user;
	public function __construct() {
		$this->user = new DB('14237plc-bysj');
	}
	public function userLogin($userName,$password){
		$sql = "select * from `user` where userName='$userName'";
		$result = $this->user->query($sql);
		if(count($result)==1){
			if (password_verify($password, $result[0]['password'])) {
				$_SESSION['userName'] = $userName;
				$_SESSION['id'] = $result[0]['id'];
				$array = array(
					'status' => 10,
					'data'   => array('userName' => $userName), 
					'msg'    => '登录成功！' 
				);
			}
			else {
				$array = array(
						'status' => 0,
						'msg'    => '密码错误!' 
				);		
			}
		}
		else {
			$array = array(
				'status' => 0,
				'msg'    => '用户不存在!' 
			);			
		}
		return $array;
	}
	public function checkUserLogin() {
		if(isset($_SESSION['userName'])){
			$userName = $_SESSION['userName'];
			$id = $_SESSION['id'];
			$array = array(
				'status' => 10, 
				'data'   => array('userName' => $userName,'id' => $id),
				'msg'    => '已登录！'
			);
		}
		else {
			$array = array(
				"status" => 0,
				'msg'    => '未登录！'
			);
		}
		return $array;
	}
	public function userRegister($userInfo){
		$sql = "insert into user (userName,password,phone,email,question,answer) values ('".$userInfo['userName']."','".$userInfo['password']."','".$userInfo['phone']."','".$userInfo['email']."','".$userInfo['question']."','".$userInfo['answer']."')";
		$result = $this->user->exec($sql);
		if($result){
			$array = array(
				'status' => 10,
				'msg'    => '注册成功！'
			);
		}
		else {
			$array = array(
				'status' => 0,
				'msg'    => '注册失败！'
			);
		}
		return $array;
	}
	public function checkUserName($userName){
		$sql = "select count(*) from user where userName='$userName'";
		$result = $this->user->getRows($sql);
		if($result == 1){
			$array = array(
				'status' => 0,
				'msg'    => '用户名已被注册!' 
			);
		}
		else {
			$array = array(
				'status' => 10,
				'msg'    => '用户名可用!' 
			);
		}
		return $array;
	}
	public function getUserInfo($userName){
		$sql = "select * from user where userName='$userName'";
		$result = $this->user->query($sql);
		foreach($result as $row){
			extract($row);
			$data = $row;
		}
		$array = array(
			'status' => 10,
			'data'   => $data,
			'msg'    => '获取用信息成功！'
		);
		return $array;
	}
	public function updateUserInfo($userInfo){
		$sql = "update user set phone='".$userInfo['phone']."',email='".$userInfo['email']."',realname='".$userInfo['realname']."',introduction='".$userInfo['introduction']."' where userName='".$userInfo['userName']."'";
		$result = $this->user->exec($sql);
		if($result===false){
			$array = array(
				'status' => 0,
				'msg'    => '修改个人信息失败！'
			);
		}
		else {
			$array = array(
				'status' => 10,
				'msg'    => '修改个人信息成功！'
			);
			
		}
		return $array;
	}
	public function checkUserInfo($userInfo){
		$type     = $userInfo['type'];
		$typeData = $userInfo['typeData'];
		$userName = $userInfo['userName'];
		if($type == 'password') {
			$sql = "select * from `user` where userName='$userName'";
			$result = $this->user->query($sql);
			if (password_verify($typeData, $result[0]['password'])) {
				$array = array(
					'status' => 10,
					'msg'    => '验证成功!' 
				);			
			}
			else {
				$array = array(
					'status' => 0,
					'msg'    => '验证失败!' 
				);			
			}
		}
		else {
			$sql = "select count(*) from `user` where userName='$userName' and $type='$typeData'";
			$result = $this->user->getRows($sql);
			if($result == 1){
				$array = array(
					'status' => 10,
					'msg'    => '验证成功!' 
				);	
			}
			else {
				$array = array(
					'status' => 0,
					'msg'    => '验证失败!' 
				);
			}
		}
		return $array;
	}
	public function updatePassword($userInfo){
		$userName = $userInfo['userName'];
		$password = $userInfo['password'];
		$sql = "update user set password='$password' where userName='$userName'";
		$result = $this->user->exec($sql);
		if($result===false){
			$array = array(
				'status' => 0,
				'msg'    => '重置密码失败！'
			);
		}
		else {
			$array = array(
				'status' => 10,
				'msg'    => '重置密码成功！'
			);
			
		}
		return $array;
	}
	public function getQuestion($userName){
		$sql = "select question from user where userName='$userName'";
		$result = $this->user->query($sql);
		foreach ($result as $row) {
			extract($row);
			$data = $row;
		}
		if($result!=null){
			$array = array(
				'status' => 10,
				'data'   => $data,
				'msg'    => '获取成功！'
			);
		}
		else {
			$array = array(
				'status' => 0,
				'msg'    => '用户不存在！'
			);
		}
		return $array;
	}
	public function getUserAddress($id){
		$sql = "select * from `user_address` where user_id='$id'";
		$result = $this->user->query($sql);
		if($result!==false){
			$array = array(
				'status' => 10,
				'data'   => $result,
				'msg'    => '获取成功！'
			);			
		}
		else{
			$array = array(
					'status' => 0,
					'msg'    => '错误！'
			);				
		}
		return $array;
	}
	public function addUserAddress($userInfo){
		$sql = "insert into user_address (receiver,phone,province,city,address,userName,user_id) values ('{$userInfo['receiver']}','{$userInfo['phone']}','{$userInfo['province']}','{$userInfo['city']}','{$userInfo['address']}','{$userInfo['userName']}','{$userInfo['id']}')";
		$result = $this->user->exec($sql);
		if($result){
			$array = array(
				'status' => 10,
				'msg'    => '收货地址新增成功！'
			);
		}
		else {
			$array = array(
				'status' => 0,
				'msg'    => '收货地址新增失败！'
			);
		}
		return $array;
	}
	public function loadAddressItem($addressId){
		$sql = "select * from user_address where addressId='$addressId'";
		$result = $this->user->query($sql);
		foreach ($result as $row) {
			extract($row);
			$data = $row;
		}
		$array = array(
			'status' => 10,
			'data'   => $data,
			'msg'    => '获取成功！'
		);
		return $array;
	}
	public function updateAddress($userInfo){
		// $sql = "update user_address set receiver='".$userInfo['receiver']."',phone='".$userInfo['phone']."',province='".$userInfo['province']."',city='".$userInfo['city']."',address='".$userInfo['address']."' where addressId='".$userInfo['addressId']."'";
		$sql = "update user_address set receiver='{$userInfo['receiver']}',phone='{$userInfo['phone']}',province='{$userInfo['province']}',city='{$userInfo['city']}',address='{$userInfo['address']}' where addressId='{$userInfo['addressId']}'";
		$result = $this->user->exec($sql);
		if($result===false){
			$array = array(
				'status' => 0,
				'msg'    => '更新地址失败！'
			);
		}
		else {
			$array = array(
				'status' => 10,
				'msg'    => '更新地址成功！'
			);
			
		}
		return $array;
	}
	public function checkLove($loveInfo) {
		$sql = "select * from goods_love where goods_id='{$loveInfo['goods_id']}' and user_id='{$loveInfo['user_id']}'";
		$result = $this->user->query($sql);
		if($result) {
			$array = array(
				'status' => 10,
				'msg'    => '已收藏！' 
			);			
		}
		else {
			$array = array(
				'status' => 0,
				'msg'    => '未收藏！' 
			);			
		}
		return $array;
	}
	public function deleteLove($loveInfo) {
		$sql = "delete from goods_love where goods_id='{$loveInfo['goods_id']}' and user_id='{$loveInfo['user_id']}'";
		$result = $this->user->exec($sql);
		if($result!=0) {
			$array = array(
				'status' => 10,
				'msg'    => '取消成功！' 
			);			
		}
		else {
			$array = array(
				'status' => 0,
				'msg'    => '取消失败！' 
			);			
		}
		return $array;
	}
	public function addLove($loveInfo) {
		$sql = "insert into goods_love values(null,'{$loveInfo['goods_id']}','{$loveInfo['user_id']}')";
		$result = $this->user->exec($sql);
		if($result!=0) {
			$array = array(
				'status' => 10,
				'msg'    => '收藏成功！' 
			);			
		}
		else {
			$array = array(
				'status' => 0,
				'msg'    => '收藏失败！' 
			);			
		}
		return $array;
	}
	public function getLoveList($user_id){
		$sql = "select * from `goods_love` a join `goods` b on a.goods_id = b.goods_id where a.user_id='$user_id'";
		$result = $this->user->query($sql);
		if($result!==false) {
			$array = array(
				'status' => 10,
				'data'   => $result,
				'msg'    => '成功！' 
			);			
		}
		else {
			$array = array(
				'status' => 0,
				'msg'    => '失败！' 
			);			
		}
		return $array;		
	}
}

?>