var modoule = (function () {
	var timer = null,
		Items = document.getElementsByClassName("item");
	var arr = [0,1,2,3,4,5,6,7,8];
	var random = function(arr) {	
			arr.sort(function(){ return 0.5 - Math.random(); });
			var newArr = arr.slice(0,3);
			return newArr;
	};
	
	var init = function (arr) {
		for(var i=0;i<arr.length;i++) {
			Items[i].style.background="#FFA600";
		}
	};

	var makeColor = function () {
		var r=Math.floor(Math.random()*256),
			g=Math.floor(Math.random()*256),
			b=Math.floor(Math.random()*256);
		return "rgb("+r+","+g+","+b+")";
	};
	
	var start = function () {
			if(timer!=null) {
				return ;
			}
			timer = setInterval(function () {	
				var newArr = random(arr);
				init(arr);
				for(var i=0;i<newArr.length;i++) {
					Items[newArr[i]].style.background=makeColor();
				}
		    },500);
	};

	var stop = function () {
		clearInterval(timer);
		init(arr);
	};
	return {
		start:start,
		stop:stop
	};
})();
var startBtn = document.querySelector("#start"),
	stopBtn = document.querySelector("#stop");
startBtn.addEventListener('click',modoule.start,false);
stopBtn.addEventListener('click',modoule.stop);


