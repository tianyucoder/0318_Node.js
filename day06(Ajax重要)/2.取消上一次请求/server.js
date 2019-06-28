let express = require('express')

let app = express()
app.use(express.static('public'))
app.disable('x-powered-by')
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