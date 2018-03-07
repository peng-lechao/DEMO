<template>
	<div>
		<div class="clearfix">
			<div slot="main-title" class="main-title">商品分类列表</div>
			<el-button type="primary" plain class="add-btn" @click="appendParent">
				<i class="el-icon-plus"></i>新增一级分类
			</el-button>
		</div>
		<el-tree :data="data" :props="defaultProps" node-key="id" default-expand-all :expand-on-click-node="false" :render-content="renderContent">
		</el-tree>
		<el-dialog class="goods_dialog" :title="title" :visible.sync="dialogFormVisible" width="450px">
			<el-form :model="form"  ref="form" status-icon>
				<el-form-item label="分类名" :label-width="formLabelWidth" prop="name">
					<el-input v-model.trim="form.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="是否可见" :label-width="formLabelWidth" prop="isShow">
					<el-switch v-model="form.isShow" active-text="是" inactive-text="否" active-value="1" inactive-value="0">
					</el-switch>
				</el-form-item>
				<el-form-item label="优先级" :label-width="formLabelWidth" prop="sort">
    				<el-slider v-model="form.sort" show-stops :max="10" ></el-slider>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="resetForm('form')">重 置</el-button>
				<el-button type="primary" @click="submitForm('form')">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import _user from '@/service/user'
