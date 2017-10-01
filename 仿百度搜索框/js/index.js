//创建对象
class Base {
	// 构造函数
	constructor(data){
		this.data = data;
		this.bind();
	}

	get(key){
		return this.data[key];
	}
}

class SearchBtn extends Base{
	bind(){
		let self = this;
		self.get('searchText').addEventListener('input',function(){
			self.change();
		});
	}

	change(){
		let value = this.get('searchText').value;
		// 获取输入框数据，加入地址中
		let location = 'https://www.baidu.com/s?wd='+value;
		this.get('btn').href = location;
		// 使用百度的搜索地址
		let	src = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+value+"&cb=search.output";
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
		if(value==''){
			this.get('area').style.display = 'none';
	  		this.deleteNodes();
		}else {
			document.body.appendChild(script);
		}
	}

	output(data){  
	  // 调用删除节点函数
	  this.deleteNodes();
	  let len = data.s.length;
	  // 循环输出data.s里面的数据，创造节点，插入数据
	  if(len>0){
	  	  this.get('area').style.display='block';
		  for(let i=0;i<data.s.length;i++){
		  	let li = document.createElement('li'),
		  		link = document.createElement('a');
		  	link.innerHTML = data.s[i];
		  	link.href = 'https://www.baidu.com/s?wd='+data.s[i];
		  	li.appendChild(link);
		  	this.get('area').appendChild(li);
		  }
	  }else this.get('area').style.display='none';
	}

	deleteNodes(){
		for(let i=this.get('area').childNodes.length-1;i>=0;i--){
 			this.get('area').removeChild(this.get('area').childNodes[i]);
  		}
	}
}

let data = {
	searchText:document.getElementById("searchText"),
	btn:document.getElementById("btn"),
	area:document.getElementById("area")
};
let search = new SearchBtn(data);


