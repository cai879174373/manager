import Vue from 'vue'
import App from './App.vue'

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
