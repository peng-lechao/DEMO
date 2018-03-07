<template>
	<div class="nav-header">
		<div class="nav-title">后台管理系统</div>
		<div class="admin-info">
			<i class="iconfont icon-guanliyuan"></i>
			<span v-text="level"></span>
			<el-dropdown @command="logout">       
				<span class="el-dropdown-link">         
					<span class="adminName" v-text="adminName"></span>
<!-- 					<i class="el-icon-arrow-down el-icon--right"></i>    -->    
				</span>       
				<el-dropdown-menu slot="dropdown">         
					<el-dropdown-item>退出</el-dropdown-item>       
				</el-dropdown-menu>     
			</el-dropdown>	
		</div>
	</div>
</template>

<style>
.nav-header {
	color: #fff;
	line-height: 60px;
}
.nav-title {
	float: left;
	margin-left: 20px;
	font-size: 25px;
	font-weight: bold;
}
.admin-info {
	text-align: right;
	margin-right: 20px;
	font-size: 20px;
}
.icon-guanliyuan {
	font-size: 20px;
}

.el-dropdown-link {
	color: #fff;
	cursor: pointer;
	font-size: 20px;
}
</style>

<script>
import _user from '@/service/user'
export default {
	name:'headerNav',
	data(){
		return {
			adminName:'root',
			level:'root'
		}
	},
	mounted(){
		var _this = this;
		_user.getAdminName(function(res){
			_this.adminName = res.data.adminName;
			_this.level = res.data.level+'级管理员';
		},function(err){

		});
	},
	methods:{
		logout() {
			var _this = this;
			_user.logout(function(res){
				_this.$message({
					type:'success',
					message:res.msg
				});
				_this.$router.push('/');
			},function(err){
			});
		}
	}
}

</script>