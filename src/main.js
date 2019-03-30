import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 导入

import router from './router.js'

new Vue({
  render: h => h(App),
  // 引入router
  router
}).$mount('#app')
