require('./index.css');
require('page/common/logo-search/index.js');
require('page/common/nav/index.js');
require('page/common/nav-route/index.js');
var _mall = require('util/mall.js'),
	_user = require('service/user-service.js'),
	_cart = require('service/cart-service.js'),	
	_goods = require('service/goods-service.js'),
	templateIndex = require('./index.string'),
	PostbirdAlertBox = require('util/PostbirdAlertBox/js/PostbirdAlertBox.js');


var page = {
	data:[],
	login:false,
	id:'',
	love:false,
	init:function(){
		this.checkLogin();
		this.id = window.location.search;
		this.id = this.id.substring(this.id.lastIndexOf('=')+1, this.id.length);
		this.getData(this.id);	
	},
	getData(id) {
		var _this = this;
		_goods.getGoodsInfo(id,function(res){
			_this.data = res.data;
			_this.renderGoods();
		},function(errMsg){
			_mall.errorTips(errMsg);
		});
	},
	renderGoods:function(){
		let templateProduct = _mall.renderHtml(templateIndex,{list:this.data});
		$('.page-wrap').append(templateProduct);
		this.toggle();
		this.bindEvent();
		this.initLoveBtn();
	},
	toggle:function(){
		var _this = this;		
		var url = $('.active-img').attr('src');		
		$('.magnifier-wrap').css({"background-image":'url('+url+')',"background-size":"740px 740px"});
		$('.magnifier-wrap').css({"background-size":"740px 740px"});
		$('.gallery-item').click(function(){
			var src = $(this).find('img').attr('src')
			$('.gallery-item').removeClass('active');
			$(this).addClass('active');
			$('.active-img').attr('src',src);
			$('.magnifier-wrap').css({"background-image":'url('+src+')'});
		});
		$('.img-wrap').mouseover(function(){
			$('.magnifier-wrap').show();
			$('.img-show').show();
			magnifier.mousemove();
		}).mouseout(function(){
			$('.magnifier-wrap').hide();
			$('.img-show').hide();
		});
	},
	initLoveBtn:function() {
		var _this = this;
		if(_this.login){
			_user.checkLove(_this.id,function(res){
				$('#love-icon').attr('class','fa fa-heart love-i');
				$('#love-text').text('已收藏');
				_this.love = true;
			},function(errMsg){

			});			
		}
	},
	bindEvent:function() {
		var _this = this;
		$('#add-btn').click(function(res){
			var count = $('#count-text').attr('value');
			count++;
			$('#count-text').attr('value',count.toString());
		});	
		$('#reduce-btn').click(function(res){
			var count = $('#count-text').attr('value');
			if(count>1) {
				count--;
			}
			$('#count-text').attr('value',count.toString());
		});	
		$('#buy-btn').click(function(){
			if(_this.login) {
				_this.data[0].count = parseInt($('#count-text').attr('value'));
				_this.data[0].sum_price = parseInt($('#count-text').attr('value'))*$('strong').html()+'.00';
				_cart.uploadSession(_this.data,function(res){
			 		window.location.href = './confirm-order.html'
			 	},function(errMsg){
			 		_mall.errorTips(errMsg);
			 	});
			}
			else {
				_this.confirmLogin();
			}
		});
		$('#cart-btn').click(function(){
			if(_this.login) {
				var count = parseInt($('#count-text').attr('value'));
				goods_info = {
					goods_id     : _this.id,
					goods_num    : count
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
			}
			else {
				_this.confirmLogin();
			}
		});
		$('#love-btn').click(function(){
			if(_this.login) {
				if(_this.love) {
					_user.deleteLove(_this.id,function(res){
						$('#love-icon').attr('class','fa fa-heart-o not-love-i');
						$('#love-text').text('收藏');
						_this.love = false;						
						PostbirdAlertBox.alert({
						    'title': '提示',
						    'content': '取消收藏成功！',
						    'okBtn': '好的',
						    'contentColor': 'red'
						});							
					},function(errMsg){

					});
				}
				else {
					_user.addLove(_this.id,function(res){
						$('#love-icon').attr('class','fa fa-heart love-i');
						$('#love-text').text('已收藏');
						_this.love = true;	
						PostbirdAlertBox.alert({
						    'title': '提示',
						    'content': '收藏成功！',
						    'okBtn': '好的',
						    'contentColor': 'red'
						});							
					},function(errMsg){

					});					
				}
			}
			else {
				_this.confirmLogin();
			}
		});		

	},
	checkLogin:function() {
		var _this = this;
		_user.checkLogin(function(res){
			_this.login = true;
		},function(errMsg){
			_this.login = false;
		});
	},
	confirmLogin:function(){
		PostbirdAlertBox.confirm({
		    'title': '登录提示',
		    'content': '您还没有登录，是否前往登录！',
		    'okBtn': '前往登录',
		    'cancelBtn' : '暂时不了',
		    'contentColor': 'red',
		    'onConfirm': function () {
		        _mall.doLogin();
		    }
		});		
	}
}

var magnifier = {
	mousemove:function(){
		let _this = this;
		var top  = $('.active-img').offset().top,
			left = $('.active-img').offset().left;
		$('.img-wrap').mousemove(function(e){
			var offsetTop  = parseInt(e.pageY - top - 75),
			    offsetLeft = parseInt(e.pageX - left - 75);
			offsetTop = offsetTop<0?0:(offsetTop>220?220:offsetTop);	
			offsetLeft = offsetLeft<0?0:(offsetLeft>220?220:offsetLeft);
			$('.img-show').css({"left":offsetLeft +'px',"top":offsetTop +'px'});
			$('.magnifier-wrap').css({"background-position-x":-offsetLeft*2+'px',"background-position-y":-offsetTop*2+'px'});
		});
	}
}

page.init();