var modoule = (function () {
//初始化计时器timer，获取九宫格各方块，定义数组arr。
	var timer = null,
		Items = document.getElementsByClassName("item"),
		arr = [0,1,2,3,4,5,6,7,8];
//定义随机函数，返回随机三数
	var random = function(arr) {	
			arr.sort(function(){ return 0.5 - Math.random(); });
			var newArr = arr.slice(0,3);
			return newArr;
	};
//定义初始化函数	
	var init = function (arr) {
		for(var i=0;i<arr.length;i++) {
			Items[i].style.background="#FFA600";
		}
	};
//定义随机颜色函数
	var makeColor = function () {
		var r=Math.floor(Math.random()*256),
			g=Math.floor(Math.random()*256),
			b=Math.floor(Math.random()*256);
		return "rgb("+r+","+g+","+b+")";
	};
//定义开始闪函数
	var start = function () {
			//防止多次点击导致动画出bug
			if(timer!=null) {
				return ;
			}
			//计时器，每隔800ms执行一次随机颜色函数和随机数函数，并将其变色
			timer = setInterval(function () {	
				var newArr = random(arr);
				init(arr);
				for(var i=0;i<newArr.length;i++) {
					Items[newArr[i]].style.background=makeColor();
				}
		    },800);
	};
//定义停止函数
	var stop = function () {
		clearInterval(timer);
		//初始化timer
		timer = null;
		//初始化所有颜色
		init(arr);
	};
//为对象返回两个方法，防止私有属性被修改
	return {
		start:start,
		stop:stop
	};
})();
//定义开始按钮和停止按钮
var startBtn = document.querySelector("#start"),
	stopBtn = document.querySelector("#stop");
//绑定点击函数
startBtn.addEventListener('click',modoule.start);
stopBtn.addEventListener('click',modoule.stop);


