'use strict';
require('./index.css');
var _user   = require('service/user-service.js');
var _mall     = require('util/mall.js');

var user = {
	init:function(){
		this.onloadImg();
		this.bindEvent();
	},
	onloadImg:function(){
		$('.user-img').css('left','0');
    	$('.user-form').css('left','680px');
	},
	bindEvent:function(){
		var _this = this;
		$('#submit').click(function(){
			_this.submit();
		});
		$('.user-content').keyup(function(e){
			if(e.keyCode == 13){
				_this.submit();
			}
		})
	},
	submit:function(){
		var formData = {
			userName:$.trim($('#userName').val()),
			password:$.trim($('#password').val())
		};
		var validateResult = this.formValidate(formData);
		if (validateResult.status) {
			_user.login(formData,function(res){
				window.location.href = _mall.getUrlParam('redirect') || './index.html';
			},function(errMsg){
				$('.tip-item').show().find('.err-msg').text(errMsg);
			});
		}
		else {
			$('.tip-item').show().find('.err-msg').text(validateResult.msg);
		}

	},
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
		//非空验证成功，返回
		result.status = true;
		result.msg = '验证成功';
		return result;
	}
}


$(function(){
	user.init();
});