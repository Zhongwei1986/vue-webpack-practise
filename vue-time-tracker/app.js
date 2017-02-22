var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var morgan = require('morgan')
var MongoClient = require('mongodb').MongoClient
var mongoUrl = 'mongodb://localhost:27017/mission'
var _db
var ObjectID = require('mongodb').ObjectID

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(express.static('dist'))

MongoClient.connect(mongoUrl, function (err, db) {
  if (err) {
    console.error(err)
    return
  }

  console.log('connected to mongo')
  _db = db
  app.listen(8888, function () {
    console.log('server is running...')
  })
})

// 设置response header，实现CORS(Cross-Origin resource sharing)
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})

// 创建用户
app.post('/users', function (req, res, next) {
  var user = req.body
  console.log(user)
  var collection = _db.collection('users')
  collection.insert(user, function (err, result) {
    console.log(result)
    if (err) {
      console.error(err)
      res.status(500).end()
    } else {
      res.send({
        errcode: 0,
        errmsg: 'ok'
      })
    }
  })
})

// 增加列表
app.post('/create', function (req, res, next) {
  var mission = req.body

  // 选择一个表，若无则自动创建
  var collection = _db.collection('my_mission')

  // 如果需要的字段不存在，则返回错误信息
  if (!mission.comment || !mission.totalTime || !mission.date) {
    res.send({
      errcode: -1,
      errmsg: 'params missed'
    })
    return
  }

  collection.insert({
    comment: mission.comment,
    totalTime: mission.totalTime,
    date: mission.date
  }, function (err, ret) {
    if (err) {
      console.error(err)
      res.status(500).end()
    } else {
      res.send({
        errcode: 0,
        errmsg: 'ok'
      })
    }
  })
})

// 获取列表及时间
app.get('/time-entries', function (req, res, next) {
  var collection = _db.collection('my_mission')
  collection.find({}).toArray(function (err, ret) {
    if (err) {
      console.error(err)
      return
    }
    res.json(ret)
  })
})

// 删除计划
app.delete('/delete/:id', function (req, res, next) {
  var _id = req.params.id // req.params是请求参数，也就是{id:XXXXXX},该id是数据库返给前端的
  var collection = _db.collection('my_mission')
  console.log(req.params)
    // 使用mongodb的唯一ObjectId字段查找出对应id删除记录
  collection.remove({
    _id: new ObjectID(_id) // 生成ObjectID对象，用于定位对应文档
  }, function (err, ret) {
    if (err) {
      console.error(err)
      res.status(500).end()
    } else {
      res.send({
        errcode: 0,
        errmsg: 'ok'
      })
    }
  })
})
