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
	data : [],
	order_id : '',
	init:function(){
		var _this = this;
		_this.order_id = _mall.getUrlParam('order_id');
		_cart.getOrder(_this.order_id,function(res){
			_this.data = res.data;
			_this.renderHtml();
			_this.loadCancelBtn();
		},function(errMsg){

		});
	},
	renderHtml:function(){
		let templateOrder = _mall.renderHtml(templateIndex,{list:this.data});
		$('.page-con').append(templateOrder);
		// this.bindEvent();
	},
	loadCancelBtn:function(){
		var _this = this;
		console.log($('.status').html());
		if($('.status').html() != '已关闭' ) {
			$('.cancel-order').click(function(){
				PostbirdAlertBox.confirm({
				    'title': '提示',
				    'content': '确认取消订单？',
				    'okBtn': '好的',
					'onConfirm': function () {
						_cart.cancelOrder(_this.order_id,function(res){
							window.location.reload();
						},function(errMsg){
							_mall.errorTips(errMsg);
						});       				
	   				},
				    'contentColor': 'red'
				});	
			});
		}
		else {
			$('.cancel-order').hide();
		}
	}
}


$(function(){
	navSide.init({
		name:'order-list'
	});
	page.init();
})