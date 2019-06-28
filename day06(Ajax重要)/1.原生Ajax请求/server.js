let express = require('express')

let app = express()
app.use(express.static('public'))
app.disable('x-powered-by')
app.get('/testGET',(request,response)=>{
  console.log(request.query);
  console.log('testGET路由被调用了')
  response.send('我是服务器返回的GET请求的信息')
})

app.listen(3000,(err)=>{
  if(!err) console.log('测试原生js发送Ajax-GET请求的地址是：http://localhost:3000/ajax_get.html')
  else console.log(err)
})