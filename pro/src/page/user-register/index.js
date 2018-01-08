'use strict';
require('./index.css');
var _user   = require('service/user-service.js');
var _mall     = require('util/mall.js');

var user = {
	// 初始化函数
	init:function(){
		this.onloadImg();
		this.bindEvent();
	},
	//过渡动画
	onloadImg:function(){
		$('.user-img').css('left','0');
   		$('.register-form').css('left','730px');
	},
	// 绑定事件
	bindEvent:function(){
		var _this = this;
		//用户名框失去焦点事件
		$('#userName').blur(function(){
			var userName = $.trim($('#userName').val());
			if(!userName) {
				return;
			}	
			_user.checkUserName(userName,function(res){
					$('.tip-item').hide();
					$('.success').show().find('.success-msg').text(res.msg);
				},function(errMsg){
					$('.tip-item').hide();
					$('.error').show().find('.err-msg').text(errMsg);
				});
		});
		//点击注册框事件
		$('#submit').click(function(){
			_this.submit();
		});
		//键盘事件
		$('.user-content').keyup(function(e){
			if(e.keyCode == 13){
				_this.submit();
			}
		})
	},
	//注册事件
	submit:function(){
		//去空获取输入框数据
		var formData = {
			userName:$.trim($('#userName').val()),
			password:$.trim($('#password').val()),
			pwConfirm:$.trim($('#pwConfirm').val()),
			phone:$.trim($('#phone').val()),
			email:$.trim($('#email').val()),
			question:$.trim($('#question').val()),
			answer:$.trim($('#answer').val())
		};
		//验证数据
		var validateResult = this.formValidate(formData);
		//数据验证成功
		if (validateResult.status) {
			_user.register(formData,function(res){
				console.log(res);
				window.location.href = _mall.getUrlParam('redirect') || './index.html';
			},function(errMsg){
				$('.success').hide();
				$('.error').show().find('.err-msg').text(errMsg);
			});
		}
		//验证失败
		else {
			$('.success').hide();
			$('.error').show().find('.err-msg').text(validateResult.msg);
		}
	},
	// 验证数据
	formValidate:function(formData){
		//设置返回值
		var result = {
			status:false,
			msg:''
		};
		//用户名非空判断
		if(!_mall.validate(formData.userName,'require')) {
			result.msg = '用户名不能为空！';
			return result;
		}
		//密码非空判断
		if(!_mall.validate(formData.password,'require')) {
			result.msg = '密码不能为空！';
			return result;
		}
		//密码长度验证
		if(!(6<=formData.password.length && formData.password.length<=15) ) {
			result.msg = '密码长度为6-15位！';
			return result;
		}
		//两次密码验证
		if(formData.password != formData.pwConfirm){
			result.msg = '两次输入的密码不一致！';
			return result;
		}
		//手机格式验证
		if(!_mall.validate(formData.phone,'phone')){
			result.msg = '手机号码格式不对！';
			return result;
		}
		//邮箱地址验证
		if(!_mall.validate(formData.email,'email')){
			result.msg = '邮箱地址格式不对！';
			return result;
		}
		//密保问题验证
		if(!_mall.validate(formData.answer,'require')){
			result.msg = '密保问题不能为空！';
			return result;
		}
		//密保答案验证
		if(!_mall.validate(formData.question,'require')){
			result.msg = '密保答案不能为空！';
			return result;
		}
		//非空验证成功，返回
		result.status = true;
		result.msg = '验证成功';
		return result;
	}
}

$(function(){
	user.init();
});	