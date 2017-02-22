<template>
  <div id='sign-up' class="container">
    <form class="form-horizontal">
      <div class="form-group">
        <label for="username" class="col-sm-2 control-label">用户名:</label>
        <div class="col-sm-10">
          <input 
          type="text" id="username" 
          class="form-control" 
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
          placeholder="请输入密码"
          v-model="password">
        </div>
      </div>
      <div class="form-group">
        <label for="avatar" class="col-sm-2 control-label">头像:</label>
        <div class="col-sm-10">
          <input type="file" id="avatar" class="form-control" ref="avatar">
        </div>
      </div>
      <div class="form-group">
       <div class="col-sm-offset-2 col-sm-10">       
        <button @click="addUser" type="submit" class="btn btn-default">注册</button>
       </div>
      </div>     
    </form>
  </div>
</template>

<script>
export default {
  name: 'sign-up',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    addUser () {
      const fileInput = this.$refs.avatar
      let file = fileInput.files[0]
      console.log(file)
      let user = {
        name: this.username,
        password: this.password,
        avatar: file
      }
      this.$http.post('http://localhost:8888/users', {user})
      .then(function (res) {
        if (res.data.errcode === 0) {
          this.$emit('signUpOK', {
            username: this.username,
            avatar: file
          })
        }
      })
    }
  }
}
</script>
