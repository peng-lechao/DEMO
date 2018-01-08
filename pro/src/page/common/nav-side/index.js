require('./index.css');
var _mall = require('util/mall.js');
var templateNavSide = require('./navList.string');

var navSide = {
	navList : {
		name:'',
		list:[
			{name : 'user-center', desc : '个人中心', href: './user-center.html', iconClass: 'fa fa-user'},
            {name : 'order-list', desc : '我的订单', href: './order-list.html', iconClass: 'fa fa-reorder'},
            {name : 'user-pw-update', desc : '修改密码', href: './user-pw-update.html', iconClass: 'fa fa-lock'},
            {name : 'user-address', desc : '收货地址', href: './user-address.html', iconClass: 'fa fa-address-card'},
            {name : 'about', desc : '关于我们', href: './about.html', iconClass: 'fa fa-thumbs-up'}
		]
	},
	init:function(param){
		$.extend(this.navList,param);
		this.renderNav();
	},
	renderNav:function(){
		for(let i=0;i<this.navList.list.length;i++){
			if(this.navList.list[i].name == this.navList.name){
				this.navList.list[i].isActive = true;
			}
		}
		var templateResult = _mall.renderHtml(templateNavSide,{
			navList:this.navList.list
		})
		$('.nav-side').html(templateResult);
	}
}

module.exports = navSide;