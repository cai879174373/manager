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
        <el-input
          placeholder="请输入内容"
          @keyup.native.enter="search"
          class="input-with-select"
          v-model="senddata.query"
        >
          <el-button slot="append" @click="search" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="18" class="user-btn">
        <el-button type="success" plain @click="addFormVisible=true">添加用户</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="userList" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="手机" width="180"></el-table-column>
      <el-table-column prop="name" label="用户状态" width="180">
        <template slot-scope="scope">
          <el-switch
            @change="stateChange(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
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
          <el-button
            type="success"
            icon="el-icon-check"
            @click="roleedit(scope.row)"
            plain
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
    @size-change='sizechange'
    @current-change='currentchange'
      :page-sizes="[5, 10, 21, 33]"
      :page-size="senddata.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加弹框 -->

    <el-dialog title="添加用户" :visible.sync="addFormVisible">
      <el-form :model="addForm" ref="addForm" :rules="addRules">
        <el-form-item label="用户名" label-width="100px" prop="username">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px" prop="password">
          <el-input v-model="addForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" label-width="100px">
          <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑弹框 -->

    <el-dialog title="编辑用户" :visible.sync="editFormVisible">
      <el-form :model="editForm" ref="editForm" :rules="addRules">
        <el-form-item label="用户名" label-width="100px" prop="username">
          <el-input v-model="editForm.username" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" label-width="100px">
          <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submiteditForm('editForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 角色设置弹框 -->

    <el-dialog title="用户角色" :visible.sync="roleFormVisible">
      <el-form ref="roleForm">
        <el-form-item label="当前用户" label-width="100px" prop="username">{{editRole.username}}</el-form-item>
        <el-form-item label="请选择角色" label-width="100px">
          <el-select v-model="editRole.role_name" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitroleForm('roleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 0,
      senddata: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      userList: [],
      // 弹出框状态
      addFormVisible: false,
      editFormVisible: false,

      // 角色编辑弹窗开关
      roleFormVisible: false,
      //角色数据
      editRole: {},
      // 角色列表数据
      roleList: [],

      editForm: {
        username: "rose",
        email: "rose@qq/com",
        mobile: "121212121"
      },

      addForm: {
        username: "rose",
        password: "123456",
        email: "rose@qq/com",
        mobile: "121212121"
      },
      addRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 处理编辑弹框事件
    async handleEdit(index, row) {
      // console.log(row);
      // console.log(index);
      // 根据id显示数据

      let res = await this.$axios.get(`users/${row.id}`);
      console.log(res);

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
     console.log(res);
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
          console.log(res);
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
          console.log(res);
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
    async search() {
      let res = await this.$axios.get("users", {
        params: this.senddata
        // headers: { Authorization: window.sessionStorage.getItem("token") }
      });

      // console.log(res);
      this.userList = res.data.data.users;
      this.total = res.data.data.total;
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
    // 页容量发生改变
    sizechange(size){
      this.senddata.pagesize=size;
      this.search()
    },
    // 页码数改变
    currentchange(current){
      this.senddata.pagenum=current;
        this.search();
    }
    
  },
  //发送请求
  async created() {
    this.search();
  }
};
</script>

<style lang="scss">
.users-container {
  .user-btn {
    padding-left: 5px;
  }
  .user-bread {
    padding-left: 10px;
    height: 50px;
    line-height: 50px;
    background-color: #d3dce6;
  }
}
</style>
