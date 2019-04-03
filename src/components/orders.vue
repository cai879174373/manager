<template>
  <div class="users-container">
    <!-- 面包屑模块 -->
    <my-bread sectitle="订单管理" threetitle="订单列表"></my-bread>

    <!-- 表格 -->
    <el-table :data="orderList" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="order_number" label="订单编号" width="250"></el-table-column>
      <el-table-column prop="order_price" label="订单价格" width="80"></el-table-column>
      <el-table-column label="是否付款" width="180">
        <template slot-scope="scope">
          <el-button v-if="scope.row.order_pay==0" type="danger" size="mini" plain>未付款</el-button>
          <el-button v-else type="success" size="mini" plain>已付款</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货" width="80"></el-table-column>

      <el-table-column prop="update_time" label="下单时间" width="180">
        <!-- 使用插槽动态渲染 -->
        <template slot-scope="scope">{{scope.row.update_time | formtTime('YYYY-MM-DD HH:mm:ss')}}</template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope>
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="orderFormVisible=true"
            plain
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current="sendData.pagenum"
      @size-change="SizeChange"
      @current-change="CurrentChange"
      :page-sizes="[5, 10, 21, 33]"
      :page-size="sendData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 编辑弹框 -->
    <el-dialog title="修改订单地址" :visible.sync="orderFormVisible">
      <el-form>
        <el-form-item label="省市区/县" label-width="100px">
          <!-- 级联选择器 -->
          <el-cascader :options="options" v-model="selectedOptions"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" label-width="100px">
          <el-input autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="orderFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="orderFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入城市数据
import options from "../assets/city_data2017_element.js";
export default {
  data() {
    return {
      // 编辑弹框开关

      orderFormVisible: false,
      // 级联选择器
      selectedOptions: [],
      //城市数据
      options,
      total: 0,
      orderList: [{}, {}],
      sendData: {
        pagenum: 1,
        pagesize: 10
      }
    };
  },
  methods: {
    // 加载数据
    async loadData() {
      let res = await this.$axios.get("orders", {
        params: this.sendData
      });
      // console.log(res);
      this.orderList = res.data.data.goods;
      this.total = res.data.data.total;
    },
    // 页容量改变
    SizeChange(size) {
      this.sendData.pagesize = size;
      // 重新渲染数据
      this.loadData();
    },
    CurrentChange(current) {
      this.sendData.pagenum = current;
      // 重新渲染数据
      this.loadData();
    }
  },

  //发送请求
  created() {
    // 渲染数据
    this.loadData();
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
