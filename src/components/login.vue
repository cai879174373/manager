<template>
  <div class="login">
    <div class="box">
      <el-form :label-position="top">
        <h2>用户管理</h2>
        <el-form-item label="用户名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-login" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login"
};
</script>

<style lang="scss">
.login {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #324152;
  .box {
    padding: 35px;
    width: 550px;
    height: 420px;
    border-radius: 10px;
    background: #fff;
    .btn-login {
      width: 100%;
    }
  }
}
</style>
