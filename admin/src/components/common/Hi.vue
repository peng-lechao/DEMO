<template>
	<div>
		<el-dialog title="添加/编辑分类" :visible.sync="dialogFormVisible">
			<el-form :model="form"  ref="form" status-icon>
				<el-form-item label="分类名" :label-width="formLabelWidth" prop="name">
					<el-input v-model.trim="form.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="是否可见" :label-width="formLabelWidth" prop="isShow">
					<el-switch v-model="form.isShow" active-text="是" inactive-text="否" active-value="1" inactive-value="0">
					</el-switch>
				</el-form-item>
				<el-form-item label="优先级" :label-width="formLabelWidth" prop="sort">
    				<el-slider v-model="form.sort" :max="10" show-stops></el-slider>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="resetForm('form')">重 置</el-button>
				<el-button type="primary" @click="submitForm('form')">确 定</el-button>
			</div>
			<div slot="footer" class="dialog-footer">
		    <el-button @click="resetForm('form')">重 置</el-button>
		    <el-button type="primary" @click="submitForm('form')">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>

<script>
import store from '@/store'
	export default {
		name:'Hi',
		data() {
			return{
				dialogFormVisible: true,
			    form: {
			      	name: '',
			     	id: '',
			      	isShow:'0',
			      	sort:0,
			      	type:''
			    },
			    formLabelWidth:'100px'	
			}
		},
		methods:{
			resetForm(formName) {
    			console.log(this.$refs[formName],formName);
        		this.$refs[formName].resetFields();
      		},
		}
	}
</script>