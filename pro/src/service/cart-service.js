var _mall = require('util/mall.js');

var _cart = {
	getCartInfo:function(resolve,reject){
		_mall.request({
			url     : _mall.getServerUrl(''),
			success : resolve,
			error   : reject
		});
	}
}

module.exports = _cart;