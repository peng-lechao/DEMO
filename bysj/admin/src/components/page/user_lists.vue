<template>
	<div>
		<div class="clearfix">
			<div slot="main-title" class="main-title">用户管理</div>
			<div class="search-box">
				<el-input placeholder="请输入内容" v-model="input" class="input-with-select" @keyup.enter="handleSearch">
				    <el-select v-model="select" slot="prepend" placeholder="请选择">
						<el-option v-for="item in searchOptions" :label="item.label" :value="item.value"></el-option>
				    </el-select>
			    	<el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
		  		</el-input>
			</div>
		</div>
		<el-table :data="tableData" style="width: 100%" class="user_table">
		    <el-table-column type="expand">
		    	<template slot-scope="props">
		        	<el-form label-position="left" inline class="demo-table-expand">
		          		<el-form-item label="密保问题">
		            		<span>{{ props.row.question }}</span>
		          		</el-form-item>
		          		<el-form-item label="密保答案">
		            		<span>{{ props.row.answer }}</span>
		          		</el-form-item>
		          		<el-form-item label="真实姓名">
		            		<span>{{ props.row.realname }}</span>
		          		</el-form-item>
		          		<el-form-item label="性别">
		            		<span v-if="props.row.sex =='0'">保密</span>
		            		<span v-else-if="props.row.sex =='1'">男</span>
		            		<span v-else-if="props.row.sex =='2'">女</span>
		          		</el-form-item>	
		          		<el-form-item label="个人简介">
		            		<span>{{ props.row.realname }}</span>
		          		</el-form-item>
		          		<el-form-item label="账户积分">
		            		<span>{{ props.row.integration }}</span>
		          		</el-form-item>
		          		<el-form-item label="收货信息">
		            		<p v-for="item in props.row.home">{{item.receiver}} {{item.phone}} {{item.province}} {{item.city}} {{item.address}}</p>
		          		</el-form-item>				          	
		        	</el-form>
		    	</template>
		    </el-table-column>
		    <el-table-column label="用户 ID" prop="id" min-width="150%">
		    </el-table-column>
		    <el-table-column label="用户名" prop="userName" min-width="150%">
		    </el-table-column>
		    <el-table-column label="用户密码" prop="password" min-width="250%">
		    </el-table-column>
		    <el-table-column label="用户手机" prop='phone' min-width="200%">
		    </el-table-column>
		    <el-table-column label="用户邮箱" prop='email' min-width="200%">
		   	</el-table-column>	
		    <el-table-column label="注册时间" prop='time' min-width="150%">
		    </el-table-column>		    
		</el-table>
	</div>
</template>

<script>
	import _goods from '@/service/goods'
	export default {
		data() {
			return{
				tableData:[],
				input:'',
				select:'',
				searchOptions: [
					{
						value : 'id',
						label : '用户 ID'
					},
					{
						value : 'userName',
						label : '用户名'
					}
				]
			}	

		},
		mounted() {
			var _this = this;
			_goods.getUserInfo(function(res){
				_this.tableData = res.data;
			},function(err){

			});
		},
		methods: {
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
			    	_goods.getUserInfo(function(res){
			    		_this.tableData = res.data;
			    	},function(err){
			    		_this.$message({
			    			type:'warning',
			    			message:'请求数据出错！'
			    		});
			    	});				
				}
				else {
					_goods.searchUserInfo(searchData,function(res){
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
			}
		}
	}
</script>

<style>
.user_table .demo-table-expand {
	font-size: 0;
}

.user_table .demo-table-expand label {
	width: 90px;
	color: #99a9bf;
}

.user_table .demo-table-expand .el-form-item {
	margin-right: 0;
	margin-bottom: 0;
	width: 50%;
}

.user_table .demo-table-expand .el-form-item span {
	text-align: left;
}

.search-box {
	float: right;
}

.search-box .el-select .el-input {
	width: 110px;
}

.search-box .input-with-select .el-input-group__prepend {
	background-color: #fff;
}

</style>