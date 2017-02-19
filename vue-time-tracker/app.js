var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var MongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://localhost:27017/mission';
var _db;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('dist'));

MongoClient.connect(mongoUrl, function(err, db) {
  if (err) {
    console.error(err);
    return;
  }

  console.log('connected to mongo');
  _db = db;
  app.listen(8888, function() {
    console.log('server is running...');
  });
});

// 使用post方法
app.post('/create', function(req, res, next) {
  // 接受前端发送的字段
  var mission = req.body;
  // 选择一个表，若无则自动创建
  var collection = _db.collection('my_mission');

  // 如果需要的字段不存在，则返回错误信息
  if (!mission.comment || !mission.totalTime || !mission.date) {
    res.send({ errcode: -1, errmsg: "params missed" });
    return;
  }

  collection.insert({ comment: mission.comment, totalTime: mission.totalTime, date: mission.date }, function(err, results) {
    if (err) {
      console.error(err);
      res.status(500).end();
    } else {
      res.send({ errcode: 0, errmsg: 'ok' });
    }
  });
});

app.all("*", function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
