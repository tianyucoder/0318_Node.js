//1.引入express模块
let express = require('express')

//2.创建app应用对象-------相当于例子中的服务员
let app = express()

//GET与POST请求。
/*
* GET请求与POST请求？
*       1.什么时候用GET请求：
*           -单纯获取数据的时候，用GET请求。
*           -请求中包含非敏感数据的时候用GET请求。
*           -用户通过浏览器输入网址，这种请求方式属于GET请求（不可更改）
*
*       2.什么时候用POST请求：
*           -传送相对敏感的数据，用POST请求。
*           -传送的数据可能会作为数据源写入数据库的时候，用POST。
*           备注：POST不代表着绝对安全。
*
*       3.哪些请求是POST请求？
*            -1.form表单通过修改method='post'，发送的是POST请求。
*            -2.使用Ajax发请求时，修改请求方式为post，发送的是POST请求。
*            -3.使用了一些第三方请求库，明确指出了使用POST方式，发送的是POST请求。
*
  * */

//3.设置路由 ------- 后端路由   对请求的网址(URL)进行一个分类处理
app.get('/',(request,response)=>{
  //获取GET请求的查询字符串参数
  console.log(request.query);

  //用户输入网址，请求页面的这种方式是GET请求
  response.send('<h1>客官你好，我是网站的主页</h1>')

})

app.get('/meishi',(request,response)=>{
  //用户输入网址，请求页面的这种方式是GET请求
  response.send('<h1>客官你好，我是美食界面，有很多好吃的</h1>')
})

app.get('/demo',(req,res)=>{
  //post请求过来的参数，不可以通过req.query获取，要通过一个新的属性，而且需要借助一个中间件完成。
  //console.log(req.query);
  res.send('ok')
})


//4.绑定端口监听
app.listen(3000,(err)=>{
  if(!err) console.log('服务器启动成功')
  else console.log(err)
})