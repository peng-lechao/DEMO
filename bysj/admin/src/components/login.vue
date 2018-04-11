<template>
	<el-dialog class="login_dialog" title="管理员登录" :show-close="showClose" :modal="modal" :visible.sync="dialogFormVisible" center :close-on-press-escape="close" :close-on-click-modal="close" width="400px">
		<el-alert :title="errorTips" type="error" show-icon v-show="isShow">
  		</el-alert>
		<el-form :model="form" ref="form" :rules="rules">
			<el-form-item label="管理员名" :label-width="formLabelWidth" prop="adminName">
				<el-input v-model="form.adminName" @keyup.enter.native="submitForm('form')" auto-complete="off" placeholder="请输入管理员名"></el-input>
			</el-form-item>
			<el-form-item label="密码" :label-width="formLabelWidth" prop="password">
				<el-input v-model="form.password" @keyup.enter.native="submitForm('form')" auto-complete="off" type="password" placeholder="请输入管理员密码"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button type="primary" @click="submitForm('form')">登 录</el-button>
		</div>
	</el-dialog>
</template>

<script>
import _user from '@/service/user'
export default {
    data() {
		return {
			dialogFormVisible: true,
			form: {
			  adminName: '',
			  password:''
			},
			close:false,
			showClose:false,
			modal:false,
			formLabelWidth: '80px',
			rules:{
				adminName: [
	            	{ required: true, message: '请输入管理员名', trigger: 'blur' }
	          	],
	         	password: [
	         		{ required: true, message: '请输入密码', trigger: 'blur' }
	          	]
			},
			errorTips:'',
			isShow:false
		};
    },
    methods:{
    	submitForm(formName) {
    		var _this = this;
    		console.log(_this.$store);
    		_this.$refs[formName].validate((valid)=>{
    			if(valid) {
    				_user.validateLogin(_this.form,function(res){
    					_this.$store.state.isLogin = true;
    					_this.$store.state.adminInfo = res.data;
    					console.log(_this.$store);
    					_this.$message({
				        	message: res.msg,
				        	type: 'success'
				        });
    					_this.$router.push('/mainPage/goods_category');
    				},function(err){
    					_this.isShow = true;
    					_this.errorTips = err;	
    				});
    			}
    			else {
    				return false;
    			}
    		});
    	}
    }
}
</script>

<style>
	.login_dialog {
		padding: 20px !important;
		box-shadow: 0 0 25px #cac6c6;
	}
	.login_dialog .el-form {
		margin-top: 15px !important;
	}
	.login_dialog .el-input__inner {
		width: 260px !important;
	}
	.login_dialog .el-dialog__body {
		padding: 0 10px 20px 10px !important;
	}
	.login_dialog .el-button {
		width: 330px !important;
	}
	.login_dialog .el-form-item__label {
		padding-right: 12px !important;
	}
</style>