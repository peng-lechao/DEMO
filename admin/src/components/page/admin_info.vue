<template>
	<div>
		<div>
			<div slot="main-title" class="main-title">管理员列表</div>
			<el-button type="primary" plain class="add-btn" @click="dialogFormVisible=true"><i class="el-icon-plus"></i>新增管理员</el-button>
		</div>
		<el-dialog class="admin_dialog" title="新增管理员" :visible.sync="dialogFormVisible" width="40%">
		  <el-form :model="form"  :rules="rules" ref="form" status-icon>
		    <el-form-item label="管理员名" :label-width="formLabelWidth" prop="adminName">
		      <el-input v-model.trim="form.adminName" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
		      <el-input v-model.trim="form.password" auto-complete="off" type="password"></el-input>
		    </el-form-item>
		    <el-form-item label="确认密码" :label-width="formLabelWidth" prop="checkPass">
		      <el-input v-model.trim="form.checkPass" auto-complete="off" type="password"></el-input>
		    </el-form-item>
		    <el-form-item label="管理员级别" :label-width="formLabelWidth" prop="level">
		      <el-select v-model="form.level" placeholder="请选择管理员级别">
		        <el-option label="1级" value="1"></el-option>
		        <el-option label="2级" value="2"></el-option>
		      </el-select>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="resetForm('form')">重 置</el-button>
		    <el-button type="primary" @click="submitForm('form')">确 定</el-button>
		  </div>
		</el-dialog>
		<el-table  :loading="loading" ref="multipleTable" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="100">
		    </el-table-column>
		    <el-table-column prop="adminId" label="ID" width="150">
		    </el-table-column>
		    <el-table-column prop="date" label="创建时间" sortable width="250">
		    </el-table-column>
		    <el-table-column prop="adminName" label="管理员名" width="250">
		    </el-table-column>
		    <el-table-column prop="lastDate" label="最近登录时间" sortable width="250">
		    </el-table-column>
		    <el-table-column prop="level" label="管理员级别" width="200" :filters="[{ text: '1级', value: '1' }, { text: '2级', value: '2' },{ text: '3级', value: '3' }]" :filter-method="filterTag" filter-placement="bottom-end">
		      <template slot-scope="scope">
		        <el-tag :type="scope.row.level === '1' ? 'primary' : (scope.row.level === '2'? 'success' : 'danger')" close-transition>{{scope.row.level}}
		        </el-tag>
		      </template>
		    </el-table-column>
		    <el-table-column label="操作">
		      <template slot-scope="scope">
		        <el-button size="mini" type="danger" @click="handleDelete(scope.$index,tableData,scope.row)">删除</el-button>
		      </template>
		    </el-table-column>
	  </el-table>
	  <div class="bottom-btn">
  		<el-button type="danger" plain @click="deleteChoose"><i class="el-icon-close"></i>删除所选</el-button>
    	<el-button type="primary" plain @click="toggleSelection()">取消选择</el-button>
  	  </div>
	  <div class="block">     
	  	<el-pagination layout="prev, pager, next" :total="50">   
	  	</el-pagination> </div>
	  </div>
</template>

