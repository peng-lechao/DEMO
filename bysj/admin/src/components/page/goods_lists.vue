<template>
	<div>
		<el-dialog title="编辑商品" :visible.sync="dialogFormVisible" class="editGoods" width="600px" :close-on-press-escape="dialogClose" :close-on-click-modal="dialogClose" :show-close="dialogClose">
			<el-form :model="form" :rules="rules" ref="dialogForm">
				<el-form-item label="商品ID" :label-width="formLabelWidth">
		 			<span>{{form.goods_id}}</span>
				</el-form-item>
				<el-form-item label="商品名称" :label-width="formLabelWidth" prop="goods_name">
		 			<el-input v-model="form.goods_name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="商品分类" :label-width="formLabelWidth">
		 			<el-cascader :options="cascaderData" :props="props" @change="handleItemChange" v-model="form.selectedOptions"></el-cascader>
				</el-form-item>
				<el-form-item label="重量(kg)" :label-width="formLabelWidth" prop="weight">
		 			<el-input type="number" v-model="form.weight" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="商品库存" :label-width="formLabelWidth" prop="store_count">
		 			<el-input type="number" v-model="form.store_count" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="市场价(元)" :label-width="formLabelWidth" prop="market_price">
		 			<el-input type="number" v-model="form.market_price" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="本店价(元)" :label-width="formLabelWidth" prop="shop_price">
		 			<el-input type="number" v-model="form.shop_price" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="商品描述" :label-width="formLabelWidth" prop="goods_desc">
		 			<el-input type="textarea" v-model="form.goods_desc" auto-complete="off" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
				</el-form-item>
				<el-form-item label="赠送积分" :label-width="formLabelWidth" prop="give_integral">
		 			<el-input type="number" v-model="form.give_integral" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="是否包邮" :label-width="formLabelWidth">
					<el-radio v-model="form.is_free_shipping" label="1">是</el-radio>
  					<el-radio v-model="form.is_free_shipping" label="0">否</el-radio>
				</el-form-item>
				<el-form-item label="是否热卖" :label-width="formLabelWidth">
					<el-radio v-model="form.is_hot" label="1">是</el-radio>
  					<el-radio v-model="form.is_hot" label="0">否</el-radio>
				</el-form-item>
				<el-form-item label="是否上架" :label-width="formLabelWidth">
					<el-radio v-model="form.is_on_sale" label="1">是</el-radio>
  					<el-radio v-model="form.is_on_sale" label="0">否</el-radio>
				</el-form-item>
				<el-form-item label="商品图片" :label-width="formLabelWidth">
					<el-button type="text" @click="innerVisible = true">修改图片</el-button>
				</el-form-item>
  	  			<el-dialog width="600px" title="修改商品图片" :visible.sync="innerVisible" append-to-body class="innerDialog">
					<el-form-item label="商品主图" :label-width="formLabelWidth">
						<el-upload class="upload-demo" action="/admin_php/goods/goodsImgUpload.php?type=major" :data="form.goods_id" :on-preview="handlePreview" :before-upload="majorCheck" :on-remove="handleRemove" :file-list="fileList" list-type="picture" accept="image/jpg, image/png"  :before-remove="beforeRemove" :on-success="getImgLists">
	  						<el-button size="small" type="primary">点击上传</el-button>
	  						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb，限1张</div>
						</el-upload>
					</el-form-item>
					<el-form-item label="商品图片" :label-width="formLabelWidth">
						<el-upload class="upload-demo" action="/admin_php/goods/goodsImgUpload.php?type=others" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList2" list-type="picture" :before-upload="imgCheck" accept="image/jpg, image/png" :data="form.goods_id" :before-remove="beforeRemove2" :on-success="getImgLists">
							<el-button size="small" type="primary">点击上传</el-button>
	  						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb,限3张</div>
						</el-upload>
					</el-form-item>
					<div slot="footer" class="dialog-footer">
						<el-button @click="innerVisible = false">返 回</el-button> 
					</div>   			
    			</el-dialog>				
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="resetForm('dialogForm')">取 消</el-button>
				<el-button type="primary" @click="submitForm('dialogForm')">确 定</el-button>
			</div>
		</el-dialog>
		<div class="clearfix">
			<div slot="main-title" class="main-title">商品列表</div>
			<div class="search-box">
				<el-input placeholder="请输入内容" v-model="input" class="input-with-select" @keyup.enter="handleSearch">
				    <el-select v-model="select" slot="prepend" placeholder="请选择">
						<el-option v-for="item in searchOptions" :label="item.label" :value="item.value"></el-option>
				    </el-select>
			    	<el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
		  		</el-input>
			</div>
		</div>
		<el-table :data="tableData" style="width: 100%" class="goods_table">
		    <el-table-column type="expand">
		    	<template slot-scope="props">
		        	<el-form label-position="left" inline class="demo-table-expand">
		        		<el-form-item label="商品 ID">
		          			<span>{{ props.row.goods_id }}</span>
		          		</el-form-item>
		          		<el-form-item label="商品名称">
		            		<span>{{ props.row.goods_name }}</span>
		          		</el-form-item>
		          		<el-form-item label="商品分类">
		          			<span v-for="item in props.row.category">{{item.name }} </span>
		          		</el-form-item>
		          		<el-form-item label="商品库存">
		            		<span>{{ props.row.store_count }}</span>
		          		</el-form-item>
		          		<el-form-item label="商品销量">
		            		<span>{{ props.row.sales_sum }}</span>
		          		</el-form-item>
		          		<el-form-item label="重量(kg)">
		            		<span>{{ props.row.weight }}</span>
		          		</el-form-item>
		         		<el-form-item label="市场价(元)">
		            		<span>{{ props.row.market_price }}</span>
		          		</el-form-item>
		          		<el-form-item label="本店价(元)">
		            		<span>{{ props.row.shop_price }}</span>
		          		</el-form-item>
		          		<el-form-item label="是否包邮">
		            		<span v-if="props.row.is_free_shipping =='1'">是</span>
		            		<span v-else>否</span>
		          		</el-form-item>
		          		<el-form-item label="是否热卖">
		            		<span v-if="props.row.is_hot =='1'">是</span>
		            		<span v-else>否</span>
		          		</el-form-item>
		          		<el-form-item label="赠送积分">
		            		<span>{{ props.row.give_integral }}</span>
		          		</el-form-item>
		          		<el-form-item label="商品主图">
		            		<img :src="props.row.original_img" alt="" class="smallImg" @click="showImg(props.row.original_img)">
		          		</el-form-item>
		          		<el-form-item label="是否上架">
		          			<span v-if="props.row.is_on_sale == '1'">是</span>
		            		<span v-else>否</span>
		          		</el-form-item>
		          		<el-form-item label="商品图片">
		          			<img v-for="item in props.row.img" :src="item.url" alt="" @click="showImg(item.url)" class="smallImg">
		          		</el-form-item>
		          		<el-form-item label="商品描述">
		            		<span>{{ props.row.goods_desc }}</span>
		          		</el-form-item>
		        	</el-form>
		    	</template>
		    </el-table-column>
		    <el-table-column label="商品 ID" prop="goods_id" min-width="100%">
		    </el-table-column>
		    <el-table-column label="商品名称" prop="goods_name" min-width="200%">
		    </el-table-column>
		    <el-table-column label="商品描述" prop="goods_desc" min-width="300%">
		    </el-table-column>
		    <el-table-column label="商品销量" prop='sales_sum' min-width="100%">
		    </el-table-column>
		    <el-table-column label="操作" min-width="150%">
     			<template slot-scope="scope">
        			<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        			<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      			</template>
    		</el-table-column>
		</el-table>
		<el-dialog title="图片展示" :visible.sync="dialogVisible" width="500px" class="showBigImg">
 			<img :src="showUrl" alt="" class="bigImg">
		</el-dialog>
	</div>
