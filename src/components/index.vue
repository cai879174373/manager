<template>
  <el-container  class="index-container">
    <el-header class="my-header">
      <el-row>
        <el-col :span="4">
          <img src="../assets/4.jpg" alt>
        </el-col>
        <el-col :span="18">
          <h2>帝格斯后台管理项目</h2>
        </el-col>
        <el-col :span="2">
          <el-button type="danger">退出</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container  class="my-container">
      <el-aside width="200px" class="my-aside">
        <el-menu router default-active="2" class="el-menu-vertical-demo">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item index="users">
              <span class="el-icon-menu"></span> 选项1
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="my-main">
       <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "index"
};
</script>

<style lang="scss">
.index-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  .my-header {
    padding-left: 0px;

    line-height: 60px;
    background-color: #b3c0d1;
    img {
      width: 200px;
      height: 60px;
    }
    h2 {
      color: #fff;
      text-align: center;
      margin: 0;
      padding: 0;
    }
    height: 60px;
  }
  .my-container {
    flex: 1;
    // .my-aside {
    //   //   background-color: #ccc;
    // }
    .my-main {
      padding-top: 0;
      background-color: #e9eef3;
    }
  }
}
</style>
