<template>
  <div>
    <router-link tag="button" v-if="$route.path !== '/time-entries/log-time'" class="btn btn-primary" to="/time-entries/log-time">
      创建
    </router-link>
    <div v-if="$route.path ==='/time-entries/log-time'">
      <h3>创建</h3>
    </div>
    <hr>

    <router-view></router-view>
    <div class="time-entries">
      <p v-if="!timeEntries.length"><strong>还没有任何任务</strong></p>
      <div class="list-group">
        <a class="list-group-item" v-for="timeEntry in timeEntries">
          <div class="row">
            <div class="col-sm-2 user-details">
              <img :src="timeEntry.user.image" class="avata img-circle img-responsive">
              <p class="text-center"><strong>{{ timeEntry.user.name}}</strong></p>
            </div>
            <div class="col-sm-2 text-center time-block">
              <h3 class="list-group-item-text total-time">
              <i class="glyphicon glyphicon-time"></i>
              {{ timeEntry.totalTime}}
              </h3>
              <p class="label label-primary text-center">
              <i class="glyphocon glyphicon-canlendar"></i>
              {{ timeEntry.data}}
              </p>
            </div>
            <div class="col-sm-7 comment-section">
              <p>{{ timeEntry.comment}}</p>
            </div>
            <div class="col-sm-1">
              <button class="btn btn-xs btn-danger delete-button" 
              @click="deletTimeEntry(timeEntry)">X</button>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      let existingEntry = {
        user: {
          name: 'zhongwei',
          email: 'zhouzhongwei1986@sina.com',
          image: 'https://sfault-avatar.b0.upaiyun.com/888/223/888223038-5646dbc28d530_huge256'
        },
        comment: '我的一个备注',
        totalTime: 1.5,
        data: '2017.02.17'
      }
      return {
        timeEntries: [existingEntry]
      }
    },
    methods: {
      deleteTimeEntry (timeEntry) {
        let index = this.timeEntries.indexOf(timeEntry)
        if(window.confirm('确定要删除吗？')){
          this.timeEntries.splice(index,1)
          this.$dispatch('deleteTime', timeEntry)
        }
      }
     }
  }
</script>