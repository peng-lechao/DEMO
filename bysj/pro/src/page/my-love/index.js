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
	init:function(){
		var _this = this;
		_user.getLoveList(function(res){
			_this.data = res.data;
			_this.renderHtml();
		},function(errMsg){

		});
	},
	renderHtml:function(){
		let templateLove = _mall.renderHtml(templateIndex,{list:this.data});
		$('.page-content').html(templateLove);
		this.bindEvent();
	},
	bindEvent(){
		var _this = this;
		$('.cancel-love').click(function(){
			var goods_id = $(this).parents('.info').find('.goodsId').val();
			PostbirdAlertBox.confirm({
			    'title': '提示',
			    'content': '确定取消收藏?',
			    'okBtn': '确定',
			    'cancelBtn':'再考虑下',
				'onConfirm': function () {
					_user.deleteLove(goods_id,function(res){
						window.location.reload();
					},function(errMsg){
						//do nothing
					});       				
   				},
			    'contentColor': 'red'
			});	
		});
	}
}

$(function(){
	navSide.init({
		name:'my-love'
	});
	page.init();
})