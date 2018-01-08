require('./index.css');
require('page/common/nav/index.js');
require('page/common/nav-route/index.js');
require('page/common/logo-search/index.js');
var _mall = require('util/mall.js'),
    templateIndex = require('./product.string');
console.log(__dirname);
var product = {
	productData :[
		{productId:1,productName:'非花（刺猬紫檀）穿衣镜单件套',imageUrl:'../../image/banner/banner1.jpg',productPrice:'350.00'},
		{productId:1,productName:'非花（刺猬紫檀）穿衣镜单件套',imageUrl:'../../image/banner/banner1.jpg',productPrice:'350.00'},
		{productId:1,productName:'非花（刺猬紫檀）穿衣镜单件套',imageUrl:'../../image/banner/banner1.jpg',productPrice:'350.00'},
		{productId:1,productName:'非花（刺猬紫檀）穿衣镜单件套',imageUrl:'../../image/banner/banner1.jpg',productPrice:'350.00'},
		{productId:1,productName:'非花（刺猬紫檀）穿衣镜单件套',imageUrl:'../../image/banner/banner1.jpg',productPrice:'350.00'},
		{productId:1,productName:'非花（刺猬紫檀）穿衣镜单件套',imageUrl:'../../image/banner/banner1.jpg',productPrice:'350.00'}
	],
	init:function(){
		this.renderProduct();
	},
	renderProduct:function(){
		let templateProduct = _mall.renderHtml(templateIndex,{list:this.productData});
		$('.p-list').html(templateProduct);
	}
}

$(function(){
	product.init();
})