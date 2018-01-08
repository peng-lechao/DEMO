require('./index.css');
require('page/common/nav/index.js');
require('page/common/nav-route/index.js');
require('page/common/address/index.js');
var _mall        = require('util/mall.js'),
	_user        = require('service/user-service.js'),
	navSide      = require('page/common/nav-side/index.js'),
	templatePage = require('./index.string');

var page = {
	init:function(){
		this.bindEvent();
		this.onloadTable();
	},
	// 绑定提交点击事件
	bindEvent:function(){
		var _this = this;
		$('.update-btn').click(function(){
			// 获取数据
			var formData = {
				receiver     : $.trim($('#receiver').val()),
				phone        : $.trim($('#phone').val()), 
				province     : $.trim($('#province').val()),
				city         : $.trim($('#city').val()),
				address      : $.trim($('#address').val())
			}
			// 进行验证
			var result = _this.formValidate(formData);
			// 验证成功
			if(result.status) {
				_user.addAddress(formData,function(res){
					alert(res.msg);
					window.location.reload();
				},function(errMsg){
					$('.tip-item').show().find('.err-msg').text(errMsg);
				});
			}
			// 验证失败
			else {
				$('.tip-item').show().find('.err-msg').text(result.msg);
			}
		})	
	},
	onloadTable(){
		_user.getUserAddress(function(res){
			let templateResult = _mall.renderHtml(templatePage,{data:res.data});
			$('.table-head').after(templateResult);
		},function(errMsg){
			$('.tip-item').show().find('.err-msg').text(errMsg);
		});
	},
	// 验证表单数据
	formValidate:function(formData) {
		var res = {
			status: false,
			msg   : ''
		};
		if(!_mall.validate(formData.receiver,'require')){
			res.msg = '收货人不能为空！';
			return res;
		}
		if(!_mall.validate(formData.phone,'phone')){
			res.msg = '手机号码格式不正确！';
			return res;
		} 
		if(formData.province == '0'){
			console.log('32');
			res.msg = '请选择省份！';
			return res;
		} 
		if(formData.city == '0'){
			res.msg = '请选择市/区/县！';
			return res;
		}
		if(!_mall.validate(formData.address,'require')){
			res.msg = '详细地址不能为空！';
			return res;
		}  
		res.status = true;
		res.msg = '验证成功'; 
		return res;
	}
}

$(function(){
	navSide.init({
		name:'user-address'
	});
	page.init();
})