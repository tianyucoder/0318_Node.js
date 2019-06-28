let express = require('express')

let app = express()
app.disable('x-powered-by')
app.use(express.urlencoded({extended:true}))

app.get('/testGET',(request,response)=>{
  response.set('Access-Control-Allow-Origin','http://localhost:63342')
  response.send('我是服务器返回的GET请求的响应')
})

app.listen(3000,(err)=>{
  if(!err) {
    console.log('在测试jsonp解决跨域，要在webstorm中点击浏览器图标打开html页面！！')
    console.log('【兄弟不要用localhost:3000去打开页面了！！！！！！】')
  }
  else {
    console.log(err)
  }
})