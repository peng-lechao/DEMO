<template>
	<div>
		<div class="clearfix">
			<div slot="main-title" class="main-title">添加商品</div>
		</div>
<!-- 		<el-steps :active="active" finish-status="success">
		 	<el-step title="步骤 1" description="请填写商品基本信息"></el-step>
		 	<el-step title="步骤 2" description="请上传商品图片"></el-step>
		 	<el-step title="步骤 3" description="完成添加"></el-step>
		</el-steps> -->
		<div class="step1">
			<el-form :model="form" :rules="rules" ref="addForm" class="add_goods_form" v-show="formVisible">
				<el-form-item label="商品 ID" :label-width="formLabelWidth" prop="goods_id">
		 			<el-input v-model="form.goods_id" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="商品名称" :label-width="formLabelWidth" prop="goods_name">
		 			<el-input v-model="form.goods_name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="商品分类" :label-width="formLabelWidth" prop="selectedOptions">
		 			<el-cascader :options="form.cascaderData" :props="props" @change="handleItemChange" v-model="form.selectedOptions"></el-cascader>
				</el-form-item>
				<el-form-item label="商品主图" :label-width="formLabelWidth" prop="original_img">
					<el-upload class="upload-demo" ref="upload" action="/admin_php/goods/goodsImgUpload.php" :file-list="fileList" :auto-upload="false" list-type="picture" accept="image/jpg,image/png" :on-change="checkImgCount" :data="form.goods_id" :on-remove="onRemove">
  						<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
  						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>					
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
				<el-form-item label="是否包邮" :label-width="formLabelWidth" class="radioBox">
					<el-radio v-model="form.is_free_shipping" label="1">是</el-radio>
						<el-radio v-model="form.is_free_shipping" label="0">否</el-radio>
				</el-form-item>
				<el-form-item label="是否热卖" :label-width="formLabelWidth" class="radioBox">
					<el-radio v-model="form.is_hot" label="1">是</el-radio>
						<el-radio v-model="form.is_hot" label="0">否</el-radio>
				</el-form-item>
				<el-form-item label="是否上架" :label-width="formLabelWidth" class="radioBox">
					<el-radio v-model="form.is_on_sale" label="1">是</el-radio>
						<el-radio v-model="form.is_on_sale" label="0">否</el-radio>
				</el-form-item>
			</el-form>
			<div slot="footer" class="add_goods_footer">
				<el-button type="primary" @click="nextForm('addForm')" v-show="formVisible">下一步</el-button>
			</div>
		</div>
		<div class="step2" v-show="imgVisible">
			<div class="upload-title">上传商品图片</div> 
			<el-upload class="upload-demo" :before-upload="beforeUpload" action="/admin_php/goods/goodsImgUpload.php?type=others" list-type="picture-card" :on-preview="handlePictureCardPreview" :file-list="fileList2" :on-success="Onsuccess" :data="form.goods_id" :before-remove="beforeRemove"  accept="image/jpg,image/png">
				<i class="el-icon-plus"></i>
				<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload>
			<el-dialog :visible.sync="dialogVisible">
  				<img width="100%" :src="dialogImageUrl" alt="">
			</el-dialog>
			<div slot="footer" class="img_footer">
				<el-button type="primary" @click="finish">完成</el-button>
			</div>
		</div>	
	</div>
