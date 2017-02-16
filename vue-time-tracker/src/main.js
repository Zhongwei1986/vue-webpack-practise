// 导入模块
import Vue from 'vue'
import App from './App.vue'
import Home from './components/Home.vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

// 注册两个插件
Vue.use(VueResource)
Vue.use(VueRouter)

// 定义一个vue-router实例
const router = new VueRouter({ // Vue-router 2.0X
  routes: [
    { path: '/Home', component: Home, redirect: { '*': '/Home' } }
  ]
})

// 初始化router
Vue({
  el: '#app',
  router: router,
  template: App
})
