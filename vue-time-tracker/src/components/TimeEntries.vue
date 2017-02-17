<template>
  <div>
    <router-link 
      v-if="$route.path !== '/time-entries/log-time'"
      class="btn btn-primary"
      to="/time-entries/log-time"
    >
      创建
    </router-link>
    <div v-if="1route.path ==='/time-entries/log-time'">
      <h3>创建</h3>
    </div>
    <hr>
    
  </div>
</template>