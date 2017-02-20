<template>
  <div id="wraper">
    <nav class="navbar navbar-default">
      <div class="container">

        <a href="#" class="navbar-brand">
          <i class="glyphicon glyphicon-time"></i> 计划表
        </a>
        <ul class="nav navbar-nav">
          <li>
            <router-link to="/home">首页</router-link>
          </li>
          <li>
            <router-link to="/time-entries">计划列表</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <div class="row">
        <div class="col-sm-3">
          <sidebar :time="totalTime">
        </div>
        <div class="col-sm-9">
          <keep-alive>
            <router-view @deleteTime='deleteTime' @timeUpdate='timeUpdate'>
            </router-view>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Sidebar from './components/Sidebar.vue'

  export default {
    components: { 'sidebar': Sidebar }, // 注册sidebar组件用于<sidebar>
    data () { // ES6简写，相当于data: function(){}
      return {
        totalTime: 0
      }
    },
    methods: {
      timeUpdate (totalTime) { // 相当于timeUpdate: function(timeEntry){}
        this.totalTime += totalTime
      },
      deleteTime (totalTime) {
        this.totalTime -= totalTime
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.$http.get('http://localhost:8888/time')
          .then(function (ret) {
            // console.log(ret)
            this.totalTime = ret.data.time
          })
          .then(function (err) {
            console.log(err)
          })
      })
    }
  }
</script>
