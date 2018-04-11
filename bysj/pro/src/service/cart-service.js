var _mall = require('util/mall.js');

var _cart = {
	getCartInfo:function(resolve,reject){
		_mall.request({
			url     : _mall.getServerUrl('/admin_php/cart/getCartInfo.php'),
			success : resolve,
			error   : reject
		});
	},
	addCart:function(goods_info,resolve,reject){
		_mall.request({
			url     : _mall.getServerUrl('/admin_php/cart/addCart.php'),
			type    : 'POST',
			data    : goods_info,
			success : resolve,
			error   : reject
		});		
	},
	deleteCart:function(goods_id,resolve,reject){
		_mall.request({
			url     : _mall.getServerUrl('/admin_php/cart/deleteCart.php'),
			type    : 'POST',
			data    : {
				goods_id : goods_id
			},
			success : resolve,
			error   : reject
		});		
	},
	uploadSession:function(cartInfo,resolve,reject) {
		var data = JSON.stringify(cartInfo);
		_mall.request({
			url     : _mall.getServerUrl('/admin_php/cart/uploadSession.php'),
			type    : 'POST',
			data    : {
				data: data
			},
			success : resolve,
			error   : reject
		});			
	},
	updateCart:function(info,resolve,reject){
		_mall.request({
			url     : _mall.getServerUrl('/admin_php/cart/updateCart.php'),
			type    : 'POST',
			data    : info,
			success : resolve,
			error   : reject
		});		
	},
	loadSession:function(resolve,reject) {
		_mall.request({
			url     : _mall.getServerUrl('/admin_php/cart/loadSession.php'),
			type    : 'POST',
			success : resolve,
			error   : reject
		});			
	},
	addOrders:function(addressData,resolve,reject) {
		_mall.request({
			url     : _mall.getServerUrl('/admin_php/cart/addOrders.php'),
			type    : 'POST',
			data    : addressData,
			success : resolve,
			error   : reject
		});			
	},
	addOrdersFrom:function(addressData,resolve,reject) {
		_mall.request({
			url     : _mall.getServerUrl('/admin_php/cart/addOrders.php?from=cart'),
			type    : 'POST',
			data    : addressData,
			success : resolve,
			error   : reject
		});			
	},
	clearSession:function(resolve,reject){
		_mall.request({
			url     : _mall.getServerUrl('/admin_php/cart/clearSession.php'),
			success : resolve,
			error   : reject
		});			
	},
	getOrderList:function(resolve,reject){
		_mall.request({
			url     : _mall.getServerUrl('/admin_php/cart/getOrderList.php'),
			success : resolve,
			error   : reject
		});		
	},
	getOrder:function(order_id,resolve,reject) {
		_mall.request({
			url     : _mall.getServerUrl('/admin_php/cart/getOrder.php'),
			data    : {
				order_id : order_id
			},
			type    : 'POST',
			success : resolve,
			error   : reject
		});			
	},
	cancelOrder:function(order_id,resolve,reject) {
		_mall.request({
			url     : _mall.getServerUrl('/admin_php/cart/cancelOrder.php'),
			data    : {
				order_id : order_id
			},
			type    : 'POST',
			success : resolve,
			error   : reject
		});			
	},
	deleteAddress:function(addressId,resolve,reject) {
		_mall.request({
			url     : _mall.getServerUrl('/admin_php/cart/deleteAddress.php'),
			data    : {
				addressId : addressId
			},
			type    : 'POST',
			success : resolve,
			error   : reject
		});			
	},
	getTypeList(resolve,reject) {
		_mall.request({
			url     : _mall.getServerUrl("/admin_php/type/getTypeList.php?type=mall"),
			success : resolve,
			error   : reject
		});
	},
	getFloorList(resolve,reject) {
		_mall.request({
			url     : _mall.getServerUrl("/admin_php/type/getFloorList.php"),
			success : resolve,
			error   : reject
		});
	}
}

module.exports = _cart;