<template>
  <div id='sign-in' class = "container">
    <form class="form-horizontal">
      <div class="form-group">
        <label for="username" class="col-sm-2 control-label">用户名:</label>
        <div class="col-sm-10">
          <input 
          type="text" id="username" 
          class="form-control"
          @focus="error=false" 
          placeholder="请输入用户名"
          v-model="username">
        </div>
      </div>
      <div class="form-group">
        <label for="password" class="col-sm-2 control-label">密码:</label>
        <div class="col-sm-10">
          <input 
          type="password" id="password" 
          class="form-control"
          @focus="error=false" 
          placeholder="请输入密码"
          v-model="password">
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <div class="checkbox">
            <label>
              <input type="checkbox"> 7天内免登陆
            </label>
          </div>
        </div>
     </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">       
          <button  @click="signIn" type="submit" class="btn btn-default">登陆</button>
        </div>
      </div>
      <div class="form-group" v-if="error">
        <div class="col-sm-offset-2 col-sm-10">       
          <p class="text-dangerous">用户名或账号错误，请输入正确号码！</p>
        </div>
      </div>         
    </form>
  </div>
</template>

<script>
export default {
  name: 'sign-in',
  data () {
    return {
      username: '',
      password: '',
      error: false
    }
  },
  methods: {
    signIn () {
      var username = this.username
      var password = this.password
      this.$http.get('http://localhost:8888/users/' + username + '/' + password)
      .then(function (res) {
        console.log(res)
        if (res.body.errcode === -1) {
          this.error = true
        } else {
          this.$emit('signInOK', username)
        }
      })
    }
  }

}
</script>

<style scoped>

</style>
