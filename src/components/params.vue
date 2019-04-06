<template>
  <div class="params-container">
    <!-- 面包屑模块 -->
    <my-bread sectitle="商品管理" threetitle="分类参数"></my-bread>
    <!-- alert警告 -->
    <el-alert class="my-alert" title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon></el-alert>
    <el-row class="my-row">
      <el-col :span="24">
        <span>请选择商品分类:&nbsp;&nbsp;</span>
        <!-- 级联选择器 -->
        <el-cascader
          expand-trigger="hover"
          :props="props"
          :options="options"
          v-model="selectedOptions2"
          @change="change"
        ></el-cascader>
      </el-col>
    </el-row>
    <!-- ta栏 -->

    <el-tabs v-model="activeName">
      <el-tab-pane label="动态参数" name="many">
        <el-button disabled class="my-btn" type="primary" size="mini">动态添加参数</el-button>
        <el-table :data="dynamicList" style="width: 100%" border>
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="attr_name" label="商品参数" width="180"></el-table-column>

          <el-table-column label="操作">
            <template slot-scope>
              <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="静态参数" name="only">
        <el-button class="my-btn" type="primary" size="mini">动态添加参数</el-button>
        <el-table :data="staticList" style="width: 100%" border>
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="attr_name" label="属性名称" width="180"></el-table-column>
          <el-table-column prop="attr_vals" label="属性值" width="180"></el-table-column>

          <el-table-column label="操作">
            <template slot-scope>
              <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paramsList: [{}, {}],
      activeName: "many",
      options: [],
      // 动态列表
      dynamicList: [],
      // 静态列表
      staticList: [],
      selectedOptions2: [],
      props: {
        value: "cat_id",
        label: "cat_name"
      }
    };
  },
  // 参数数据  级联选择器的change事件
  methods: {
    async change() {
      // console.log(this.selectedOptions2);
      let res = await this.$axios.get(
        `categories/${this.selectedOptions2[2]}/attributes`,
        {
          params: {
            sel: this.activeName
          }
        }
      );
      console.log(res);
      // 动态参数
      if (this.activeName == "many") {
        this.dynamicList = res.data.data;
      }else{
        this.staticList=res.data.data;
      }
    }
  },
  // 侦听器
  watch: {
    activeName(){
      this.change()
    }
  },
  // 获取分类数据
  async created() {
    let res = await this.$axios.get("categories", {
      params: {
        type: 3
      }
    });
    // console.log(res);
    this.options = res.data.data;
  }
};
</script>

<style lang="scss">
.params-container {
  .my-alert {
    margin: 20px 0;
  }
  .my-row {
    margin-bottom: 20px;
  }
  .my-btn {
    margin-bottom: 20px;
  }
}
</style>
