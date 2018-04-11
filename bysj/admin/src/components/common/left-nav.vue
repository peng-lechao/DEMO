<template>
  <div class="left-nav">
        <el-menu :default-active="$route.path.substr(10)" class="el-menu-vertical-demo" text-color="#48576a" background-color="#EEF1F6" router>
          <el-menu-item index='Hi'>
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>首页</span>
            </template>
          </el-menu-item>
          <el-menu-item index='user_lists'>
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
          </el-menu-item>
          <el-submenu index="product">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="goods_lists">查看商品</el-menu-item>
            <el-menu-item index="add_goods">添加商品</el-menu-item>
          </el-submenu>
          <el-menu-item index='goods_category'>
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品分类管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index='admin_info'>
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>管理员管理</span>
            </template>
          </el-menu-item>
        </el-menu>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        isCollapse:true,
        a:'3',
        defaultActive:''
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(this.$route.path);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>

.el-menu.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  text-align: left;
  background-color: #373D41;
  border:none;
}

.el-menu {
  border: none;
}

.el-menu-item:hover,
.el-submenu__title:hover {
  background-color: rgba(255,255,255,0.3);
}

.el-submenu .el-menu-item {
  background-color: #E4E8F1 !important;
  text-indent: 16px;
}
</style>
