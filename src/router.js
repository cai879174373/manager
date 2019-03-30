import Vue from "vue";

import VueRouter from "vue-router";
Vue.use(VueRouter);

// 导入
import index from "./components/index.vue";
import login from "./components/login.vue";
import users from "./components/users.vue";

// 规则

let routes = [
  {
    path: "/",
    component: index,
    children: [
        {
          path: "users",
          component: users
        }
      ]
  },
  {
    path: "/login",
    component: login,
   
  }
];

// 创建router实例对象
let router = new VueRouter({
  routes
});

//暴露

export default router;
