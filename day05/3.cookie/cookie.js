/*
* 关于cookie
*     1.是什么？
*         本质就是一个字符串，里面包含着浏览器和服务器沟通的信息（交互时产生的信息）。
*         存储的形式以：key-value的形式存储。
*         浏览器会自动携带该网站的cookie，只要是该网站下的cookie，全部携带。
*     2.分类：
*           --会话cookie（关闭浏览器后，会话cookie会自动消失，会话cookie存储在浏览器运行的那块内存上）。
*           --持久化cookie：（看过期时间，一旦到了过期时间，自动销毁，存储在用户的硬盘上）。
*
*     3.工作原理：（例子中的小纸条）
*           --当浏览器第一次请求服务器的时候，服务器可能返回一个或多个cookie给浏览器
*           --浏览器判断以下cookie种类
*               --会话cookie：存储在浏览器运行的那块内存上
*               --持久化cookie：存储在用户的硬盘上
*           --以后请求该网站的时候，自动携带上该网站的所有cookie（无法进行干预）
*           --服务器拿到之前自己“种”下cookie，分析里面的内容，校验cookie的合法性，根据cookie里保存的内容，进行具体的业务逻辑。
*
*      4.应用：
*           解决http无状态的问题（例子：7天免登录，一般来说不会单独使用cookie，一般配合后台的session存储使用）
*
*      5.不同的语言、不同的后端架构cookie的具体语法是不一样的，但是cookie原理和工作过程是不变的。
*         备注：cookie不一定只由服务器生成，前端同样可以生成cookie，但是前端生成的cookie几乎没有意义。
* */

/*
* 1.如何“种”下一个cookie（服务器生成一个cookie，交给浏览器进行保存）
* 2.去获取客户端携带过来的cookie
* 3.删除一个cookie
* */

let express = require('express')
let cookieParser = require('cookie-parser')

let app = express()
app.use(cookieParser())

//test路由：1.给客户端种下一个cookie
app.get('/test',(request,response)=>{
  //在express中，设置cookie无需任何内置库和第三方库，直接就可以完成

  //1.给客户端种下一个会话cookie
  //res.cookie('demo',123)

  //2.给客户端种下一个持久化cookie
  response.cookie('demo',123,{maxAge:1000*300})

  response.send('ok')
})

app.get('/test2',(request,response)=>{
  //在express中，如果想获取cookie，需要用到一个第三发的库：cookie-parser
  //获取客户端携带过来的cookie
  console.log(request.cookies);
  response.send('ok')
})


app.get('/test3',(request,response)=>{
  //告诉客户端删除一个cookie

  //删除方法一   立即过期
  //res.cookie('demo',123,{maxAge:0})

  //删除方法一   调用删除的API
  response.clearCookie('demo')

  response.send('ok')
})

app.listen(3000,(err)=>{
  if(!err) console.log('ok')
  else console.log(err)
})
