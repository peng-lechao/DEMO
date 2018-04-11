<?php
require "../db.php";
class TYPE {
	private $db;
	public function __construct() {
		$this->db = new DB('14237plc-bysj');
	}
	public function getTypeList($item){
		if($item == 'admin') {
			$sql = "select * from goods_category";
		}
		else {
			$sql = "select * from goods_category where isShow='1'";
		}
		$result = $this->db->query($sql);
		array_multisort(array_column($result,'sort'),SORT_DESC,$result);
		if($result !== false && count($result) !== 0){
			$data = $this->getTree($result,0);
			$array = array(
				'status' => 10,
				'data'   => $data,
				'msg'    => '获取分类信息成功！'
			);
		}
		else {
			$array = array(
				'status' => 0,
				'msg'    => '获取分类信息失败！'
			);
		}
		return $array;
	}
	public function getTree($result,$startId){
		$tree = array(); 
		foreach ($result as $key => $value) {
			if($value['p_id'] == $startId){
				$value['children'] = $this->getTree($result,$value['id']);
				if($value['children'] == null){
					unset($value['children']);
				}
				$tree[] = $value;
			}
			
		}
		return $tree;
	}
	public function updateTypeItem($typeInfo){
		$sql = "update goods_category set name='{$typeInfo['name']}',isShow='{$typeInfo['isShow']}',sort='{$typeInfo['sort']}' where id='{$typeInfo['id']}'";
		$result = $this->db->exec($sql);
		if($result==false || $result==0){
			$array = array(
				'status' => 0,
				'msg'    => '修改分类信息失败！'
			);
		}
		else {
			$array = array(
				'status' => 10,
				'msg'    => '修改分类信息成功！'
			);
			
		}
		return $array;
	}
	public function addTypeItem($typeInfo){
		$sql = "insert goods_category values(null,'{$typeInfo['name']}','{$typeInfo['p_id']}','{$typeInfo['sort']}','{$typeInfo['isShow']}')";
		$result = $this->db->exec($sql);
		if($result==false || $result==0){
			$array = array(
				'status' => 0,
				'msg'    => '插入分类信息失败！'
			);
		}
		else {
			$array = array(
				'status' => 10,
				'msg'    => '插入分类信息成功！'
			);
			
		}
		return $array;
	}
	public function deleteType($id){
		$sql = "delete from goods_category where id='$id' or p_id='$id'";
		$result = $this->db->exec($sql);
		if($result==false || $result==0){
			$array = array(
				'status' => 0,
				'msg'    => '删除分类信息失败！'
			);
		}
		else {
			$array = array(
				'status' => 10,
				'msg'    => '删除分类信息成功！'
			);	
		}
		return $array;
	}
	public function getFloorList(){
		$sql   = "select * from `goods_category` where p_id = '0'";
		$cat   = $this->db->query($sql);
		$sql   = "select * from `goods` a join `goods_category` b on a.cat_id = b.id where a.is_hot='1'";
		$goods = $this->db->query($sql);
		forEach($cat as $key => $value){
			$value['item'] = [];
			forEach($goods as $index => $item) {
				if($item['p_id'] == $value['id']) {
					$value['item'][] = $item;
				}
			}
			$result[] = $value;
		}
		$array = array(
			'status' => 10,
			'data'   => $result,
			'msg'    => '成功！'
		);
		return $array;		 
	}	
}
?>