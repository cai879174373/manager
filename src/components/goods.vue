<template>
  <div class="users-container">
    <!-- 面包屑模块 -->
   <my-bread sectitle='商品管理' threetitle='商品列表'></my-bread>
    <!-- 输入框模块 -->
    <el-row>
      <el-col :span="6">
        <el-input
          placeholder="请输入内容"
        
          class="input-with-select"
         
        >
          <el-button slot="append"  icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="18" class="user-btn">
        <el-button type="success" plain >添加商品</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="goodList" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="商品名称" width="180"></el-table-column>
      <el-table-column prop="email" label="商品价格(元)" width="180"></el-table-column>
      <el-table-column prop="mobile" label="商品重量" width="180"></el-table-column>
     
      <el-table-column label="操作">
        <template slot-scope="">
          <el-button
            type="primary"
            
            icon="el-icon-edit"
            plain
            size="mini"
          ></el-button>

          <el-button
            type="danger"
            icon="el-icon-delete"
            
            plain
            size="mini"
          ></el-button>
        
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
    
      :page-sizes="[5, 10, 21, 33]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="0"
    ></el-pagination>
   
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodList:[{},{}]
    }
  },
 
  //发送请求
  async created() {
  
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
