<template>
  <div class="users-container">
    <!-- 面包屑模块 -->
   <my-bread sectitle='订单管理' threetitle='订单列表'></my-bread>

    <!-- 表格 -->
    <el-table :data="orderList" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="订单编号" width="250"></el-table-column>
      <el-table-column prop="email" label="订单价格" width="80"></el-table-column>
      <el-table-column prop="mobile" label="是否付款" width="100">
         <el-button type="danger" size="mini" plain >未付款</el-button>
      </el-table-column>
      <el-table-column prop="mobile" label="是否发货" width="180"></el-table-column>
      <el-table-column prop="mobile" label="下单时间" width="180"></el-table-column>
     
      <el-table-column label="操作">
        <template slot-scope="">
          <el-button
            type="primary"
            
            icon="el-icon-edit"
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
      orderList:[{},{}]
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
