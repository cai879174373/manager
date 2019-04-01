<template>
  <div class="users-container">
    <!-- 面包屑模块 -->
   <my-bread sectitle='商品管理' threetitle='商品分类'></my-bread>
    <!-- 输入框模块 -->
    <el-row>
      <el-col :span="18" class="">
        <el-button type="default" plain @click="addFormVisible=true">添加分类</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="categoriesList"  style="width: 100%" border>
      
      <el-table-column label="分类名称" width="180"></el-table-column>
      <el-table-column  label="级别" width="180"></el-table-column>
      <el-table-column  label="是否有效" width="180"></el-table-column>
      <el-table-column  label="操作" width="180"></el-table-column>
     
     
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            icon="el-icon-edit"
            plain
            size="mini"
          ></el-button>

          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="delOne(scope.row)"
            plain
            size="mini"
          ></el-button>
         
        </template>
      </el-table-column>
    </el-table>

   
 
  </div>
</template>

<script>
export default {
  data(){
    return {
      categoriesList:[{},{}]
    }
  },
 
  methods: {
    // 处理编辑弹框事件
    async handleEdit(index, row) {
      // console.log(row);
      // console.log(index);
      // 根据id显示数据

      let res = await this.$axios.get(`users/${row.id}`);
      // console.log(res);

      if (res.data.meta.status == 200) {
        this.editFormVisible = true;
        this.editForm = res.data.data;
      }
    },

    // 角色设置
    async roleedit(row) {
      // 设置弹框
      this.roleFormVisible = true;
      this.editRole = row;
      // console.log(row);
      let res = await this.$axios.get("roles");
      // console.log(res);
      this.roleList=res.data.data;

    },
    // 角色提交数据
   async submitroleForm(formName) {
    //  分配用户角色
     let res=await this.$axios.put(`users/${this.editRole.id}/role`,{
       rid:this.editRole.role_name
     });
    //  console.log(res);
     if(res.data.meta.status==200){
      //  设置角色成功
      this.roleFormVisible=false;
      // 重新获取数据
      this.search()

     }
     
    },

    // 编辑提交数据
    submiteditForm(formName) {
      // 编辑用户提交
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 发送添加数据接口
          let res = await this.$axios.put(
            `users/${this.editForm.id}`,
            this.editForm
          );
          // console.log(res);
          if (res.data.meta.status == 200) {
            this.search();
          }

          this.editFormVisible = false;
        } else {
          this.$message.error("输入有误!");
          return false;
        }
      });
    },

    // 添加数据
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 发送添加数据接口
          let res = await this.$axios.post("users", this.addForm);
          // console.log(res);
          if (res.data.meta.status == 201) {
            this.search();
          }

          this.addFormVisible = false;
        } else {
          this.$message.error("输入有误!");
          return false;
        }
      });
    },
    stateChange(scoperow) {
      // console.log(scoperow.id);
      this.$axios.put(`users/${scoperow.id}/state/${scoperow.mg_state}`);
    },
   
    // 删除数据
    delOne(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await this.$axios.delete(`users/${row.id}`);
          // console.log(res);
          if (res.data.meta.status == 200) {
            this.search();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "你真好"
          });
        });
    },
   
  },
  //发送请求
  async created() {
   
  }
};
</script>

<style >

</style>
