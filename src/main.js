import Vue from 'vue'
import App from './App.vue'

// 引入element组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);

// 导入面包屑

import mybread from './components/mybread.vue'

Vue.component('my-bread',mybread)
// 全局过滤器
import moment from 'moment'
Vue.filter('formtTime',(value,tempformt)=>{
  return moment(value).format(tempformt)
})





import myaxios from './myaxios.js'
Vue.use(myaxios)

// 引入全局样式
import  './assets/bass.scss'



Vue.config.productionTip = false

// 导入路由

import router from './router.js'

new Vue({
  render: h => h(App),
  // 引入router
  router
}).$mount('#app')
