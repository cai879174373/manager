<template>
  <el-container class="index-container">
    <el-header class="my-header">
      <el-row>
        <el-col :span="4">
          <img src="../assets/4.jpg" alt>
        </el-col>
        <el-col :span="18">
          <h2>帝格斯后台管理项目</h2>
        </el-col>
        <el-col :span="2">
          <el-button type="danger" @click="logout">退出</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="my-container">
      <el-aside width="200px" class="my-aside">
        <el-menu router default-active="2" class="el-menu-vertical-demo">
          <el-submenu :index="item.id" v-for="(item,index) in menulist" :key="index">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="it.path" v-for="(it,index) in item.children" :key='index'>
              <span class="el-icon-menu"></span> {{it.authName}}
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
  name: "index",
  data() {
    return {
      menulist: []
    };
  },
  methods: {
    logout() {
      window.sessionStorage.removeItem("token");
      this.$router.push("/login");
    }
  },
  beforeCreate() {
    if (window.sessionStorage.getItem("token")) {
    } else {
      this.$message.error("兄die,请先登陆");
      this.$router.push("/login");
    }
  },
  async created() {
    //  获取左侧菜单
    let res = await this.$axios.get("menus");
    console.log(res);
    this.menulist=res.data.data;
  }
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
