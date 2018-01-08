'use strict';
var Hogan = require('hogan.js');
var conf = {
	serverHost:'http://localhost:8080'
};
var _mall = {
	request : function (param){
		var _this = this;
		$.ajax({
			type     : param.type||'GET',
			url 	 : param.url||'',
			dataType : param.dataType||'JSON',
			data     : param.data||'',
			success  : function(res){
				// 请求数据成功
				if(res.status === 10) {
					typeof param.success === 'function' && param.success(res);
				}
				// 未登录，强制登录
				else if(res.status === 1) {
					_this.doLogin();
				}
				// 请求数据出错
				else if(res.status === 0) {
					 typeof param.error === 'function' && param.error(res.msg);
				}
			},
			error    : function(err) {
				 typeof param.error === 'function' && param.error(err.statusText);
			}
		})
	},
	errorTips : function(msg){
       alert(msg || '哪里不对了~');
    },
	renderHtml: function (template,data){
		var compileTemplate = Hogan.compile(template);
		var result = compileTemplate.render(data);
		return result;
	},
	//获取URL
	getServerUrl : function(path){
        return conf.serverHost + path;
    },
	// 获取url参数
	getUrlParam : function(name){
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		var result = window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	},
	// 登录
	doLogin : function (){
		window.location.href = './user-login.html?redirect='+encodeURIComponent(window.location.href);
	},
	// 返回首页
	goHome : function (){
		window.location.href = './index.html';
	},
	//表单验证
	validate : function(value,type){
		if(type === 'require') {
			return !!value;
		}
		if(type == 'phone') {
			return /^1\d{10}$/.test(value);
		}
		if(type == 'email') {
			return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
		}
	}
};

module.exports = _mall;