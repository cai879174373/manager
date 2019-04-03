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
import error from "./components/error.vue";

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
    meta:{
      noLogin:true
    }
   
  },
  {
    path: "/error",
    component: error
  },
];

// 创建router实例对象
let router = new VueRouter({
  routes
});
//创建导航守卫
router.beforeEach((to, from, next) => {
  // console.log(to);
  // console.log(from);
  // 判断是否登陆
  // if(to.path=="/login"){
  //   // 目前是登陆页
  //   next();
 if(to.matched.length==0){
  Vue.prototype.$message.error('哥们,你输入地址有误,重新登陆哦!!')
  next('/error')
 }

  if(to.meta.noLogin==true){
    // 目前是登陆页
    next();
  }else{
    if(window.sessionStorage.getItem('token')){
      // 已经登陆
      next()
    }else{
      // 未登陆 弹框提醒
      Vue.prototype.$message.error('哥们,请先登陆!!')
      next('/login')
    }
  }
})

//暴露

export default router;
