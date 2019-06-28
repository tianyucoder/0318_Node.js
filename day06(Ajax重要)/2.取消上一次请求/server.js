//引入express框架
let express = require('express')
//创建app应用对象
let app = express()
//暴露静态资源
app.use(express.static('public'))
//引入服务器内部具体实现
app.disable('x-powered-by')
//用于解析post请求的请求体参数
app.use(express.urlencoded({extended:true}))

app.get('/getAuthCode',(request,response)=>{
  console.log('验证码路由被调用了')
  setTimeout(()=>{
    let authCode = Math.floor(Math.random()*8999 + 1000)
    console.log(authCode)
    response.send(authCode.toString())
  },2000)
})

app.listen(3000,(err)=>{
  if(!err) {
    console.log('测试原生js发送Ajax-GET请求的地址是：http://localhost:3000/get_auth_code.html')
  }
  else {
    console.log(err)
  }
})