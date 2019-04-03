// 导入axios
import axios from "axios";

// 导入router
import router from './router.js'

export default {
  install(Vue) {
    // 设置基地址
    axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";

    // 引入拦截器
    axios.interceptors.request.use(
      function(config) {
        // Do something before request is sent

        config.headers.Authorization = window.sessionStorage.getItem("token");
        return config;
      },
      function(error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    // Add a response interceptor
    axios.interceptors.response.use(
      function(response) {
        // Do something with response data
        // console.log(response);
        if(response.data.meta.status===400&&response.data.meta.msg==="无效token"){
          Vue.prototype.$message.warning('哥们,伪造了token,滚回登陆');
          window.sessionStorage.removeItem('token')
          router.push("/login")
          return
        }

        if ([200, 201, 204].indexOf(response.data.meta.status) != -1) {
          Vue.prototype.$message.success(response.data.meta.msg);
        } else {
          Vue.prototype.$message.warning(response.data.meta.msg);
        }

        return response;
      },
      function(error) {
        
        // Do something with response error
        return Promise.reject(error);
      }
    );
    Vue.prototype.$axios = axios;
  }
};
