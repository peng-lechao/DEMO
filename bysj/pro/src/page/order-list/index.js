require('./index.css');
require('page/common/nav/index.js');
require('page/common/nav-route/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mall = require('util/mall.js'),
	_cart = require('service/cart-service.js'),
	_user = require('service/user-service.js'),
	_goods = require('service/goods-service.js'),
	templateIndex = require('./index.string'),
	PostbirdAlertBox = require('util/PostbirdAlertBox/js/PostbirdAlertBox.js');

var page = {
	data:[],
	init:function() {
		var _this = this;
		_cart.getOrderList(function(res){
			_this.data = res.data;
			_this.renderHtml();
		},function(errMsg){

		})
	},
	renderHtml:function(){
		let templateOrder = _mall.renderHtml(templateIndex,{list:this.data});
		$('.page-content').append(templateOrder);
	}
}

$(function(){
	navSide.init({
		name:'order-list'
	});
	page.init();
})