require('./index.css');
require('page/common/nav/index.js');
require('page/common/logo-search/index.js');
var _mall         = require('util/mall.js'),
 	_cart         = require('service/cart-service.js'),
	templateType  = require('./type-menu.string'),
	templateFloor = require('./floor.string');
// var templateBanner = require('./banner.string');

var index = {
	  listItem:[
	  ],
	  bannerData:[
	  	{id:1,address:"<img src=`<%= require('image/team1.jpg')%>` alt='' />",type:'livingRoom',item:'茶几1'},
	  	{id:2,address:'team2.jpg'+'2',type:'dinnerRoom',item:'茶几2'},
	  	{id:3,address:'team3.jpg',type:'livingRoom',item:'茶几3'}
	  ],
	  floorList:[],
	  init:function(){
	  	this.renderList();
	  	this.renderFloor();
	  	this.slider.init();
	  },
	  slider:{
	  	time:null,
	  	init:function(){
	  		this.initBanner();
	  	  	this.mouseEvent();
	  	},
	  	calLeft:function(){
	  		return Math.ceil(this.getLeft()/-880);
	  	},
	  	getLeft:function(){
	  		return parseInt($('#banner-content').css('left'));
	  	},
	  	initBanner:function(){
	  		var _this = this;
	  			_this.time = setInterval(function(){
	  				let	count = _this.calLeft();
	  					offset = (count+1)*-880;
	  				$('#banner-content').css({"left":offset+'px'});
	  				count++;
	  				if(offset<=-3520){
	  					$('#banner-content').css({"left":"0"});
	  					count = 1;
	  				}
	  				if(_this.calLeft()<3){
	  					_this.dotClass(_this.calLeft()+1);
	  				}else{
	  					_this.dotClass(0);
	  				}
	  			},2000);
	  	},
	  	mouseEvent:function(){
	  		var _this = this;
	  		$('.banner-wrap').mouseenter(function(){
	  			clearInterval(_this.time);
	  		}).mouseleave(function(){
	  			_this.initBanner();
	  		});
	  		$('.prev').click(function(){
	  			let offset = _this.calLeft()*-880+880;	
	  			if(offset > 0){
	  				offset = -2640;
	  				_this.dotClass(3);
	  			}
	  			else{
	  				_this.dotClass(_this.calLeft()-1);
	  			}
	  			$('#banner-content').css({"left":offset+'px'});
	  			
	  		});
	  		$('.next').click(function(){
	  			let  offset = _this.calLeft()*-880-880;	
	  			if(offset< -2640){
	  				offset = 0;
	  				_this.dotClass(0);
	  			}
	  			else{
	  				_this.dotClass(_this.calLeft()+1);
	  			}
	  			$('#banner-content').css({"left":offset+'px'});	
	  		});
	  		$('.dot-item').mouseenter(function(){
	  			let index = $(this).index();
	  			$('#banner-content').css({"left":index*(-880)+'px'});;
	  			_this.dotClass(index);
	  		});
	  	},
	  	dotClass:function(index){
	  		$('.dot-item').removeClass('active');
	  		$(`.dot-item:eq(${index})`).addClass("active");
	  	}
	  },
	  bindEvent:function(){
	  	var _this = this;
	  	$('.list-item').mouseenter(function(){
	  		let index = $(this).index();
	  		_this.menuInit();
	  		$(this).css('background-color','#999');
	  		$('.type-content').show();
	  		$(`.item:eq(${index})`).show(); 		
	  	});
	  	$('.menu').mouseleave(function(){
	  		$('.type-content').hide();
	  		_this.menuInit();
	  	});
	  },
	  menuInit:function(){
	  	$('.list-item').css('background-color','#666');
	  	$('.item').hide();
	  },
	  renderList :function(){
	  	var _this = this;
	  	_cart.getTypeList(function(res){
	  		_this.listItem = res.data;
		  	let templateList = _mall.renderHtml(templateType,{listItem:_this.listItem});
		  	$('.menu').html(templateList);
		  	_this.bindEvent();
	  	},function(errMsg){
	  		_mall.errorTips(errMsg);
	  	});
	  },
	  renderFloor:function(){
	  	var _this = this;
	  	_cart.getFloorList(function(res){
	  		_this.floorList = res.data;
	  		_this.floorList.forEach(function(item,index){
	  			item['index'] = index+1;
	  		});
		  	let templateList = _mall.renderHtml(templateFloor,{list:_this.floorList});
		  	$('.floor-wrap').html(templateList);
	  	},function(errMsg){

	  	});
	  }
};
$(function(){
	index.init();
})