<script>
import _user from '@/service/user'
import store from '@/store'
export default {
	name:'admin_info',
	data() {
		var validateAdminName = (rule, value, callback) => {
			_user.checkAdminName(value,function(res){
				callback();
			},function(err){
				callback(new Error('管理员名已存在!'));
			});
		};
		var validatePass = (rule, value, callback) => {
	        if (this.form.checkPass !== '') {
	        	this.$refs.form.validateField('checkPass');
	        }
	        callback();
	    };
		var validatePass2 = (rule, value, callback) => {
			if (value !== this.form.password) {
		    	callback(new Error('两次输入密码不一致!'));
		    } else {
		      	callback();
		    }
		};
		return {
	   		tableData : [
	   		],
	        multipleSelection : [],
	        loading: true,
	        dialogFormVisible: false,
	        form: {
	          	adminName: '',
	         	password: '',
	          	checkPass: '',
	          	level:''
	        },
	        rules:{
	        	adminName: [
	            	{ required: true, message: '请输入管理员名', trigger: 'blur' },
	            	{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
	            	{ validator: validateAdminName, trigger: 'blur' }
	          	],
	         	password: [
	         		{ required: true, message: '请输入密码', trigger: 'blur' },
	           		{ min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
	           		{ validator: validatePass, trigger: 'blur' }
	          	],
	          	checkPass: [
	          		{ required: true, message: '请再次输入密码', trigger: 'blur' },
	           		{ validator: validatePass2, trigger: 'blur' }
	          	],
	          	level: [
	          		{ required: true, message: '请选择管理员级别', trigger: 'change' }
	          	]
	        },
	        formLabelWidth: '120px'
		}    	
	},
	methods: {
		filterTag(value, row) {
			return row.level === value;
		},
		toggleSelection() {
			console.log(this.$refs.multipleTable);
			this.$refs.multipleTable.clearSelection();
		},       
		handleSelectionChange(val) {
			this.multipleSelection = val;   
		},
		handleDelete(index,data,row){
			var _this = this;
			if(row.level !== '3') {
				_this.$confirm('确认删除？','系统提示',{
					confirmButtonText : '确认',
					cancelButtonText  : '取消',
					type              : 'warning',
					callback          : (action,instance)=>{
						if(action === 'confirm'){
							console.log(index,data,row);
							_user.deleteAdmin(row.adminId,function(res){
				      			data.splice(index,1);
				      			_this.$message({
				      				type: 'success',
				      		  		message: '删除成功！'
				      			});
				  			},function(err){
				  				_this.$message({
				  					type: 'danger',
				  		  			message: '删除失败！'
				  				});
			  				});
						}
						else{
							_this.$message({
								type: 'info',
				  				message: '已取消删除！'
							});  
						}
					}
				});
			}
			else {
				_this.$alert('权限不足，无法操作！','系统提示',{
					confirmButtonText: '确定'
				});
			}		
		},
		submitForm(formName) {
			var _this    = this;
			var formData = {
				adminName : _this.form.adminName,
				password  : _this.form.password,
				level     : _this.form.level
			};
			_this.$refs[formName].validate((valid) => {
				if (valid) {
					_user.addAdmin(formData,function(res){
						_this.$alert(res.msg,'系统提示',{
							confirmButtonText:'确定',
							callback : action =>{
								_user.getAdminInfo(function(res){
						    		_this.tableData = res.data;
						    	},function(error){
						    		_this.$alert('数据出错','系统提示',{
						    			confirmButtonText:'确定'
						    		})
						    	});		
							}
						})
					},function(err){
						_this.$alert(err.msg,'系统提示',{
							confirmButtonText:'确定',
							callback : action =>{
								window.location.reload();
							}
						})
					});
					_this.dialogFormVisible = false;
		  		} 
		  		else {
		    		return false;
		  		}
		  	
			});
		},
		resetForm(formName) {
        	this.$refs[formName].resetFields();
      	},
  	  	deleteChoose() {
	  	  	let _this  = this,
	  	  		length = _this.multipleSelection.length,
	  	  		IdTag  = [],
	  	  		IdStr  = "";
	  		if(length!==0){
	  			_this.$confirm('确认删除？','系统提示',{
	  				confirmButtonText : '确定',
	  				cancelButtonText  : '取消',
	  				type              : 'warning',
					callback:(action,instance)=>{
						if(action == 'confirm'){
							for(let i=0;i<length;i++){
			      				IdTag.push(_this.multipleSelection[i].adminId);
			      			}
			      			IdStr = IdTag.join(",");
			    			_user.deleteAdmin(IdStr,function(res){
			    				_this.$message({
			    					type     : 'success',
			    					message  : res.msg
			    				});
			    				_user.getAdminInfo(function(res){
						    		_this.tableData = res.data;
						    	},function(err){
						    		_this.$alert('数据出错','系统提示',{
						    			confirmButtonText:'确定'
						    		});
						    	});		
			    			},function(err){
			    				_this.$message({
			    					type:'info',
			    					message:err
			    				});
			    			});	
						}
					}
	  			});  			
	  		}
	  		else {
	  			_this.$alert('请选择!','系统提示',{
	  				confirmButtonText:'确定'
	  			});
	  		}
	  	}
	},
    mounted(){
    	var _this = this; 
    	_user.getAdminInfo(function(res){
    		_this.loading = false;
    		_this.tableData = res.data;
    	},function(error){
    		_this.$alert('数据出错','系统提示',{
    			confirmButtonText:'确定'
    		})
    	});		
    }
}
</script>
<style>
	.el-table {
		text-align: left;
	}
	.admin_dialog .el-input,
	.admin_dialog .el-select {
		width: 70%;
	}
	.bottom-btn {
		float: left;
		margin-top: 30px;
	}
	.bottom-btn .el-button {
		margin-right: 10px;
	}
</style>