// 导入模块
import Vue from 'vue'
import App from './App.vue'
import Home from './components/Home.vue'
import TimeEntries from './components/TimeEntries.vue'
import LogTime from './components/LogTime.vue'
import SignUp from './components/SignUp.vue'
import SignIn from './components/SignIn.vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

// 注册两个插件
Vue.use(VueResource)
Vue.use(VueRouter)

// 定义一个vue-router实例
const router = new VueRouter({ // Vue-router 2.0X
  routes: [{
    path: '/',
    component: Home
  }, {
    path: '/home',
    component: Home
  }, {
    path: '/time-entries',
    component: TimeEntries,
    children: [{
      path: 'log-time',
      component: LogTime
    }]
  }, {
    path: '/sign-in',
    component: SignIn
  }, {
    path: '/sign-up',
    component: SignUp
  }]
})

// 初始化Vue实例
new Vue({ // eslint-disable-line no-new
  el: '#app',
  router: router,
  components: { // 局部注册App组件，将APP.vue中的template标签内容渲染到index.html中的自定义元素app中
    'app': App
  }
})
