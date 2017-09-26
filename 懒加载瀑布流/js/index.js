//设置数据
let imgData = {"data":[{"src":"img/1.jpg"},{"src":"img/2.jpg"},{"src":"img/3.jpg"},
	{"src":"img/4.jpg"},{"src":"img/5.jpg"},{"src":"img/6.jpg"},
	{"src":"img/7.jpg"},{"src":"img/8.jpg"},{"src":"img/9.jpg"},{"src":"img/10.jpg"},{"src":"img/11.jpg"},{"src":"img/12.jpg"},{"src":"img/13.jpg"},{"src":"img/14.jpg"}]};

class WaterFall{
	
	constructor(data,content='box',parent='container'){
		this.imgData = data;
		this.parent = document.getElementById(parent);
		this.content = document.getElementsByClassName(content);
	}

	init(){
		//初始化照片
		for(let i = 0;i<13;i++){			
			var box = document.createElement('div'),
				img = document.createElement('img');
			this.parent.appendChild(box);
			box.className = "box";
			img.src = this.imgData.data[i].src;
			box.appendChild(img);
			img.onload = this.imgLocation.bind(module);
		}
	}

	imgLocation(){
		let boxWidth = this.content[0].offsetWidth,//获取box宽度
	   		column = Math.floor(this.parent.offsetWidth / boxWidth);//设置列数
	   		this.parent.style.cssText="width:"+(column*boxWidth)+"px;margin:0 auto";//居中
	   	//定位元素位置
	   	for(let i = 0,arr=[];i<this.content.length;i++){
			if (i < column){
				arr[i] = this.content[i].offsetHeight;
				console.log(arr);
			}
			else {
				//寻找最小高度值
				let minHight = this.getMin(arr);
				for (let index in arr){
					if(arr[index]==minHight){
						var minIndex=index;
					}
				}
				this.content[i].className = "box";
				this.content[i].style.cssText = "position:absolute;top:"+arr[minIndex]+"px;left:"+minIndex*boxWidth+"px";//定位元素坐标
				arr[minIndex] = arr[minIndex] + this.content[i].offsetHeight;//更新最小高度
			}
		}
	}
	//获取最小高度
	getMin(arr){
		for(var j=0,min=arr[0];j<arr.length;j++){
			min=Math.min(min,arr[j])
		}
			return min;
	}
	//检查是否滚动到最后一行
	checkTop(){
		let lastContentTop = this.content[this.content.length-1].offsetTop,
			scrollTop = document.body.scrollTop,
		    pageTop = document.documentElement.clientHeight;
		if(scrollTop + pageTop>lastContentTop){
			return true;
		}
	}
	//定义滚动条事件
	scroll(){
		if(this.checkTop()){
			for(let i = 0;i<this.imgData.data.length;i++){			
				let box = document.createElement('div'),
					img = new Image();
				img.src = this.imgData.data[i].src;
				this.parent.appendChild(box);
				box.appendChild(img);
				box.className = "box hide";	
			}
			this.imgLocation();
		}
	}
}

let module = new WaterFall(imgData);
window.onload = module.init.bind(module);
window.onscroll = module.scroll.bind(module);