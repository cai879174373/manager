<template>
  <div class="users-container">
    <!-- 面包屑模块 -->
    <el-breadcrumb class="user-bread" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 输入框模块 -->
    <el-row>
      <el-col :span="6">
        <el-input placeholder="请输入内容"  class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="18" class="user-btn">
           <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
      <el-table
    :data="userList"
    style="width: 100%">
    <el-table-column
      label="日期"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="姓名"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.address }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

   <el-pagination
      
      
      :page-sizes="[100, 200, 300, 400]"
      :page-size="senddata.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
</template>

<script>
export default {
    data(){
      
         return {
           total:0,
       senddata:{
         query:'',
         pagenum:1,
         pagesize:10
       },
       userList:[]
      }
    },
   async created() {
      let res=await this.$axios.get('users', {
        params:this.senddata,
        headers:{Authorization:window.sessionStorage.getItem('token')}
      },
      )

      
      console.log(res);
    },
};
</script>

<style lang="scss">
.users-container{
    .user-btn{
        padding-left: 5px;
    }
    .user-bread{
        padding-left: 10px;
        height: 50px;
        line-height: 50px;
        background-color: #d3dce6;
    }
}
</style>
