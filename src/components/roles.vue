<template>
  <div class="users-container">
    <!-- 面包屑模块 -->
    <my-bread sectitle="权限管理" threetitle="角色列表"></my-bread>
    <!-- 输入框模块 -->
    <el-row>
      <el-col :span="18" class>
        <el-button type="default" plain @click="addFormVisible=true">添加用户</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="roleList" style="width: 100%" border>
      <!-- 展开行 -->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-row class="my-row" v-for="level1 in props.row._children" :key="level1.id">
            <el-col :span="6">
              <el-tag @close='deltag(level1)' closable type="primary">{{level1.authName}}</el-tag>
            </el-col>
            <el-col :span="18">
              <el-row  v-for="level2 in level1.children" :key="level2.id">
                <el-col :span="6" >
                  <el-tag @close='deltag(level2)' closable type="success">{{level2.authName}}</el-tag>
                </el-col>
                <el-col :span="18" >
                  <el-tag @close='deltag(level3)' class="my-tag" v-for="level3 in level2.children" :key="level3.id" closable type="warning">{{level3.authName}}</el-tag>
                </el-col>
              </el-row>

             
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="180"></el-table-column>

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

    <!-- 弹出添加对话框 -->

    <el-dialog title="添加角色" :visible.sync="addFormVisible">
      <el-form :model="addform" ref="addform" :rules="rules">
        <el-form-item label="角色名称" prop="roleName" label-width="100">
          <el-input v-model="addform.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="100">
          <el-input v-model="addform.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addform')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 弹出编辑对话框 -->
    <el-dialog title="编辑角色" :visible.sync="editFormVisible">
      <el-form :model="editform" ref="editform" :rules="rules">
        <el-form-item label="角色名称" prop="roleName" label-width="100">
          <el-input v-model="editform.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc" label-width="100">
          <el-input v-model="editform.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submiteditForm('editform')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 弹出tree对话框 -->
    <el-dialog title="编辑角色" :visible.sync="treeVisible">
      <el-tree
        :data="rightList"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="checkedkeys"
        :props="defaultProps"
        ref="tree"
      ></el-tree>

      <div slot="footer" class="dialog-footer">
        <el-button @click="treeVisible = false">取 消</el-button>
        <el-button type="primary" @click="treeshow">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 树形数组
      rightList: [],

      // 树形数据
      defaultProps: {
        children: "children",
        label: "authName"
      },
      checkedkeys: [],
      // 添加弹窗开关
      addFormVisible: false,
      // 编辑开关
      editFormVisible: false,
      // tree开关
      treeVisible: false,
      // 数据列表
      roleList: [{}, {}],
      // 树形权限数组数据
      treeitem: {},

      // 添加数据
      addform: {
        roleName: "",
        roleDesc: ""
      },
      // 编辑数据
      editform: {
        roleName: "",
        roleDesc: ""
      },
      // 表单验证
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    deltag(item){
      console.log(item);
    },
    async getRoles() {
      let res = await this.$axios.get("roles");
      // 处理children坑点 替换children
      res.data.data.forEach(v => {
        v._children = v.children;
        delete v.children;
      });
      // console.log(res);
      this.roleList = res.data.data;
    },
    // 提交角色添加数据
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 提交数据成功 发送请求
          let res = await this.$axios.post("roles", this.addform);
          // console.log(res);
          if (res.data.meta.status == 201) {
            // 添加成功
            // 渲染数据
            this.getRoles();

            // 关闭对话框
            this.addFormVisible = false;
          }
        } else {
          this.$message.warning("输入数据有误!!!");
          return false;
        }
      });
    },

    // 编辑角色修改数据
    submiteditForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 提交数据成功 发送请求
          let res = await this.$axios.put(`roles/${this.editform.id}`, {
            roleName: this.editform.roleName
          });
          // console.log(res);
          if (res.data.meta.status == 200) {
            // 添加成功
            // 渲染数据
            this.getRoles();

            // 关闭对话框
            this.editFormVisible = false;
          }
        } else {
          this.$message.warning("输入数据有误!!!");
          return false;
        }
      });
    },

    // 编辑角色数据
    async handleEdit(index, row) {
      // console.log(row);
      // 弹出编辑对话框
      this.editFormVisible = true;
      // 查询角色数据
      let res = await this.$axios.get(`roles/${row.id}`);
      // console.log(res);
      this.editform = res.data.data;
      this.editform.id = res.data.data.roleId;
    },
    // 编辑角色提交
    // 删除角色据
    delOne(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // 发送请求删除数据
          let res = await this.$axios.delete(`roles/${row.id}`);
          console.log(res);
          if (res.data.meta.status == 200)
            // 删除成功 重新渲染数据
            // 渲染数据
            this.getRoles();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 数型弹出框
    async roleedit(row) {
      console.log(row);
      this.treeitem = row;

      // 获取数据
      let res = await this.$axios.get("rights/tree");
      // console.log(res);
      this.rightList = res.data.data;
      // 声明一个数组
      let checkedkeys = [];

      function gettree(item) {
        if (item._children) {
          item._children.forEach(v => {
            checkedkeys.push(v.id);
            gettree(v);
          });
        }
      }
      gettree(row);

      //  row.children.forEach(v => {
      //   checkedKeys.push(v.id);
      //   v.children.forEach(v => {
      //     checkedKeys.push(v.id);
      //     // 第三层
      //     v.children.forEach(v => {
      //       checkedKeys.push(v.id);
      //     });
      //   });
      // });
      this.checkedkeys = checkedkeys;
      this.treeVisible = true;
    },
    async treeshow() {
      this.treeVisible = false;

      // 获取id
      let rids = this.$refs.tree.getCheckedKeys().join(",");
      // console.log(rids);
      // 获取数据
      let res = await this.$axios.post(`roles/${this.treeitem.id}/rights`, {
        rids
      });
      // console.log(res);
      if (res.data.meta.status == 200) {
        // 更新成功 重新获取数据
        // 渲染数据
        this.getRoles();
      }
      // 重新 获取左侧菜单
      let menures = await this.$axios.get("menus");
      // console.log(res);
      // this.menulist=res.data.data;
      this.$store.commit("changemenu", menures.data.data);
    }
  },
  //发送请求
  async created() {
    // 渲染数据
    this.getRoles();
  }
};
</script>

<style >
.my-row{
  margin-bottom: 10px;
}
.my-tag{
  margin-bottom: 5px;
  margin-right: 15px;
}
</style>