</template>
<script>
	import _goods from '@/service/goods'
	import _type from '@/service/type'
	export default {
		data() {
			var validateGoodsId = (rule, value, callback) => {
				_goods.checkGoodsId(value,function(res){
					callback();
				},function(err){
					callback(new Error('商品 ID已存在!'));
				});
			};
			var validateImg = (rule, value, callback) => {
				 	if(this.fileList.length != 0) {
				 		callback();
				 	}
				 	else{
				 		callback(new Error('请选取商品主图！'));
				 	}
					
			};
			return {
				props:{
					value:'id',
					label:'name'
				},
				active: 0,
				formVisible:true,
				imgVisible:false,
				form:{
					is_free_shipping:'0',
					is_hot:'0',
					is_on_sale:'0',
					cascaderData:[],
					selectedOptions:[]
				},
				formLabelWidth: '120px',
				rules:{
					goods_id   	    : [
						{ required: true, message: '请输入商品 ID', trigger: 'blur' },
						{ validator: validateGoodsId, trigger: 'blur' }
					],
					goods_name      : { required: true, message: '请输入商品名称', trigger: 'blur' },
					weight          : { required: true, message: '请输入商品重量', trigger: 'blur' },
					selectedOptions : { required: true, message: '请选择商品分类', trigger: 'blur' },
					store_count     : { required: true, message: '请输入库存数量', trigger: 'blur' },
					original_img    : [
						{ validator: validateImg, trigger: 'submit' }

					],
					market_price    : { required: true, message: '请输入市场价', trigger: 'blur' },
					shop_price      : { required: true, message: '请输入本店价', trigger: 'blur' },
					goods_desc      : { required: true, message: '请输入商品描述', trigger: 'blur' },
					give_integral   : { required: true, message: '请输入赠送积分', trigger: 'blur' },
				},
				fileList:[],
				fileList2:[],
				dialogImageUrl:'',
				dialogVisible:false
			};
		},
		mounted() {
			var _this = this;
    		_type.getTypeList(function(res){
	    		_this.form.cascaderData = res.data;
	    		},function(err){
	    			_this.$message({
	    				type:'warning',
	    				message:'请求数据出错！'
	    			});
    		});
		},
		methods: {
			next() {
				if (this.active++ > 2) this.active = 0;
			},
			checkImgCount(file,fileList) {
				console.log(this);
				console.log(fileList,this.fileList,this.fileList.length,21);
				if(file.size < 512000) {
					if(fileList.length>1) {
						fileList.splice(0,1);
					}
	    		}
	    		else {
	    			this.$message({
	    				type:'warning',
	    				message:'图片大小超出设定！'
	    			});
	    			fileList.splice(1,1);
	    		}
	    		this.fileList[0] = fileList[0];
			},
			nextForm(formName) {
				var _this = this;
				_this.$refs[formName].validate((valid) => {
					if (valid) {
						_this.form.fileList = _this.fileList;
						_goods.addGoods(_this.form,function(res){
				  			_this.$alert('添加成功，点击下一步添加商品图片！', '提示', {
          						confirmButtonText: '下一步',
								callback: action => {
									_this.formVisible = false;
									_this.imgVisible = true;
								}
							});					
						},function(err){
				  			_this.$alert('添加失败！', '提示', {
          							confirmButtonText: '取消',
									callback: action => {
				  						window.location.reload();
									}
							});	
						});
						_this.$refs['upload'].submit();
						console.log(_this.$refs.upload,"upload");

					} else {
						return false;
					}
				});
			},
			onRemove(file,fileList) {
				this.fileList = [];
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			beforeUpload(file) {
				if(file.size<512000) {
					if(this.fileList2.length>=3) {
		    			this.$message({
		    				type:'warning',
		    				message:'图片数量超出设定！'
		    			});
						return false;
					}
				}
				else{
					this.$message({
		    			type:'warning',
		    			message:'图片大小超出设定！'
		    		});
					return false;
				}
			},
			Onsuccess(response, file, fileList) {
				var _this = this;
				_goods.getImgLists(_this.form.goods_id,function(res){
					_this.fileList2 = res.data;
				},function(err){

				});
			},
			beforeRemove(file,fileList) {
				console.log('1');
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
			finish() {
	  			this.$alert('操作成功！', '提示', {
					confirmButtonText: '完成',
					callback: action => {
						_this.formVisible = false;
						_this.imgVisible = true;
						window.location.reload();
					}
				});					
			}
		}
	}
</script>
<style>
	.el-steps.el-steps--horizontal {
		margin: 15px 20px;
	}
	.add_goods_form .el-form-item .el-input,
	.add_goods_form .el-form-item textarea.el-textarea__inner {
		margin-left: 20px;
		width: 70%;
	}
	.add_goods_form .el-form-item .upload-demo {
		margin-left: 20px;
	}
	.add_goods_form .el-form-item .el-cascader__label {
		left: 20px;
	}
	.add_goods_form .el-form-item .el-upload-list__item {
		width: 70% !important;
	}
	.el-form.add_goods_form {
		margin: 20px 20px;
	}
	.add_goods_footer{
		width: 71%;
	}
	.add_goods_footer .el-button {
		float: right;
	}
	.add_goods_form .radioBox .el-form-item__content {
		margin-left: 140px !important;
	}
	.step2 {
		margin: 20px 10px;
	}
	.img_footer {
		float: left;
		margin: 20px 0;
	}
	.upload-title {
		margin: 10px 0;
	}
</style>