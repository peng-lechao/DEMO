require('./index.css');
require('page/common/nav/index.js');
require('page/common/logo-search/index.js');
var _mall           = require('util/mall.js');
var templateType  = require('./type-menu.string');
// var templateBanner = require('./banner.string');

var index = {
	  listItem:[
		{floor:1,type:'livingRoom',name:'客厅系列',content:[{item:'茶几1'},{item:'茶几2'},{item:'茶几2'},{item:'茶几2'},{item:'茶几2'}]},
		{floor:2,type:'dinnerRoom',name:'餐厅系列',content:[{item:'茶几2'},{item:'茶几2'}]},
		{floor:3,type:'bedRoom',name:'卧室系列',content:[{item:'茶几3'},{item:'茶几2'}]},
		{floor:4,type:'bookRoom',name:'书房系列',content:[{item:'茶几4'},{item:'茶几2'}]},
		{floor:5,type:'others',name:'其他系列',content:[{item:'茶几5'},{item:'茶几2'}]}
	  ],
	  bannerData:[
	  	{id:1,address:"<img src=`<%= require('image/team1.jpg')%>` alt='' />",type:'livingRoom',item:'茶几1'},
	  	{id:2,address:'team2.jpg'+'2',type:'dinnerRoom',item:'茶几2'},
	  	{id:3,address:'team3.jpg',type:'livingRoom',item:'茶几3'}
	  ],
	  init:function(){
	  	this.renderList();
	  	this.bindEvent();
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
	  	let templateList = _mall.renderHtml(templateType,{listItem:this.listItem});
	  	$('.menu').html(templateList);
	  }
};
$(function(){
	index.init();
})
