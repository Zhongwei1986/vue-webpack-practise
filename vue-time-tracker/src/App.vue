<template>
    <div id="wraper">
      <nav class="navbar navbar-default">
        <div class="container">
          <a href="#" class="navbar-brand">
            <i class="glyphicon glyphicon-time"></i>
          </a>
          <ul class="nav navbar-nav">
            <li>
              <router-link v-if="!signStatus" to="/home">首页</router-link>
            </li>
            <li>
              <router-link v-if="signStatus" to="/time-entries">计划列表</router-link>
            </li>          
          </ul>
          <ul v-if="!signStatus" class="nav navbar-nav navbar-right">
            <li>
              <router-link
              to="/sign-up">注册</router-link>
            </li>
            <li>
              <router-link
              to="/sign-in">登陆</router-link>
            </li>
          </ul>
          <ul v-if="signStatus" class="nav navbar-nav navbar-right">
            <li> <a>{{username}}</a></li>
            <li> <a><img :src="avatar"></a></li>
          </ul>
        </div>
      </nav>
      <router-view
       @signUpOK='signIn'
       @signInOk="signIn"  
       :username = "username"         
      ></router-view>      
    </div>
</template>

<script>
  
  export default {
    data () { // ES6简写，相当于data: function(){}
      return {
        signStatus: false,
        username: '',
        avatar: ''
      }
    },
    methods: {
      signIn (userData) {
        this.signStatus = true
        console.log('登陆成功')
        this.username = userData.username
        this.avatar = userData.avatar
        this.$router.push('time-entries')
      }
    }
  }
</script>
