require('./index.css');
require('page/common/nav/index.js');
require('page/common/nav-route/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mall = require('util/mall.js');
$(function(){
	navSide.init({
		name:'about'
	})
})