import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'
// 设置基地址
axios.defaults.baseURL='http://localhost:8888/api/private/v1/'
Vue.prototype.$axios=axios

// 引入全局样式
import  './assets/bass.scss'

// 引入element组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);

Vue.config.productionTip = false

// 导入

import router from './router.js'

new Vue({
  render: h => h(App),
  // 引入router
  router
}).$mount('#app')
