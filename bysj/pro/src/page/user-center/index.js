require('./index.css');
require('page/common/nav/index.js');
require('page/common/nav-route/index.js');
var _mall = require('util/mall.js'),
	_user = require('service/user-service.js'),
	navSide = require('page/common/nav-side/index.js'),
	templatePage = require('./index.string');


var page = {
	init:function(){
		navSide.init({
			name:'user-center'
		});
		this.loadUserInfo();
	},
	loadUserInfo:function(){
		_user.getUserInfo(function(res){
			let userInfo = _mall.renderHtml(templatePage,res.data);
			$('.page-content').html(userInfo);
		},function(errMsg){
			_mall.errorTips(errMsg);
		})
	}
}


$(function(){
	page.init();
})