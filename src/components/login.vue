<template>
  <div class="login">
    <div class="box">
        
      <el-form label-position="top" ref="loginForm"  :model='loginForm' :rules='rules'  >
        <h2>用户管理</h2>
        <el-form-item label="用户名" prop='username'>
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop='password'>
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  type="primary" @click="submit('loginForm')">登录</el-button>
          <el-button  type="danger" @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data(){
      return {

        //   表单验证功能
          loginForm:{
              username:'',
              password:''
          },
          rules:{
               username:[
                   {required:true,message:'用户名不能为空',trigger:'blur'},
                   {min:3,max:12,message:'长度在3-12个字符',trigger:'blur'},
               ],
               password:[
                   {required:true,message:'密码不能为空',trigger:'blur'},
                   {min:4,max:16,message:'长度在4-16个字符',trigger:'blur'},
               ],

          }
      }
  },
  methods: {
      submit(formName){
          this.$refs[formName].validate(async valid=>{
              if(valid){
                //   成功提交数据
                 let res= await this.$axios.post("login",this.loginForm)
                // console.log(res);
                if(res.data.meta.status===400){
                  this.$message.error(res.data.meta.msg)
                }else if(res.data.meta.status===200){
                  this.$message.success(res.data.meta.msg)
                  window.sessionStorage.setItem('token',res.data.data.token)
                  this.$router.push('/')
                }
              }else{
                  this.$message.error('提交数据有误,请重新提交')
                  return false
              }
          })
      },
      resetForm(formName){
           this.$refs[formName].resetFields();
      }
  },
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
