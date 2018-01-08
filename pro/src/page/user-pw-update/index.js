require('./index.css');
require('page/common/nav/index.js');
require('page/common/nav-route/index.js');
var _user = require('service/user-service.js'),
	_mall = require('util/mall.js'),
	navSide = require('page/common/nav-side/index.js');
var tip = {
	errShow:function(msg){
		$('.tip-item').hide();
		$('.error').show().find('.err-msg').text(msg);
	},
	succShow:function(msg){
		$('.tip-item').hide();
		$('.success').show().find('.success-msg').text(msg);
	},
	hide:function(){
		$('.tip-item').hide();
	}
};

var page = {
	//初始化函数
	init:function(){
		this.bindEvent();
		_user.getUserInfo(function(res){
			//do nothing
		},function(errMsg){
			_mall.errorTips(errMsg);
		});
	},
	// 绑定事件
	bindEvent:function() {
		// 原密码框失去焦点事件
		$('#password').blur(function(){
			var password = $.trim($('#password').val());
			// 原密码非空验证
			if(!password){
				tip.errShow('密码不能为空');
			}
			// 原密码验证成功
			else {
				_user.checkPassword(password,function(res){
					$('input').attr("disabled",false);
					tip.succShow(res.msg);
				},function(errMsg){
					$('input:not(:eq(0))').attr("disabled",true);
					tip.errShow(errMsg);
				});
			}
		});
		// 提交按钮点击事件
		$('.update-btn').click(function(){
			var newPassword    = $.trim($('#newPassword').val()),
				confirmPw = $.trim($('#comfirPassword').val()),
				password = $.trim($('#password').val());
			if(!password){
				tip.errShow('请输入原密码！');
				return;
			}
			// 新密码非空验证
			if(!newPassword){
				tip.errShow('请输入新密码！');
				return;
			}
			// 新密码长度验证
			if(!(6<=newPassword.length&&newPassword.length<=15)){
				tip.errShow('密码长度为6-15位！');
				return;
			}
			// 两次输入密码验证
			if(newPassword!=confirmPw){
				tip.errShow('两次输入的密码不一致！');
				return;
			}
			// 通过验证
			else {
				_user.updatePassword(newPassword,function(res){
					alert('密码重置成功！');
					window.location.reload();
				},function(errMsg){
					$tip.errShow(errMsg);
				});
			}
		});
	}
}

$(function(){
	navSide.init({
		name:'user-pw-update'
	});
	page.init();
})