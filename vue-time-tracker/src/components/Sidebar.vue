<template>
  <div class="panel panel-info">
    <div class="panel-heading">
      <h3 class="panel-title text-center">已有时长</h2>
    </div>
    <div class="panel-body">
      <p class="text-center">{{ time }} 小时</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['time']
  }
</script>
