import Vue from "vue";

import VueRouter from "vue-router";
Vue.use(VueRouter);

// 导入
import index from "./components/index.vue";
import login from "./components/login.vue";
import users from "./components/users.vue";
import roles from "./components/roles.vue";
import rights from "./components/rights.vue";
import goods from "./components/goods.vue";
import params from "./components/params.vue";
import categories from "./components/categories.vue";
import orders from "./components/orders.vue";
import reports from "./components/reports.vue";

// 规则

let routes = [
  {
    path: "/",
    component: index,
    // redirect:'/users',
    children: [
      {
        path: "",
        redirect:'users'
      },

        {
          path: "users",
          component: users
        },
        {
          path: "roles",
          component: roles
        },
        {
          path: "rights",
          component: rights
        },
        {
          path: "goods",
          component: goods
        },
        {
          path: "params",
          component: params
        },
        {
          path: "categories",
          component: categories
        },
        {
          path: "orders",
          component: orders
        },
        {
          path: "reports",
          component: reports
        },
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
