import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios';

//1 创建axios实例
const instance = axios.create({
  baseURL: 'http://timemeetyou.com:8889/api/private/v1/',
  timeout: 10000
})
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
instance.interceptors.request.use(config=>{
	config.headers.Authorization=window.sessionStorage.getItem('token')
	//抛出结果,不然会被拦截,获取不到数据
	return config
})


Vue.prototype.$http = instance

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
