'use strict';
var _mall = require('util/mall.js');

var _goods = {
	//获取商品列表
	getAllGoods(resolve,reject){
		_mall.request({
			url     : _mall.getServerUrl('/admin_php/goods/getAllGoods.php'),
			success : resolve,
			error   : reject
		});		
	},
	getGoodsInfo(id,resolve,reject) {
		_mall.request({
			url     : _mall.getServerUrl('/admin_php/goods/getGoodsInfo.php'),
			type    : 'POST',
			data    : {
				id  : id
			},
			success : resolve,
			error   : reject
		});
	},
	getItemGoods(id,resolve,reject) {
		_mall.request({
			url     : _mall.getServerUrl('/admin_php/goods/getItemGoods.php'),
			type    : 'POST',
			data    : {
				id  : id
			},
			success : resolve,
			error   : reject
		});
	},
	getTypeGoods(id,resolve,reject) {
		_mall.request({
			url     : _mall.getServerUrl('/admin_php/goods/getTypeGoods.php'),
			type    : 'POST',
			data    : {
				id  : id
			},
			success : resolve,
			error   : reject
		});
	},
	getSearchGoods(search,resolve,reject) {
		_mall.request({
			url     : _mall.getServerUrl("/admin_php/goods/getSearchGoods.php"),
			type    : 'POST',
			data    : {
				search  : search
			},
			success : resolve,
			error   : reject
		});
	}		
}

module.exports = _goods;