</template>

<script>
	import _goods from '@/service/goods'
	import _type from '@/service/type'
	export default {
		data(){
			return {
				props:{
					value:'id',
					label:'name'
				},
				tableData: [], 
				select : '',
				input  : '',
				searchOptions: [
					{
						value : 'goods_id',
						label : '商品 ID'
					},
					{
						value : 'goods_name',
						label : '商品名称'
					}
				],
				innerVisible:false,
				dialogVisible: false,
        		dialogFormVisible: false,
        		dialogClose:false,
		        form: {},
		        formLabelWidth: '120px',
				fileList: [],
				fileList2: [],
				showUrl :'',
				action:'',
				rules:{
					goods_name      : { required: true, message: '请输入商品名称', trigger: 'blur' },
					weight          : { required: true, message: '请输入商品重量', trigger: 'blur' },
					store_count     : { required: true, message: '请输入库存数量', trigger: 'blur' },
					market_price    : { required: true, message: '请输入市场价', trigger: 'blur' },
					shop_price      : { required: true, message: '请输入本店价', trigger: 'blur' },
					goods_desc      : { required: true, message: '请输入商品描述', trigger: 'blur' },
					give_integral   : { required: true, message: '请输入赠送积分', trigger: 'blur' },
				}
			}
		},
		mounted() {
			var _this = this;
	    	_goods.getAllGoods(function(res){
	    		_this.tableData = res.data;
	    	},function(err){
	    		_this.$message({
	    			type:'warning',
	    			message:'请求数据出错！'
	    		});
	    	});
    		_type.getTypeList(function(res){
	    		_this.cascaderData = res.data;
	    		console.log(_this.cascaderData);
	    		},function(err){
	    			_this.$message({
	    				type:'warning',
	    				message:'请求数据出错！'
	    			});
    		});
		},
		methods:{
			handleSearch() {
				var _this = this,
				    searchData = {
					type    : _this.select,
					content : _this.input
				};
				if(searchData.type == '') {
		  			_this.$alert('请选择搜索类型!','系统提示',{
		  				confirmButtonText:'确定'
		  			});		
		  			return;			
				}
				else if(searchData.content == '') {
			    	_goods.getAllGoods(function(res){
			    		_this.tableData = res.data;
			    	},function(err){
			    		_this.$message({
			    			type:'warning',
			    			message:'请求数据出错！'
			    		});
			    	});				
				}
				else {
					_goods.searchInfo(searchData,function(res){
						_this.$message({
							type:'success',
							message:'操作成功！'
						});
						_this.tableData = res.data;
						console.log(_this.tableData);
						},function(err){
							_this.$message({
								type:'warning',
								message:'操作失败！'
							});					
					})
				}
			},
			beforeRemove(file,fileList) {
				return false;
			},
			beforeRemove2(file,fileList) {
				var _this = this;
				_goods.deleteImg(file.id,function(res){
					_this.$message({
						type:'success',
						message:'操作成功！'
					});
					_this.fileList2 = fileList;
				},function(err){
					_this.$message({
						type:'warning',
						message:'操作失败！'
					});
					return false;
				});		
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			showImg(url) {
				this.dialogVisible = true;
				this.showUrl = url;
			},
			handleEdit(index, row) {
				var _this = this,
					arr = [];
				_this.dialogFormVisible = true;
				_this.form = row;
				_this.fileList = [{
					name : row.img_name,
					url  : row.original_img
				}];
				_this.fileList2 = row.img;
				row.category.forEach(function(item,index){
					arr.push(item['id']);
					console.log(item,index);
				});
				_this.form.selectedOptions = arr.reverse();
				console.dir(_this.selectedOptions,1);
			},
			handleDelete(index,row) {
				var _this = this;
				_this.$confirm('确认删除？','系统提示',{
	  				confirmButtonText : '确定',
	  				cancelButtonText  : '取消',
	  				type              : 'warning',
					callback:(action,instance)=>{
						if(action == 'confirm'){
							_goods.deleteGoods(row.goods_id,function(res){
								_this.$message({
									type:'success',
									message:'操作成功！'
								});
								_this.tableData.splice(index,1); 
						    	// _goods.getAllGoods(function(res){
						    	// 	_this.tableData = res.data;
						    	// },function(err){
						    	// 	_this.$message({
						    	// 		type:'warning',
						    	// 		message:'请求数据出错！'
						    	// 	});
						    	// });								
							},function(err){
								_this.$message({
									type:'success',
									message:'操作失败！'
								});
							});
						}
					}
	  			});  			
			},
			majorCheck(file) {
				var _this = this;
				if(file.size>512000) {
					_this.$message({
	    				type:'warning',
	    				message:'图片大小超出设定数量！'
	    			});
					return false;
				}
				else{
					_this.fileList = [];
					var url = '/admin_php/image/goods/major/'+_this.form.goods_id+file.name;
					_this.fileList[0] = {
						name : file.name,
						url  : '/admin_php/image/goods/major/'+_this.form.goods_id+file.name
					};	
				}

			},
			imgCheck(file) {
				var _this = this;
				if(_this.fileList2.length >= 3) {
	    			_this.$message({
	    				type:'warning',
	    				message:'图片数量超出设定数量！'
	    			});
					return false;
				}
				if(file.size>512000) {
					_this.$message({
	    				type:'warning',
	    				message:'图片大小超出设定数量！'
	    			});
					return false;
				}
				console.log(_this.fileList2,'x');
			},
			getImgLists(file,fileList) {
				var _this = this;
				_goods.getImgLists(_this.form.goods_id,function(res){
					_this.fileList2 = res.data;
				},function(err){

				});
			},
			submitForm(formName) {
				var _this = this;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						_goods.updateGoods(_this.form,function(res){
				  			_this.$alert('修改成功!','系统提示',{
				  				confirmButtonText:'确定',
				  				callback: action => {
				  					window.location.reload();
								}
				  			});
				  								
						},function(err){
							_this.$alert('修改成功!','系统提示',{
				  				confirmButtonText:'确定',
				  				callback: action => {
				  					window.location.reload();
								}
				  			});
						});
					} else {
						return false;
					}
				});
			},
			resetForm(formName) {
        		this.$refs[formName].resetFields();
        		this.dialogFormVisible = false;
     		}		
		},
	} 
</script>

<style>
.search-box {
	float: right;
}

.search-box .el-select .el-input {
	width: 110px;
}

.search-box .input-with-select .el-input-group__prepend {
	background-color: #fff;
}

.goods_table {
	margin :15px 0;
}

.goods_table .demo-table-expand {
	font-size: 0;
}

.goods_table .demo-table-expand label {
	width: 90px;
	color: #99a9bf;
}

.goods_table .demo-table-expand .el-form-item {
	margin-right: 0;
	margin-bottom: 0;
	width: 50%;
}

.goods_table .demo-table-expand .el-form-item span {
	text-align: left;
}

.editGoods .el-form-item .el-input,
.editGoods .el-form-item textarea.el-textarea__inner {
	width: 80%;
}

.editGoods .el-dialog {
	height: 90%;
	overflow: auto;
}

.innerDialog .upload-demo {
	width: 80%;
}

.goods_table .smallImg {
	width: 40px;
	height: 40px;
	margin-right: 5px;
	border: 1px #eee solid;
	cursor: pointer;
}

.goods_table .smallImg:hover {
	border: 1px #999 solid;

}

.showBigImg .el-dialog{
	padding: 10px;
}

.showBigImg .bigImg {
	width: 440px;
	height: 440px;
}
</style>
