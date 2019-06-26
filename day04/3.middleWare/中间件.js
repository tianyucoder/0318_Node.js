/*
 中间件：
     概念：本质上就是一个函数，包含三个参数：request、response、next

 作用：
        1)	执行任何代码。
        2)	修改请求和响应对象。
        3)	终结请求-响应循环。
        4)	调用堆栈中的下一个中间件。
  分类：
        1)	应用(全局)级中间件（过滤非法的请求，例如防盗链）
              --第一种写法：app.use((request,response,next)=>{}
              --第二种写法：使用函数定义
        2)	第三方中间件（通过npm下载的中间件，例如body-parser）
              --app.use(bodyParser.urlencoded({extended:true}))
        3)	内置中间件（express内部封装好的中间件）
              --app.use(express.urlencoded({extended:true}))
              --app.use(express.static('public'))
        4)	路由器中间件 （Router）
              --后面会说
   备注：
        在express中，定义路由和中间件的时候，根据定义的顺序（代码的顺序），将定义的每一个中间件或路由，
        放在一个类似于数组的容器中，当请求过来的时候，一次从容器中取出中间件和路由，进行匹配，如果匹配
        成功，交由该路由或中间件处理。
 */

let express = require('express')
//let bodyParser = require('body-parser')

let app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.static('public')) //暴露静态资源
//app.use(bodyParser({extended:true}))//解析post请求请求体中的参数为一个对象，并挂载到request

//应用级（全局）中间件 ---- 第一种写法
/*app.use((request,response,next)=>{
  console.log('应用级中间件被调用了')
  let host = request.get('Host')
  if(host !== 'localhost:3000'){
    response.send('禁止盗用本站链接')
  }else{
    next() //让下一个能够匹配的路由或中间件生效
  }
})*/

//应用级（全局）中间件 ---- 第二种写法
function myMiddleWare(request,response,next) {
  console.log('应用级中间件被调用了')
  let host = request.get('Host')
  if(host !== 'localhost:3000'){
    response.send('禁止盗用本站链接')
  }else{
    next() //让下一个能够匹配的路由或中间件生效
  }
}

//一级路由
app.post('/test3',(request,response)=>{

  console.log(request.body);
  response.send('我是test3路由')
})

//一级路由
app.get('/test2',myMiddleWare,myMiddleWare2,(request,response)=>{
  response.send('我是test2路由')
})

//一级路由
app.get('/test',myMiddleWare,(request,response)=>{
  response.send('我是test路由')
})

app.get('/index',(request,response)=>{
  response.sendFile(__dirname+'/public/index.html')
})


app.listen(3000,(err)=>{
  if(!err) console.log('服务器启动成功了')
  else console.log(err)
})
