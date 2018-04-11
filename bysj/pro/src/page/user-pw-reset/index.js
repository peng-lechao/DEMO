'use strict';
require('./index.css');
var _user   = require('service/user-service.js');
var _mall     = require('util/mall.js');

var reset = {
	data:{
		userName:'',
		question:'',
		answer  :'',
		password:''
	},
	init:function() {
		this.bindEvent();
	},
	bindEvent:function(){
		var _this = this;
		$('.userName-btn').click(function(){
			var userName = $.trim($('#userName').val());
			if(!userName){
				$('.step-userName .tip-item').show().find('.err-msg').text('用户名不能为空！');
			}
			else {
				_user.getQuestion(userName,function(res){
					_this.data.userName = userName;
					_this.data.question = res;
					_this.loadQuestion();
					$('.question-text').text(res.data.question);
				},function(errMsg){
					$('.step-userName .tip-item').show().find('.err-msg').text(errMsg);
				});
			}
		});
		$('.question-btn').click(function(){
			var answer = $.trim($('#answer').val());
			if(!answer){
				$('.step-question .tip-item').show().find('.err-msg').text('请输入密码提示问题答案！');
			}
			else {
				_this.data.answer = answer;
				_user.checkAnswer({
					userName : _this.data.userName,
					answer   : _this.data.answer,
				},function(res) {
					_this.loadPassword();	
				},function(errMsg){
					$('.step-question .tip-item').show().find('.err-msg').text(errMsg);
				})
			}
		});
		$('.pw-btn').click(function(){
			var password  = $.trim($('#password').val()),
				pwConfirm = $.trim($('#pw-confirm').val());
			if(!password) {
				$('.step-pw .tip-item').show().find('.err-msg').text('密码不能为空！');
				return;
			}
			if(!(password.length>=6&&password.length<=15)) {
				$('.step-pw .tip-item').show().find('.err-msg').text('密码长度为6-15位！');
				return;
			}
			if(password != pwConfirm) {
				$('.step-pw .tip-item').show().find('.err-msg').text('两次输入的密码不一致！');
				return ;
			}
			else {
				_this.data.password = password;
				_user.resetPassword({
					userName : _this.data.userName,
					password : _this.data.password
				},function(res){
					alert(res.msg);
					window.location.href = './user-login.html';
				},function(errMsg){
					$('.step-pw .tip-item').show().find('.err-msg').text(errMsg);
				});
			}
		})

	},
	loadQuestion:function(){
		$('.step-userName').hide();
		$('.step-question').show();
	},
	loadPassword:function(){
		$('.step-question').hide();
		$('.step-pw').show();
	},
	FormValidate:function(){
		var result = {
			status:false,
			msg:''
		};
	}
}

$(function(){
	reset.init();
})