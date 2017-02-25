<template>
  <div class="form-horizontal">    
    <div class="form-group">
      <div class="col-sm-6">
        <label for="">日期</label>
        <input type="date" class="form-control" v-model="timeEntry.date" placeholder="Date" />  
      </div>
      <div class="col-sm-6">
        <label for="">时间</label>
        <input type="number" class="form-control" v-model="timeEntry.totalTime" placeholder="Hours" />
      </div>
    </div>
    <div class="form-group">
      <div class="col-sm-12">
        <label for="">备注</label>
        <input type="text" class="form-control" v-model="timeEntry.comment" placeholder="Comment" />
      </div>
    </div>
    <button class="btn btn-primary" @click="save()">保存</button>
    <router-link tag="button" class="btn btn-danger" to="/time-entries">取消
    </router-link>
  </div>
</template>

<script>
  export default {
    props: ['timeEntries', 'username'],
    data () {
      return {
        timeEntry: {}
      }
    },
    methods: {
      save: function () {
        var username = this.username
        this.$http.post('http://localhost:8888/create/' + username, {
          comment: this.timeEntry.comment,
          totalTime: this.timeEntry.totalTime,
          date: this.timeEntry.date
        }).then(function (res) {
          if (res.body.errcode !== -1) {
            var timeEntry = this.timeEntry
            timeEntry.id = res.body.id
            console.log(res)
            console.log(timeEntry)
            this.$emit('addNewEntry', timeEntry)
            this.timeEntry = {}
          } else {
            alert('请输入所有字段')
          }
        })
      }
    }
  }
</script>
