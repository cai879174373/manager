import Vue from 'vue'
import App from './App.vue'

// 引入element组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);

// 导入面包屑

import mybread from './components/mybread.vue'

Vue.component('my-bread',mybread)





import axios from 'axios'
// 设置基地址
axios.defaults.baseURL='http://localhost:8888/api/private/v1/'

// 引入拦截器
axios.interceptors.request.use(function (config) {
  // Do something before request is sent

  config.headers.Authorization=window.sessionStorage.getItem("token");
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  
  if([200,201,204].indexOf(response.data.meta.status)!=-1){
    Vue.prototype.$message.success(response.data.meta.msg)
  }else{
    Vue.prototype.$message.warning(response.data.meta.msg)
  }
 
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});
Vue.prototype.$axios=axios

// 引入全局样式
import  './assets/bass.scss'



Vue.config.productionTip = false

// 导入

import router from './router.js'

new Vue({
  render: h => h(App),
  // 引入router
  router
}).$mount('#app')
