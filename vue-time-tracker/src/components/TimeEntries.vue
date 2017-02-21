<template>
  <div>
    <router-link 
    tag="button" 
    v-if="$route.path !== '/time-entries/log-time'" 
    class="btn btn-primary" 
    to="/time-entries/log-time">
      创建
    </router-link>
    <div v-if="$route.path ==='/time-entries/log-time'">
      <h3>创建</h3>
    </div>
    <hr>

    <router-view @addNewEntry='entriesUpdate'></router-view>
    <hr>
    <div class="time-entries">
      <p v-if="!timeEntries.length"><strong>还没有任何任务</strong></p>
      <div class="list-group">
        <a class="list-group-item" v-for="timeEntry in timeEntries">
          <div class="row">
            <div class="col-sm-2 user-details">
              <img src="https://avatars1.githubusercontent.com/u/10184444?v=3&s=460" class="avatar img-circle img-responsive">
              <p class="text-center"><strong>zhongwei</strong></p>
            </div>
            <div class="col-sm-2 text-center time-block">
              <h3 class="list-group-item-text total-time">
                <i class="glyphicon glyphicon-time"></i> {{ timeEntry.totalTime}}
              </h3>
              <p class="label label-primary text-center">
                <i class="glyphocon glyphicon-canlendar"></i> {{ timeEntry.date}}
              </p>
            </div>
            <div class="col-sm-7 comment-section">
              <p>{{ timeEntry.comment}}</p>
            </div>
            <div class="col-sm-1">
              <button class="btn btn-xs btn-danger delete-button" @click="deleteTimeEntry(timeEntry)">
              X
              </button>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['usrname'],
  data () {
    return {
      timeEntries: []
    }
  },
  created () {
    this.getTimeEntries()
  },
  methods: {
    getTimeEntries () {
      this.$http.get('http://localhost:8888/time-entries')
        .then(function (ret) {
          this.timeEntries = ret.data  // data中每个元素拥有从数据库返回的_id字段名
        })
        .then(function (err) {
          console.log(err)
        })
    },
    deleteTimeEntry (timeEntry) {
      let index = this.timeEntries.indexOf(timeEntry)
      let _id = this.timeEntries[index]._id
      if (window.confirm('确定要删除吗？')) {
        this.$http.delete('http://localhost:8888/delete/' + _id)
          .then(function (err) {
            console.log(err)
          })
        this.timeEntries.splice(index, 1)
        this.$emit('deleteTime', timeEntry.totalTime)
      }
    },
    entriesUpdate (timeEntry) {
      this.timeEntries.push(timeEntry)
      this.$emit('timeUpdate', timeEntry.totalTime)
    }
  }
}
</script>

<style>
  .avatar {
    height: 75px;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .user-details {
    background-color: #f5f5f5;
    border-right: 1px solid #ddd;
    margin: -10px 0;
  }
  .time-block {
    padding: 10px;
  }
  .comment-section {
    padding: 20px;
  }
</style>
