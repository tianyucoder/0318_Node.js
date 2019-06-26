//引入express
let express = require('express')
//引入数据库连接模块
let db = require('./db')
//引入express-session
let session = require('express-session');
//引入connect-mongo---用于session的持久化
let MongoStore = require('connect-mongo')(session);
//引入业务路由loginRegister
let loginRegister = require('./router/loginRegister')
//引入UI路由
let UIRouter =  require('./router/UIRouter')

//设置端口
const PORT = 3000

//创建app应用对象
let app = express()
//使用中间件解析post请求的请求体
app.use(express.urlencoded({extended:true}))
//暴露静态资源
app.use(express.static('public'))
//配置模板引擎
app.set('view engine','ejs')
//配置模板目录
app.set('views','./views')

app.use(session({
  name: 'userId',   //设置cookie的name，默认值是：connect.sid
  secret: 'atguigu', //参与加密的字符串（又称签名）
  saveUninitialized: false, //是否在存储内容之前创建会话
  resave: true ,//是否在每次请求时，强制重新保存session，即使他们没有变化
  store: new MongoStore({
    url: 'mongodb://localhost:27017/session_container',
    touchAfter: 24 * 3600 //修改频率（例：//在24小时之内只更新一次）
  }),
  cookie: {
    httpOnly: true, // 开启后前端无法通过 JS 操作cookie
    maxAge: 1000*30 // 设置cookie的过期时间
  },
}));

//连接数据库
db
  .then(()=>{
      //使用登录-注册业务路由器
      app.use(loginRegister)
      //使用UI路由器
      app.use(UIRouter)
  })
  .catch((err)=>{
    //若进入此处表示连接数据库时出错
    console.log(err)
  })

//绑定端口监听
app.listen(PORT,(err)=>{
  if(!err) console.log(`服务器启动成功了,端口号为:${PORT}`)
  else console.log(err)
})