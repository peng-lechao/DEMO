'use strict';
var _mall = require('util/mall.js');

var _user = {
	// 用户登录
	login:function(userInfo,resolve,reject){
		_mall.request({
			url     : _mall.getServerUrl('/admin_php/user/user-login.php'),
			type    : 'POST',
			data    : userInfo,
			success : resolve,
			error   : reject
		});
	},
	//退出登录
	logout:function(resolve,reject){
		_mall.request({
			url     : _mall.getServerUrl('/admin_php/user/user-logout.php'),
			type    : 'POST',
			success : resolve,
			error   : reject
		});
	},
	//检查用户名
	checkUserName:function(userName,resolve,reject){
		_mall.request({
			url     : _mall.getServerUrl('/admin_php/user/check-user-name.php'),
			type    : 'POST',
			data    : {
				userName : userName
			},
			success : resolve,
			error   : reject
		})
	},
	//用户注册
	register:function(userInfo,resolve,reject){
		_mall.request({
			url     : _mall.getServerUrl('/admin_php/user/user-register.php'),
			type    : 'POST',
			data    : userInfo,
			success : resolve,
			error   : reject
		})
	},
	//检查登录状态
	checkLogin:function(resolve,reject){
		_mall.request({
			url     : _mall.getServerUrl('/admin_php/user/check-user-login.php'),
			type    : 'POST',
			success : resolve,
			error   : reject
		})
	},
	//获取用户密码提示问题
	getQuestion:function(userName,resolve,reject){
		_mall.request({
			url     : _mall.getServerUrl('/admin_php/user/get-question.php'),
			type    : 'POST',
			data    :{
				userName : userName
			},
			success : resolve,
			error   : reject
		})
	},
	//检查用户密码提示问题答案
	checkAnswer:function(userInfo,resolve,reject){
		_mall.request({
			url     : _mall.getServerUrl('/admin_php/user/check-user-info.php'),
			type    : 'POST',
			data    : {
				userName  : userInfo.userName,
				type      : 'answer',
				typeData  : userInfo.answer
			},
			success : resolve,
			error   : reject
		})
	},
	//验证密码
	checkPassword:function(password,resolve,reject){
		_mall.request({
			url     : _mall.getServerUrl('/admin_php/user/check-user-info.php'),
			type    : 'POST',
			data    : {
				type     :'password',
				typeData : password
			},
			success : resolve,
			error   : reject
		});
	},
	//忘记密码，重置密码
	resetPassword:function(userInfo,resolve,reject){
		_mall.request({
			url     : _mall.getServerUrl('/admin_php/user/update-password.php'),
			type    : 'POST',
			data    : userInfo,
			success : resolve,
			error   : reject
		})
	},
	//获取用户信息
	getUserInfo:function(resolve,reject){
		_mall.request({
			url     : _mall.getServerUrl('/admin_php/user/get-user-info.php'),
			type    : 'POST',
			success : resolve,
			error   : reject
		})
	},
	//登录时更新密码
	updatePassword:function(password,resolve,reject){
		_mall.request({
			url     : _mall.getServerUrl('/admin_php/user/update-password.php'),
			type    : 'POST',
			data    : {
				password : password
			},
			success : resolve,
			error   : reject
		})
	},
	//更新个人信息
	updateUserInfo:function(userInfo,resolve,reject){
		_mall.request({
			url     : _mall.getServerUrl('/admin_php/user/update-user-info.php'),
			type    : 'POST',
			data    : userInfo,
			success : resolve,
			error   : reject
		})
	},
	addAddress:function(userInfo,resolve,reject){
		_mall.request({
			url     : _mall.getServerUrl('/admin_php/user/add-user-address.php'),
			type    : 'POST',
			data    : userInfo,
			success : resolve,
			error   : reject
		})
	},
	updateAddress:function(userInfo,resolve,reject){
		_mall.request({
			url     : _mall.getServerUrl('/admin_php/user/update-user-address.php'),
			type    : 'POST',
			data    : userInfo,
			success : resolve,
			error   : reject
		})
	},
	getUserAddress:function(resolve,reject){
		_mall.request({
			url     : _mall.getServerUrl('/admin_php/user/get-user-address.php'),
			type    : 'POST',
			success : resolve,
			error   : reject
		})
	},
	loadAddressItem:function(addressId,resolve,reject){
		_mall.request({
			url     : _mall.getServerUrl('/admin_php/user/load-address-item.php'),
			type    : 'POST',
			data    : {
				addressId : addressId
			},
			success : resolve,
			error   : reject
		})
	},
	checkLove:function(goods_id,resolve,reject) {
		_mall.request({
			url     : _mall.getServerUrl('/admin_php/user/checkLove.php'),
			type    : 'POST',
			data    : {
				goods_id : goods_id
			},
			success : resolve,
			error   : reject
		})		
	},
	deleteLove:function(goods_id,resolve,reject) {
		_mall.request({
			url     : _mall.getServerUrl('/admin_php/user/deleteLove.php'),
			type    : 'POST',
			data    : {
				goods_id : goods_id
			},
			success : resolve,
			error   : reject
		})		
	},	
	addLove:function(goods_id,resolve,reject) {
		_mall.request({
			url     : _mall.getServerUrl('/admin_php/user/addLove.php'),
			type    : 'POST',
			data    : {
				goods_id : goods_id
			},
			success : resolve,
			error   : reject
		})		
	},
	getLoveList:function(resolve,reject) {
		_mall.request({
			url     : _mall.getServerUrl('/admin_php/user/getLoveList.php'),
			success : resolve,
			error   : reject
		})		
	}		
}

module.exports = _user;