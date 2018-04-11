require('./index.css');
var _mall = require('util/mall.js'),
	_user = require('service/user-service.js'),
	_cart = require('service/cart-service.js');
var nav = {
	init:function(){
		this.bindEvent();
		this.loadUserInfo();
		this.loadCartInfo();
	},
	bindEvent:function(){
		//注册点击登录事件
		$('.js-login').click(function(){
			_mall.doLogin();
		});
		// 注册点击退出事件
		$('.js-logout').click(function(){
			_user.logout(function(res){
				alert('退出登录成功！');
				window.location.reload();
			},function(errMsg){
				_mall.errorTips(errMsg);
			})
		});
		// 注册点击注册事件
		$('.js-register').click(function(){
			window.location.href = './user-register.html';
		});
	},	
	//加载用户信息
	loadUserInfo:function(){
		_user.checkLogin(function(res){
			$('.user.not-login').hide().siblings('.user.login').show().find('.user-name').text(res.data.userName);
		},function(errMsg){

		});
	},
	//加载购物车信息
	loadCartInfo:function(){
		_cart.getCartInfo(function(res){
			$('.cart-count').text(res.data.length||0);
		},function(errMsg){
			 $('.cart-count').text(0);
		});
	}	
}

module.exports = nav.init();