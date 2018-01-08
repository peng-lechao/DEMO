require('./index.css');
require('page/common/logo-search/index.js');
require('page/common/nav/index.js');
require('page/common/nav-route/index.js');


var page = {
	init:function(){
		var url = $('.active-img').attr('src');
		$('.magnifier-wrap').css({"background-image":'url('+url+')',"background-size":"740px 740px"});
		$('.magnifier-wrap').css({"background-size":"740px 740px"});
		this.toggle();
	},
	toggle:function(){
		var _this = this;
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