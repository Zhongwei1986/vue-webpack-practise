<template>
  <div class="container">
    <div class="row">

      <div class="col-sm-2">
        <div class="panel panel-info">
          <div class="panel-heading">
            <h3 class="panel-title text-center">已有计划时长</h2>
          </div>
          <div class="panel-body">
            <p class="text-center">{{ totalTime }} 小时</p>
          </div>
        </div>
      </div>
      
      <div class="col-sm-10">
        <router-link 
        tag="button" 
        v-if="$route.path !== '/time-entries/log-time'" 
        class="btn btn-primary" 
        to="/time-entries/log-time">创建</router-link>
       <div v-if="$route.path ==='/time-entries/log-time'">
          <h3>创建</h3>
        </div>
    
       <router-view 
       @addNewEntry='entriesUpdate'
       :username='username'></router-view>
  
       <div class="time-entries">
         <p v-if="!timeEntries.length"><strong>还没有任何任务</strong></p>
         <div class="list-group">
           <a class="list-group-item" v-for="timeEntry in timeEntries">
             <div class="row">
               <div class="col-sm-2 user-details">
                 <img src="https://avatars1.githubusercontent.com/u/10184444?v=3&s=460" class="avatar img-circle img-responsive">
                 <p class="text-center"><strong>{{ username }}</strong></p>
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
    </div>
  </div>
</template>

<script>
export default {
  props: ['username'],
  data () {
    return {
      timeEntries: [],
      totalTime: 0
    }
  },
  created () {
    this.getTimeEntries()
  },
  methods: {
    getTimeEntries () {
      this.$http.get('http://localhost:8888/time-entries', this.username)
        .then(function (ret) {
          this.timeEntries = ret.data
          ret.data.forEach(function (item, index) {
            this.totalTime += item.totalTime
          })
        })
        .then(function (err) {
          console.log(err)
        })
    },
    deleteTimeEntry (timeEntry) {
      var index = this.timeEntries.indexOf(timeEntry)
      var id = timeEntry.id
      var username = this.username
      if (window.confirm('确定要删除吗？')) {
        this.$http.delete('http://localhost:8888/delete/' + username + '/' + id)
          .then(function (err) {
            console.log(err)
          })
        this.totalTime -= timeEntry.totalTime
        this.timeEntries.splice(index, 1)
      }
    },
    entriesUpdate (timeEntry) {
      this.timeEntries.push(timeEntry)
      this.totalTime += timeEntry.totalTime
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
