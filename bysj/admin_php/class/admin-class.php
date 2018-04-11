<?php
require "../db.php";
date_default_timezone_set('PRC'); 
session_start();
class ADMIN {
	private $admin;
	public function __construct() {
		$this->admin = new DB('14237plc-admin');
	}
	public function validateLogin($adminInfo) {
		$sql = "select * from admin_user where adminName='{$adminInfo['adminName']}'";
		$result = $this->admin->query($sql);
		$count  = count($result);
		if($count!=0) {
			if (password_verify($adminInfo['password'], $result[0]['password'])) {
				$lastDate = date('y-m-d H:i:s',time());
				$sql = "update admin_user set lastDate='{$lastDate}' where adminName='{$adminInfo['adminName']}'";
				$this->admin->exec($sql);				
			    $res = array(
			    	'adminId'   => $result[0]['adminId'],
			    	'adminName' => $adminInfo['adminName'],	
			    	'level'     => $result[0]['level']
			    );
			    $_SESSION['adminInfo'] = $res;
			    $array = array(
					'status' => 10,
					'data'   => $res,
					'msg'    => '登录成功！'
				);
			}
			else {
			    $array = array(
					'status' => 0,
					'msg'    => '密码错误！请重新输入！'
				);
			}
		}
		else {
			$array = array(
				'status' => 0,
				'msg'    => '用户不存在！'
			);
		}
		return $array;
	}
	public function getAdminInfo() {
		$sql = "select * from admin_user";
		$result = $this->admin->query($sql);
		$array = array(
			'status' => 10,
			'data'   => $result,
			'msg'    => '获取管理员信息成功！'
		);
		return $array;
	}
	public function checkLogin(){
		if(isset($_SESSION['adminName'])){
			$array = array(
			'status' => 10,
			'msg'    => '已登录！'
			);
		}
		else {
			$array = array(
			'status' => 1,
			'msg'    => '未登录，强制登录！'
			);
		}
		return $array;
	}
	public function checkAdminLevel($adminId){
		$sql = "select level from admin_user where adminName = '$adminId'";
		$result = $this->admin->query($sql);
		foreach($result as $row){
			extract($row);
			$data = $row;
		}
		if($data === '3'){
			$array = array(
				'status' => 10,
				'msg'    => '管理员可修改！'
			);
		}
		else {
			$array = array(
				'status' => 0,
				'msg'    => '权限不足，无法操作！'
			);
		}
		return $array;
	}
	public function addAdmin($adminInfo){
		$sql = "insert into admin_user values(null,'{$adminInfo['adminName']}','{$adminInfo['password']}','{$adminInfo['date']}','{$adminInfo['level']}','')";
		$result = $this->admin->exec($sql);
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
	public function checkAdminName($adminName){
		$sql = "select count(*) from admin_user where adminName='$adminName'";
		$result = $this->admin->getRows($sql);
		if($result == 1){
			$array = array(
				'status' => 0,
				'msg'    => '管理员名已存在!' 
			);
		}
		else {
			$array = array(
				'status' => 10,
				'msg'    => '管理员名可用!' 
			);
		}
		return $array;
	}
	public function deleteAdmin($adminId){
		$sql = "delete from admin_user where adminId in ($adminId)";
		$result = $this->admin->exec($sql);
		if($result ==false || $result =='0'){
			$array = array(
				'status' => 0,
				'msg'    => '操作失败!' 
			);
		}
		else{
			$array = array(
				'status' => 10,
				'msg'    => '操作成功!' 
			);
		}
		return $array;
	}
	// public function deleteChoose($adminInfo){
	// 	$sql = "delete from admin_user where adminId in ()";
	// 	$result = $this->admin->exec($sql);
	// 	if($result =='1'){
	// 		$array = array(
	// 			'status' => 10,
	// 			'msg'    => '操作成功!' 
	// 		);
	// 	}
	// 	else{
	// 		$array = array(
	// 			'status' => 0,
	// 			'msg'    => '操作失败!' 
	// 		);
	// 	}
	// 	return $array;
	// }
}
?>