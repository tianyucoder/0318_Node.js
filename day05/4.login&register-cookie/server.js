//引入express
let express = require('express')
//引入数据库连接模块
let db = require('./db')
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