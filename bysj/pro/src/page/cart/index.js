require('./index.css');
require('page/common/logo-search/index.js');
require('page/common/nav/index.js');
require('page/common/nav-route/index.js');
var _mall = require('util/mall.js'),
	_cart = require('service/cart-service.js'),
	_user = require('service/user-service.js'),
	_goods = require('service/goods-service.js'),
	templateIndex = require('./index.string'),
	PostbirdAlertBox = require('util/PostbirdAlertBox/js/PostbirdAlertBox.js');

var cart = {
	data:[],
	checkedData:[],
	init:function(){
		this.loadInfo();
	},
	loadInfo:function(){
		var _this = this;
		_cart.getCartInfo(function(res){
			res.data.forEach(function(item,index){
				item.sum = _this.changeTwoDecimal_f(item.goods_num*item.shop_price);
			});
			_this.data = res.data;
			_this.renderHtml();
		},function(errMsg){
			_mall.errorTips(errMsg);
		});
	},
	renderHtml:function(){
		let templateProduct = _mall.renderHtml(templateIndex,{list:this.data});
		$('.order_content').html(templateProduct);
		this.bindEvent();
	},
	bindEvent:function(){
		    //全局的checkbox选中和未选中的样式
		var $allCheckbox = $('input[type="checkbox"]'),     //全部checkbox
		    $wholeChexbox = $('.whole_check'),				//全选
		    $cartBox = $('.cartBox'),                       //每个商品的checkbox
		    $sonCheckBox = $('.son_check'),
		    $plus = $('.plus'),
		    $reduce = $('.reduce'),
		    $all_sum = $('.sum'),
		    _this = this;

		 //每个商品的checkbox
		$allCheckbox.click(function () {
		    if ($(this).is(':checked')) {
		        $(this).next('label').addClass('mark');
		    } else {
		        $(this).next('label').removeClass('mark')
		    }
		});

		// 全选按钮和单个的关系
		$wholeChexbox.click(function () {
		    var $checkboxs = $cartBox.find('input[type="checkbox"]');
		    console.log($(this).is(':checked'));
		    if ($(this).is(':checked')) {
		        $checkboxs.prop("checked", true);
		        $checkboxs.next('label').addClass('mark');
		    } else {
		        $checkboxs.prop("checked", false);
		        $checkboxs.next('label').removeClass('mark');
		    }
		    _this.totalMoney();
		});


		$sonCheckBox.each(function () {
		    $(this).click(function () {
		        if ($(this).is(':checked')) {
		            //判断：所有单个商品是否勾选
		            var len = $sonCheckBox.length;
		            var num = 0;
		            $sonCheckBox.each(function () {
		                if ($(this).is(':checked')) {
		                    num++;
		                }
		            });
		            if (num == len) {
		                $wholeChexbox.prop("checked", true);
		                $wholeChexbox.next('label').addClass('mark');
		            }
		        } else {
		            //单个商品取消勾选，全局全选取消勾选
		            $wholeChexbox.prop("checked", false);
		            $wholeChexbox.next('label').removeClass('mark');
		        }
		        _this.totalMoney();
		    })
		})

		//=================================================商品数量==============================================
		$plus.click(function () {
		    var $inputVal = $(this).prev('input'),
		        $count = parseInt($inputVal.val())+1,
		        $obj = $(this).parents('.amount_box').find('.reduce'),
		        $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
		        $price = $(this).parents('.order_lists').find('.price').html(),  //单价
		        $priceTotal = $count*parseInt($price.substring(1));
		    $inputVal.val($count);
		    $priceTotalObj.html('￥'+_this.changeTwoDecimal_f($priceTotal));
		    if($inputVal.val()>1 && $obj.hasClass('reSty')){
		        $obj.removeClass('reSty');
		    }
		    _this.totalMoney();
		    $(this).mouseleave(function(){
				var info = {
				    	goods_id  :  $(this).parents('.order_lists').find('.goods_id').val(),
				    	goods_num :  parseInt($inputVal.val())
				    };
			    _this.updateCart(info);
			});
		});

		$reduce.click(function () {
		    var $inputVal = $(this).next('input'),
		        $count = parseInt($inputVal.val())-1,
		        $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
		        $price = $(this).parents('.order_lists').find('.price').html(),  //单价
		        $priceTotal = $count*parseInt($price.substring(1));
		    if($inputVal.val()>1){
		        $inputVal.val($count);
		        $priceTotalObj.html('￥'+_this.changeTwoDecimal_f($priceTotal));
		    }
		    if($inputVal.val()==1 && !$(this).hasClass('reSty')){
		        $(this).addClass('reSty');
		    }
		    _this.totalMoney();
		    var info = {
			    	goods_id     : $(this).parents('.order_lists').find('.goods_id').val(),
			    	goods_num    : parseInt($inputVal.val())
			    };
		    _this.updateCart(info);
		});

		$all_sum.change(function () {
		    var $count = 0,
		        $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
		        $price = $(this).parents('.order_lists').find('.price').html(),  //单价
		        $priceTotal = 0;
		    if($(this).val()==''){
		        $(this).val('1');
		    }
		    else {
		    	$(this).val($(this).val().replace(/\D|^0/g,''));
			    $count = $(this).val();
			    $priceTotal = $count*parseInt($price.substring(1));
			    $(this).attr('value',$count);
			    $priceTotalObj.html('￥'+_this.changeTwoDecimal_f($priceTotal));
			    var info = {
			    	goods_id     : $(this).parents('.order_lists').find('.goods_id').val(),
			    	goods_num    : $count
				};
				_this.updateCart(info);
			    _this.totalMoney();
		    }
		})

		//======================================移除商品========================================

		$('.delBtn').click(function () {
		    var $order_lists = $(this).parents('.order_lists'),
		        $order_content = $order_lists.parents('.order_content'),
		        goods_id = $order_lists.find('.goods_id').val();
   				PostbirdAlertBox.confirm({
				    'title': '提示',
				    'content': '确认移除宝贝？',
				    'okBtn': '好的',
				    'onConfirm': function () {
	        			_cart.deleteCart(goods_id,function(res){
						    $order_lists.remove();
						    _this.data.splice($order_lists.index(),1);
						    if($order_content.html().trim() == null || $order_content.html().trim().length == 0){
						        window.location.reload();
						    }
						    $sonCheckBox = $('.son_check');
						    _this.totalMoney();	        				
	        			},function(errMsg){
	        				_mall.errorTips(errMsg);
	        			});
	   				},
				    'contentColor': 'red'
				});	
		});

		$('.calBtn').click(function(){
			var $sonChecks = $('.cartBox').find('.son_check');
			$sonChecks.each(function () {
			 	if ($(this).is(':checked')) {
			 		var data = _this.data[$(this).parents('.order_lists').index()];
			 		data.count = $(this).parents('.order_lists').find('.sum').val();
			 		data.sum_price = $(this).parents('.order_lists').find('.sum_price').html().substring(1);
			 		_this.checkedData.push(data);
			 	}	 	
			});
			if(_this.checkedData){
				_cart.uploadSession(_this.checkedData,function(res){
			 		window.location.href = './confirm-order.html?from=cart'
			 	},function(errMsg){
			 		_mall.errorTips(errMsg);
			 	});
			}
		});
	},
    totalMoney:function() {
        var total_money = 0,
  			total_count = 0,
			calBtn = $('.calBtn a'),
        	$sonCheckBox = $('.son_check'),
        	_this = this;
        $sonCheckBox.each(function () {
            if ($(this).is(':checked')) {
                var goods = parseInt($(this).parents('.order_lists').find('.sum_price').html().substring(1));
                var num =  parseInt($(this).parents('.order_lists').find('.sum').val());
                total_money += goods;
                total_count += num;
            }
        });
        $('.total_text').html('￥'+_this.changeTwoDecimal_f(total_money));
        $('.piece_num').html(total_count);

        // console.log(total_money,total_count);

        if(total_money!=0 && total_count!=0){
            if(!calBtn.hasClass('btn_sty')){
                calBtn.addClass('btn_sty');
            }
        }else{
            if(calBtn.hasClass('btn_sty')){
                calBtn.removeClass('btn_sty');
            }
        }
    },
    changeTwoDecimal_f:function(x) {    
	　　var f_x = parseFloat(x);    
	　　if (isNaN(f_x)) {    
	　　　　return 0;    
	　　}    
	　　var f_x = Math.round(x*100)/100;    
	　　var s_x = f_x.toString();    
	　　var pos_decimal = s_x.indexOf('.');    
	　　if (pos_decimal < 0){    
	　　　　pos_decimal = s_x.length;    
	　　　　s_x += '.';    
	　　}    
	　　while (s_x.length <= pos_decimal + 2) {    
	　　　　s_x += '0';    
	　　}    
	　　return s_x;    
	},
	updateCart:function(info){
	    _cart.updateCart(info,function(res){
	    	// do nothing
	    },function(errMsg){
	    	// do nothing
	    });
	}
}

cart.init();

