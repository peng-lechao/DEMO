//创建对象
class SearchBtn {
	// 构造函数
	constructor(id='searchText',btn='btn',area='area'){
		this.id = document.getElementById(id);
		this.btn = document.getElementById(btn);
		this.area = document.getElementById(area);
	}
	// 输出数据
	output(data){  
	  // 调用删除节点函数
	  this.deleteNodes();
	  let len = data.s.length;
	  // 循环输出data.s里面的数据，创造节点，插入数据
	  if(len>0){
	  	  this.area.style.display='block';
		  for(let i=0;i<data.s.length;i++){
		  	let li = document.createElement('li'),
		  		link = document.createElement('a');
		  	link.innerHTML = data.s[i];
		  	link.href = 'https://www.baidu.com/s?wd='+data.s[i];
		  	li.appendChild(link);
		  	this.area.appendChild(li);
		  }
	  }else this.area.style.display='none';
	}
	// 输入框键入时事件
	inputChange(){
		// 获取输入框数据，加入地址中
		let location = 'https://www.baidu.com/s?wd='+this.id.value;
		this.btn.href = location;
		// 使用百度的搜索地址
		let	src = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+this.id.value+"&cb=search.output";
		// 创造新的script节点
		let addScript = document.getElementsByTagName('script'),
			script = document.createElement('script');
		//将地址赋值给src
		script.src = src;
		//防止节点无限插入
		if(addScript.length>1){
			document.body.removeChild(addScript[1]);
		}
		// 当输入框为空时，删除节点，隐藏信息框
		if(this.id.value==''){
			this.area.style.display = 'none';
	  		this.deleteNodes();
		}else {
			document.body.appendChild(script);
		}
	}
	// 循环删除之前节点
	deleteNodes(){
		for(let i=this.area.childNodes.length-1;i>=0;i--){
	 		this.area.removeChild(this.area.childNodes[i]);
	  	}
	}
}

let search = new SearchBtn();
search.id.oninput = search.inputChange.bind(search);