import _type from '@/service/type'
let id = 1000;
export default {
	data() {
      	return {
		    // data: [{
		    //   id: 1,
		    //   name: '一级 1',
		    //   isShow:'1',
		    //   sort:2,
		    //   children: [{
		    //     id: 4,
		    //     name: '二级 1-1',
		    //     children: [{
		    //       id: 9,
		    //       name: '三级 1-1-1'
		    //     }, {
		    //       id: 10,
		    //       name: '三级 1-1-2'
		    //     }]
		    //   }]
		    // }, {
		    //   id: 5,
		    //   name: '一级 2',
		    //   children: [{
		    //     id: 5,
		    //     name: '二级 2-1',
		    //     isShow:'1',
		    //   	sort:2
		    //   }, {
		    //     id: 6,
		    //     name: '二级 2-2',
		    //     isShow:'1',
		    //   	sort:2
		    //   }]
		    // }, {
		    //   id: 3,
		    //   name: '一级 3',
		    //   children: [{
		    //     id: 7,
		    //     name: '二级 3-1',
		    //     isShow:'1',
		    //   	sort:2
		    //   }, {
		    //     id: 8,
		    //     name: '二级 3-2'
		    //   }]
		    // }],
		    data:[],
		    defaultProps: {
		      children: 'children',
		      label: 'name'
		    },
		    formLabelWidth:'80px',
		    dialogFormVisible: false,
		    form: {
		      	name: '',
		     	id: '',
		      	isShow:'0',
		      	sort:0,
		      	type:''
		    },
		    rules:{
		    	name: [
		        	{ required: true, message: '请输入分类', trigger: 'blur' },
		        	{ max: 8, message: '长度在8个字符以内', trigger: 'blur' }
		      	]
		    },
		    title:""
		}
    },
    mounted(){
    	var _this = this;
    	_type.getTypeList(function(res){
    		_this.data = res.data;
    		console.log(_this.data);
    	},function(err){
    		_this.$message({
    			type:'warning',
    			message:'请求数据出错！'
    		});
    	});
    },
    methods: {
    	submitForm(formName) {
    		var _this = this;
	        _this.$refs[formName].validate((valid) => {
				if (valid) {
					if(_this.form.type=='edit') {
						_type.updateTypeItem(_this.form,function(res){
							_type.getTypeList(function(res){
				    			_this.data = res.data;
				    		},function(err){
				    			_this.$message({
				    				type:'danger',
				    				message:err.msg
				    			})
				    		});
				    		_this.$message({
			    				type:'success',
			    				message:res.msg
			    			});
						},function(err){
							_this.$message({
				    			type:'danger',
				    			message:err
				    		})
						});
					}
					else {
						console.log(_this.form);
						_type.addTypeItem(_this.form,function(res){
							_type.getTypeList(function(res){
				    			_this.data = res.data;	
				    		},function(err){
				    			_this.$message({
				    				type:'danger',
				    				message:err.msg
				    			})
				    		});
				    		_this.$message({
				    			type:'success',
				    			message:res.msg
				    		});
						},function(err){
							_this.$message({
				    			type:'danger',
				    			message:err
				    		})
						});
					}
					_this.dialogFormVisible = false;
				} 
				else {
					return false;
				}
	        });
      	},
    	resetForm(formName) {
			this.form = {
				name   : '',
				id     : '',
				isShow : 0,
				sort   : 0,
				type   : ''
			};
      	},
		append(data) {
			this.title = "添加分类";
			this.dialogFormVisible = true;	
			this.form = {
					name   : '',
					id     : data.id,
					isShow : '0',
					sort   : 0,
					type   : ''
			};
		},
		appendParent(){
			this.title = "添加一级分类";
			this.dialogFormVisible = true;	
			this.form = {
					name   : '',
					id     : 0,
					isShow : '0',
					sort   : 0,
					type   : ''
			};
		},
		edit(data) {
			this.title = "编辑分类";
			this.form = {
				name   : data.name,
				id     : data.id,
				isShow : data.isShow,
				sort   : Number(data.sort),
				type   : 'edit'
			};
			this.dialogFormVisible = true;
		},
      	remove(node, data) {
      		var _this = this;
      		_user.checkAdminLevel('normal',function(res){
      			_this.$confirm('确定删除此分类？(其子分类也将被删除)','系统提示',{
	      			confirmButtonText : '确定',
	      			cancelButtonText  : '取消',
	      			type              : 'danger',
	      			callback          : (action,instance)=>{
	      				if(action == 'confirm') {
	      					_type.deleteType(data.id,function(res){
	      						_type.getTypeList(function(res){
					    			_this.data = res.data;
					    		},function(err){
					    			_this.$message({
					    				type:'danger',
					    				message:err.msg
					    			});
					    		});
					    		_this.$message({
				    				type:'success',
				    				message:res.msg
				    			});
	      					},function(err){
	      						_this.$message({
				    				type:'danger',
				    				message:err
				    			});
	      					});
	      				}
	      			}
      			});
      		},function(err){
      			_this.$alert(err, '系统提示',{
						confirmButtonText: '确定',
				});
      		})	
	    },
        renderContent(h, { node, data, store }) {
	        return (
	          	<span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
		            <span>
		              	<span>{node.label}</span>
		            </span>
		            <span>
		              	<el-tooltip class="item" effect="light" content="插入子分类" placement="left-start">
		              		<el-button style="font-size: 14px; margin-right:15px;" icon="el-icon-plus" type="text"  on-click={ () => this.append(data) }></el-button>
		              	</el-tooltip>
		              	<el-tooltip class="item" effect="light" content="编辑此分类" placement="top-start">
		                	<el-button style="font-size: 14px; margin-right:15px;" icon="el-icon-edit" type="text" on-click={ () => this.edit(data) }></el-button>
		              	</el-tooltip>
		              	<el-tooltip class="item" effect="light" content="删除此分类" placement="top-start">
		                	<el-button type="danger" plain icon="el-icon-delete" on-click={ () => this.remove(node, data) }></el-button>
		              	</el-tooltip>
		            </span>
	          	</span>);
     	}
    }
}
</script>

<style>
	.el-tree {
		margin-top: 20px;
	}
	.el-tree>span {
		font-size: 16px;
	}
	.el-tree-node__content {
		padding: 20px 0;
	}
	.goods_dialog .el-input,
	.goods_dialog .el-slider__runway {
		width:300px !important;
	}
	.goods_dialog .el-form-item {
		text-align:left;
	}
	.goods_dialog .el-slider__button-wrapper {
		top: -18px !important;
	}
	.goods_dialog .el-switch {
		vertical-align: baseline;
	}
	.goods_dialog .el-form-item__label {
		padding: 0 20px 0 0 !important;
	}
</style>