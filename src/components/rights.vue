<template>
  <div class="users-container">
    <!-- 面包屑模块 -->
   <my-bread sectitle='权限管理' threetitle='权限列表'></my-bread>


    <!-- 表格 -->
    <el-table  :data='rightList' style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column  label="层级" width="180">
      <template slot-scope="scope">
        <div v-if="scope.row.level==0">一级</div>
        <div v-else-if="scope.row.level==1">二级</div>
        <div v-else>三级</div>
      </template>
      </el-table-column>
      
     
    
    </el-table>

   
 
  </div>
</template>

<script>
export default {
  data(){
    return{
       rightList:[{},{}]
    }
   
  },
 
  
  //发送请求
  async created() {
   let res=await this.$axios.get('rights/list')
   console.log(res);
   this.rightList=res.data.data;
  }
};
</script>

<style lang="scss">
.users-container {
  .user-btn {
    padding-left: 5px;
  }
  
}
</style>
