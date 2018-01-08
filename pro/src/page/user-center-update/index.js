require('./index.css');
require('page/common/nav/index.js');
require('page/common/nav-route/index.js');
var _mall = require('util/mall.js'),
	_user = require('service/user-service.js'),
	navSide = require('page/common/nav-side/index.js'),
	templatePage = require('./index.string');

var page = {
	init:function(){
		this.onloadData();
		this.bindEvent();
	},
	onloadData:function(){
		var _this = this;
		_user.getUserInfo(function(res){
			_this.renderData(res.data);
		},function(errMsg){
			$('.tip-item').show().find('.err-msg').text(errMsg);
		});
	},
	bindEvent:function(){
		var _this = this;
		 $(document).on('click', '.update-btn', function(){
			var formData = {
				phone        : $.trim($('#phone').val()),
				email        : $.trim($('#email').val()),
				realname     : $.trim($('#realname').val()),
				introduction : $.trim($('#introduction').val()),
			};
			console.log(formData);
			var result = _this.formValidate(formData);
			if(result.status) {
				_user.updateUserInfo(formData,function(res){
					alert('个人信息修改成功！');
					window.location.href = './user-center.html';
				},function(errMsg){
					$('.tip-item').show().find('.err-msg').text(errMsg);
				})
			}
			else {
				$('.tip-item').show().find('.err-msg').text(result.msg);
			}
		});
	},
	renderData:function(data){
		var templateRes = _mall.renderHtml(templatePage,data);
		$('.tip-item').after(templateRes);
	},
	formValidate:function(formData){
		var res = {
			status : false,
			msg    : ''
 		};
 		if(!_mall.validate(formData.phone,'require')){
 			res.msg = '手机号码不能为空！';
 			return res;
 		}
 		if(!_mall.validate(formData.phone,'phone')){
 			res.msg = '手机号码格式不正确！';
 			return res;
 		}
 		if(!_mall.validate(formData.email,'require')){
 			res.msg = '邮箱地址不能空！';
 			return res;
 		}
 		if(!_mall.validate(formData.email,'email')){
 			res.msg = '邮箱地址格式不正确！';
 			return res;
 		}
 		res.status = true;
 		res.msg = '验证成功';
 		return res;
	}
}

$(function(){
	navSide.init({
		name:'user-center'
	});
	page.init();
})