<template> 
  <div id="wraper">
    <nav class="navbar navbar-default">
      <div class="container">
        <a href="#" class="navbar-brand">
          <i class="glyphicon glyphicon-time"></i>
        </a>
        <ul class="nav navbar-nav">
          <li>
            <router-link to="/home">首页</router-link>
          </li>
          <li>
            <router-link to="/time-entries">计划列表</router-link>
          </li>          
        </ul>
        <ul class="nav navbar-nav navbar-right">
           <li>
            <router-link 
            v-if="signUpStatus"
            @signUpOK='signUp'
            to="/sign-up">注册</router-link>
           </li>
           <li>
            <router-link v-if="signInStatus" to="/sing-in">登陆</router-link>
          </li>
        </ul>
        <ul v-if="signStatus" class="nav navbar-nav navbar-right">
           <li> {{username}}</li>
           <li> <img :src="avatar"> </li>
        </ul>
      </div>
    </nav>
    <div v-if="signStatus" class="container">
      <div class="row">
        <div class="col-sm-2">
          <sidebar :time="totalTime">
        </div>
        <div class="col-sm-10">
          <keep-alive>
            <router-view @deleteTime='deleteTime' @timeUpdate='timeUpdate'>
            </router-view>
          </keep-alive>
        </div>
      </div>
    </div>
    <div class="container">
      <p class="text-center text-info">请注册/登陆使用本APP！</p>
    </div>
  </div>
</template>

<script>
  import Sidebar from './components/Sidebar.vue'

  export default {
    components: {
      'sidebar': Sidebar
    }, // 注册sidebar组件用于<sidebar>
    data () { // ES6简写，相当于data: function(){}
      return {
        totalTime: 0,
        signUpStatus: true,
        signInStatus: true,
        signStatus: false,
        username: '',
        avatar: ''
      }
    },
    methods: {
      timeUpdate (totalTime) { // 相当于timeUpdate: function(timeEntry){}
        this.totalTime += totalTime
      },
      deleteTime (totalTime) {
        this.totalTime -= totalTime
      },
      signUp (userData) {
        this.signUpStauts = false
        this.signInStatus = false
        this.signStatus = true
        this.username = userData.username
        this.avatar = userData.avatar
        this.$http.get('http://localhost:8888/time')
        .then(function (ret) {
          // console.log(ret)
          this.totalTime = ret.data.time
        })
        .then(function (err) {
          console.log(err)
        })
      }
    }
  }
</script>
