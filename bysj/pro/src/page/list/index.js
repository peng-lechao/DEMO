require('./index.css');
require('page/common/nav/index.js');
require('page/common/nav-route/index.js');
require('page/common/logo-search/index.js');
var _mall = require('util/mall.js'),
	_goods = require('service/goods-service.js'),
	_cart  = require('service/cart-service.js'),
    templateIndex = require('./product.string'),
    paging = require('util/pagination/paging.js'),
    PostbirdAlertBox = require('util/PostbirdAlertBox/js/PostbirdAlertBox.js');
var product = {
	productData :[
		// {productId:1,productName:'非花（刺猬紫檀）穿衣镜单件套',imageUrl:'../../image/banner/banner1.jpg',productPrice:'350.00'},
		// {productId:1,productName:'非花（刺猬紫檀）穿衣镜单件套',imageUrl:'../../image/banner/banner1.jpg',productPrice:'350.00'},
		// {productId:1,productName:'非花（刺猬紫檀）穿衣镜单件套',imageUrl:'../../image/banner/banner1.jpg',productPrice:'350.00'},
		// {productId:1,productName:'非花（刺猬紫檀）穿衣镜单件套',imageUrl:'../../image/banner/banner1.jpg',productPrice:'350.00'},
		// {productId:1,productName:'非花（刺猬紫檀）穿衣镜单件套',imageUrl:'../../image/banner/banner1.jpg',productPrice:'350.00'},
		// {productId:1,productName:'非花（刺猬紫檀）穿衣镜单件套',imageUrl:'../../image/banner/banner1.jpg',productPrice:'350.00'}
	],
	sortData:[],
	data:[],
	init:function(){
		var _this = this;
		if(!!_mall.getUrlParam('search')){
			_goods.getSearchGoods(_mall.getUrlParam('search'),function(res){
				_this.productData = _this.deepCopy(res.data,_this.productData);
				_this.sortData = _this.deepCopy(res.data,_this.sortData);
				_this.renderPage(_this.productData);
			},function(errMsg){
				_mall.errorTips(errMsg)
			});			
		}
		else if(!!_mall.getUrlParam('id')) {
			_goods.getItemGoods(_mall.getUrlParam('id'),function(res){
				_this.productData = _this.deepCopy(res.data,_this.productData);
				_this.sortData = _this.deepCopy(res.data,_this.sortData);
				_this.renderPage(_this.productData);
			},function(errMsg){
				_mall.errorTips(errMsg)	
			});
		}
		else {
			_goods.getTypeGoods(_mall.getUrlParam('type'),function(res){
				_this.productData = _this.deepCopy(res.data,_this.productData);
				_this.sortData = _this.deepCopy(res.data,_this.sortData);
				_this.renderPage(_this.productData);
			},function(errMsg){
				_mall.errorTips(errMsg)	
			});
		}
	},
	renderPage:function(data){
		var _this = this;
		if(data.length == 0) {
			$('.pagination').hide();
			_this.renderGoods(data);			
		}
		else {
			var	totalPages = parseInt(data.length/10)+1,
				totalCount = data.length;
			$('#box').paging({
			    initPageNo: 1, // 初始页码
			    totalPages: totalPages, //总页数
			    totalCount: '合计'+totalCount+'条数据', // 条目总数
			    slideSpeed: 600, // 缓动速度。单位毫秒 
			    callback: function(page) { // 回调函数 
			    	_this.data = data.slice((page-1)*10,(page-1)*10+10);
			        _this.renderGoods(_this.data);
	    		}	
			})
		}		
	},
	renderGoods:function(data) {
		let templateProduct = _mall.renderHtml(templateIndex,{list:data});
		$('.p-list').html(templateProduct);
		this.bindEvent();
	},
	ascSort:function(){
		this.sortData.sort(function(a,b){
			return a.shop_price - b.shop_price;
		});
		console.log(this.sortData);
		this.renderPage(this.sortData);
	},
	descSort:function(){
		this.sortData.sort(function(a,b){
			return b.shop_price - a.shop_price;
		});
		console.log(this.sortData);
		this.renderPage(this.sortData);
	},
	bindEvent:function() {
		var _this = this;
		console.log(this.sortData);
		$('.sort-item').click(function(){
			$(this).addClass('active');
			$('.default-item').removeClass('active');
			if($('.fa-sort-asc').hasClass('checked')){
				$('.fa-sort-asc').removeClass('checked');
				$('.fa-sort-desc').addClass('checked');
				_this.descSort();
			}
			else{
				$('.fa-sort-desc').removeClass('checked');
				$('.fa-sort-asc').addClass('checked');
				_this.ascSort();				
			}
		})

		$('.default-item').click(function(){
			$(this).addClass('active');
			$('.sort-item').removeClass('active');
			_this.renderPage(_this.productData);
			$('.fa').removeClass('checked');			
		})

		$('.add-cart').click(function(e){
			e.p
			e.stopPropagation();
			console.log('1');
			var goods_id = $(this).data("id"),
				goods_info = {
					goods_id     : goods_id,
					goods_num    : 1
				};
			_cart.addCart(goods_info,function(err){
				PostbirdAlertBox.confirm({
				    'title': '提示',
				    'content': '加入购物车成功！',
				    'okBtn': '查看购物车>>',
				    'cancelBtn' : '继续购物',
				    'contentColor': 'red',
				    'onConfirm': function () {
				        window.location.href ="./cart.html";
				    }
				});						
			},function(err){
				_mall.errorTips(errMsg);
			});
		})
	},
	deepCopy:function (p,c){
	    var c=c||{}; 
	    for(var i in p){
	        if(typeof p[i]==="object"){
	            c[i]=(p[i].constructor===Array)? [] : {};
	　　　　　　　this.deepCopy(p[i],c[i]);
	        }else{
	            c[i]=p[i];
	        }
	    }        
	    return c;
	}
}

$(function(){
	product.init();
})