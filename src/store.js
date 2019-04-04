// 1引入vue
import Vue from 'vue'
// 2.引入vuex
import Vuex from 'vuex'
// 使用vuex
Vue.use(Vuex)

// 创建仓库
const store = new Vuex.Store({
    // 菜单数组
    state: {
        menuList:[]
      },
      mutations: {
        changemenu (state,newMenuList) {
            // 给菜单数组重新赋值
            state.menuList=newMenuList
      }
    }


})


export default store