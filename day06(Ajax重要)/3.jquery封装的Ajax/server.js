let express = require('express')

let app = express()
app.use(express.static('public'))
app.disable('x-powered-by')
app.use(express.urlencoded({extended:true}))

app.get('/testGET',(request,response)=>{
  console.log(request.query);
  console.log('testGET路由被调用了')
  response.send('我是服务器返回的GET请求的信息')
})

app.post('/testPOST',(request,response)=>{
  console.log(request.query);
  console.log(request.body);
  console.log('testPOST路由被调用了')
  response.send('我是服务器返回的POST请求的信息')
})

app.listen(3000,(err)=>{
  if(!err) {
    console.log('测试jQuery封装的Ajax请求的地址是：http://localhost:3000/jquery_ajax.html')
  }
  else {
    console.log(err)
  }
})