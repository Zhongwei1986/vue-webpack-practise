<template>
  <div id='sign-in'>
    <form class="form-horizontal">
      <div class="form-group">
        <label for="username" class="col-sm-2 control-label">用户名:</label>
        <div class="con-sm-10">
          <input 
          type="text" id="username" 
          class="form-control" 
          placeholder="请输入用户名"
          v-model="username">
        </div>
      </div>
      <div class="form-group">
        <label for="password" class="col-sm-2 control-label">密码:</label>
        <div class="con-sm-10">
          <input 
          type="text" id="password" 
          class="form-control" 
          placeholder="请输入密码"
          v-model="password">
        </div>
      </div>
      <button @click="signIn" type="submit" class="btn btn-default">登陆</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'sign-in'

}
</script>

<style scoped>

</style>
