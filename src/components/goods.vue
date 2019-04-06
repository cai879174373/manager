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
      <el-table-column prop="goods_name" label="商品名称" width="400"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格(元)" width="180"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量" width="180"></el-table-column>
     
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
      :page-size="senddata.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
   
  </div>
</template>

<script>
export default {
  data() {
    return {
      total:0,
      goodList:[{},{}],
      senddata:{
        query:'',
        pagenum:1,
        pagesize:10
      }
    }
  },
 
  //发送请求 获取商品数据
  async created() {
    let res=await this.$axios.get('goods',{
      params:this.senddata
    })
    console.log(res);
    this.goodList=res.data.data.goods;
  
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
