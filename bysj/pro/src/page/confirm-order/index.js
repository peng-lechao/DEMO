require('./index.css');
require('page/common/nav/index.js');
require('page/common/nav-route/index.js');
require('page/common/logo-search/index.js');
require('page/common/address/index.js');
var _mall = require('util/mall.js'),
	_user = require('service/user-service.js'),
	_goods = require('service/goods-service.js'),
	_cart  = require('service/cart-service.js'),
    templateAddress = require('./address.string'),
    templateGoods = require('./goods.string'),
    provinceCity = require('page/common/address/index.js'),
    PostbirdAlertBox = require('util/PostbirdAlertBox/js/PostbirdAlertBox.js');

var page = {
	addressData:[],
	orderData:[],
	id:'',
	userName:'',
	checkedData:{},
	editId:'',
	init() {
		var _this = this;
		_user.checkLogin(function(res){
			_this.id = res.data.id;
			_this.userName = res.data.userName;
			_this.loadAddress();
			_this.loadSessionCart();
		},function(errMsg){
			PostbirdAlertBox.alert({
			    'title': '提示',
			    'content': '会话过期！',
			    'okBtn': '返回首页',
			    'onConfirm': function () {
        			window.location.href = "./index.html"
   				},
			    'contentColor': 'red'
			});	
		});
	},
	loadAddress() {
		var _this = this;
		_user.getUserAddress(function(res){
			_this.addressData = res.data;
			_this.renderData(templateAddress,res.data,'.address');
			_this.bindAddressEvent();
		},function(errMsg){
			_mall.errorTips(errMsg);
		});
	},
	loadSessionCart(){
		var _this = this;
		_cart.loadSession(function(res){
			_this.orderData = res.data;
			_this.renderData(templateGoods,res.data,'.order-info');
			_this.totalMoney();			
		},function(errMsg){
			PostbirdAlertBox.alert({
			    'title': '提示',
			    'content': '数据出错！',
			    'okBtn': '返回',
			    'onConfirm': function () {
        			window.location.href = './index.html';
   				},
			    'contentColor': 'red'
			});				
		});
	},
	renderData(templateIndex,data,elem){
		let template = _mall.renderHtml(templateIndex,{list:data});
		$(elem).append(template);
	},
	bindAddressEvent(){
		var _this = this;
		$('.address-list').click(function(){
			var self = this;
			$('.address-list').removeClass('checked');
			$(self).addClass('checked');
			_this.addressData.forEach(function(item,index){
				if(item.addressId == $(self).find('.addressId').val()){
					_this.checkedData = item;
				}
			});
		});

		$('.add-address').click(function(){
			_this.dialogShow();
		});

		$('.edit-address').click(function(e){
			var parent = $(this).parent();
			e.stopPropagation();
			_this.dialogShow();
			_this.editId = $(this).siblings('.addressId').val();
			_this.addressData.forEach(function(item,index){
				if(item.addressId == _this.editId) {
					$('#receiver').val(item.receiver);
					$('#phone').val(item.phone);
					$('#province').val(item.province);
					provinceCity.loadAddress(item.province);
					$('#city').val(item.city);
					$('#address').val(item.address);
				}
			});
		});


		$('#ok-btn').click(function(){
			var formData = {
				addressId    : _this.editId,
				receiver     : $.trim($('#receiver').val()),
				phone        : $.trim($('#phone').val()), 
				province     : $.trim($('#province').val()),
				city         : $.trim($('#city').val()),
				address      : $.trim($('#address').val()),
				id           : _this.id,
				userName     : _this.userName
			};
			var result = _this.formValidate(formData);
			// 验证成功
			if(result.status) {
				if(formData.addressId) {
					_user.updateAddress(formData,function(res){
						_this.dialogHide();
						PostbirdAlertBox.alert({
						    'title': '提示',
						    'content': '修改成功！',
						    'okBtn': '好的',
						    'onConfirm': function () {
			        			window.location.reload();
			   				},
						    'contentColor': 'red'
						});						
					},function(errMsg){
						$('.tip-item').show().find('.err-msg').text(errMsg);
					});					
				}
				else {
					_user.addAddress(formData,function(res){
						_this.dialogHide();
						PostbirdAlertBox.alert({
						    'title': '提示',
						    'content': '新增成功！',
						    'okBtn': '好的',
						    'onConfirm': function () {
			        			window.location.reload();
			   				},
						    'contentColor': 'red'
						});						
					},function(errMsg){
						$('.tip-item').show().find('.err-msg').text(errMsg);
					});	
				}
			}
			// 验证失败
			else {
				$('.tip-item').show().find('.err-msg').text(result.msg);
			}			
		});

		$('#cancel-btn').click(function(){
			_this.dialogHide();
		});

		$('.close-btn').click(function(){
			_this.dialogHide();
		});

		$('.go-pay').click(function(){
			if(JSON.stringify(_this.checkedData) != "{}") {
				_this.checkedData.total = $('.pay-money').html();
				_this.checkedData.pay = $('.radio:checked').val();
				_this.checkedData.tips = $('.input-tips').val();
				console.log(_mall.getUrlParam('from'));
				if(_mall.getUrlParam('from')){
					_cart.addOrdersFrom(_this.checkedData,function(res){
						window.location.href = "./success-order.html?order_id="+res.data;
					},function(errMsg){
						PostbirdAlertBox.alert({
						    'title': '提示',
						    'content': errMsg,
						    'okBtn': '好的',
						    'contentColor': 'red'
						});	
					});						
				}
				else {
					_cart.addOrders(_this.checkedData,function(res){
						window.location.href = "./success-order.html?order_id="+res.data;
					},function(errMsg){
						PostbirdAlertBox.alert({
						    'title': '提示',
						    'content': errMsg,
						    'okBtn': '好的',
						    'contentColor': 'red'
						});	
					});					
				}
			
			}
			else {
				PostbirdAlertBox.alert({
				    'title': '提示',
				    'content': '请选择地址！',
				    'okBtn': '好的',
				    'contentColor': 'red'
				});	
			}

		});

		$('.goback-cart').click(function(){
				PostbirdAlertBox.confirm({
				    'title': '提示',
				    'content': '确定返回购物车?',
				    'okBtn': '好的',
					'onConfirm': function () {
						_cart.clearSession(function(res){
							window.location.href = './cart.html'
						},function(errMsg){
							//do nothing
						});       				
	   				},
				    'contentColor': 'red'
				});				
		});
	},
	dialogShow() {
		$('#dialog-modal').css('height',$('html').height());
		$('#dialog-modal').show();
		$('#dialog').show();
	},
	dialogHide() {
		$('#dialog-modal').hide();
		$('#dialog').hide();
		$('#dialog').find('input').val('');
		$('#dialog').find('textarea').val('');
		$('#dialog').find('select').val('0');
		this.editId = '';
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
	},
	totalMoney() {
		var total = 0,
			_this = this;
		this.orderData.forEach(function(item,index) {
			total += parseInt(item.sum_price);
		});
		total = _this.changeTwoDecimal_f(total);
		$('.total-money .list-right').html(total);
		$('.pay-money').html(total);
	},
	changeTwoDecimal_f:function(x) {    
	　　var f_x = parseFloat(x);    
	　　if (isNaN(f_x)) {    
	　　　　return 0;    
	　　}    
	　　var f_x = Math.round(x*100)/100;    
	　　var s_x = f_x.toString();    
	　　var pos_decimal = s_x.indexOf('.');    
	　　if (pos_decimal < 0){    
	　　　　pos_decimal = s_x.length;    
	　　　　s_x += '.';    
	　　}    
	　　while (s_x.length <= pos_decimal + 2) {    
	　　　　s_x += '0';    
	　　}    
	　　return s_x;    
	}
}

$(function(){
	page.init();
})

module.exports = page;