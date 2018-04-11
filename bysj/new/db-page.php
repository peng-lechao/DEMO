<?php
class DB {
	private $con;
	public function __construct($dbname) {
		$this->con = new PDO("mysql:host=localhost;dbname=$dbname","root","");
		$this->con->exec('set names utf8');
	}
	public function exec($sql) {
		return $this->con->exec($sql);
	}
	public function query($sql) {
		$stmt = $this->con->query($sql);
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}
	public function getRows($sql) {
		$stmt=$this->con->query($sql); 
   		return $stmt->fetch(PDO::FETCH_NUM)[0];   
	}
}
?>