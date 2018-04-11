require('./index.css');
require('page/common/nav/index.js');
require('page/common/nav-route/index.js');
require('page/common/logo-search/index.js');
var _mall = require('util/mall.js'),
	_user = require('service/user-service.js'),
	_goods = require('service/goods-service.js'),
	_cart  = require('service/cart-service.js'),
    PostbirdAlertBox = require('util/PostbirdAlertBox/js/PostbirdAlertBox.js');

var page = {
	init:function(){
		var order_id = _mall.getUrlParam('order_id');
		$('.order-id').html(order_id);
	}
}

$(function(){
	page.init();
});