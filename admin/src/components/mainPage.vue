<template>
  <el-container id="app">
    <el-header>
      <headerNav></headerNav>
    </el-header>
    <el-container>
      <el-aside width="250px">
        <leftNav></leftNav>
      </el-aside>
      <el-container>
        <el-main>
          <router-view>
            <slot name="main-title" class="main-title"></slot>
          </router-view>
        </el-main> 
      </el-container> 
    </el-container>
  <!--   <el-footer>Footer</el-footer> -->
  </el-container>
</template>

<script>
import headerNav from '@/components/common/header-nav';
import leftNav from '@/components/common/left-nav';
export default {
  name: 'app',
  components:{
    headerNav,
    leftNav
  },
  computed:{
  },
  methods:{
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

body {
  box-sizing: border-box;
}

#app {
  font-family: '微软雅黑','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
}

.el-header, .el-footer {
  background-color: #20A0FF;
  text-align: center;
}

.el-aside {
  line-height: 200px;
}

.el-main {
  background-color: #fff;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

.main-title {
  float: left;
  font-size: 18px;
  padding-bottom: 10px;
  border-bottom: 1px solid #999;
}

.add-btn {
    float: right;
    margin-right: 50px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: " ";
}

.clearfix:after {
    clear: both;
}

.clearfix{
    *zoom: 1;
}

</style>

