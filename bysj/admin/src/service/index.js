import axios from 'axios'
import qs from 'qs'
var serverHost = 'http://localhost:8080';
var _admin =	{
		request : function(param) {
				var _this = this;
				console.log(param);
		// 		    	axios({
		// 	methods  : param.method||'get',
		// 	url      : param.url||'',
		// 	data     : param.data || ''
		// })
		// .then(function(res){
		// 	console.log(res);
		// })
		// .catch(function(error){
		// 	console.log(error);
		// })
				axios({
					method   : param.method||'get',
					url      : param.url||'',
					data     : qs.stringify(param.data) || '',
					dataType : 'json',
					headers: {
    					'Content-Type': 'application/x-www-form-urlencoded'
 					}
				}).then(function(res){
					// 请求成功
					if(res.data.status === 10) {
						typeof param.success === 'function' && param.success(res.data);
					}
					// 未登录，强制登录
					else if(res.data.status === 1) {
						_this.doLogin();
					}
					// 请求数据出错
					else if(res.data.status === 0) {
						typeof param.error === 'function' && param.error(res.data.msg);
					}
				}).catch(function(error){
					typeof param.error === 'function' && param.error(error.statusText);
				});
		},
		doLogin : function(){
			window.location.href = 'login';
		},
		getServerUrl : function(path){
	        return serverHost + path;
	    }
}

export default _admin;