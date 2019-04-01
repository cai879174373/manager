<template>
  <el-breadcrumb class="user-bread" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{sectitle}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{threetitle}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
    props:['sectitle','threetitle']
};
</script>

<style>
.user-bread {
  padding-left: 10px;
  height: 50px;
  line-height: 50px;
  background-color: #d3dce6;
}
</style>
