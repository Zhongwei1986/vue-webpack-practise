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
    props: ['timeEntries'],
    data () {
      return {
        timeEntry: {
          // user: {
          //   name: 'zhongwei',
          //   email: 'kodo@forchange.cn',
          //   image: 'https://sfault-avatar.b0.upaiyun.com/888/223/888223038-5646dbc28d530_huge256'
          // }
        }
      }
    },
    methods: {
      save: function () {
        this.$http.post('http://localhost:8888/create', {
          comment: this.timeEntry.comment,
          totalTime: this.timeEntry.totalTime,
          date: this.timeEntry.date
        }).then(function (res) {
          console.log(res)
          let timeEntry = this.timeEntry
          console.log(timeEntry)
          this.$emit('addNewEntry', timeEntry)
          this.timeEntry = {}
        })
      }
    }
  }
</script>
