// 引入编写好的api
const api = require('./api');
const db = require('./db/connect');
// 引入文件模块
const fs = require('fs');
// 引入处理路径的模块
const path = require('path');
// 引入处理post数据的模块
const bodyParser = require('body-parser')
// 引入Express
const express = require('express');
// 引入 express-session
const expressSession = require('express-session')
const MongoStore = require('connect-mongo')(expressSession)
const uidSafe = require('uid-safe')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
app.use(express.static(path.resolve(__dirname, '../dist')))
// session
app.use(expressSession({name:'blog',store: new MongoStore({mongooseConnection: db.openDB()}), secret:'allen',resave: true, saveUninitialized: true,cookie: ('name', 'value', { path: '/', httpOnly: false,secure: false, maxAge:null})}));
//app.set('trust proxy', 1) // trust first proxy


//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin)
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",'3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  // 允许跨域cookie存储
  res.header("Access-Control-Allow-Credentials", "true")
  if(req.method=="OPTIONS") res.sendStatus(200);/*让options请求快速返回*/
  else  next();
});

app.use(api);
//db.openDB();
// 监听8088端口
app.listen(8088);
console.log('success listen…………', 8088);
