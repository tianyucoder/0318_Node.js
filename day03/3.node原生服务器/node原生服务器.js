//1.引入http模块---------http模块是Node中的核心模块，无需下载，引入即可使用
let http = require('http')
let {parse} = require('querystring')

//2.创建服务对象
let server = http.createServer((request,response)=>{
  /*
  * request请求对象 ------- 客户端发过的数据，都在request里面
  * response响应对象 ------- 将要交给客户端的数据，都在response这里面
  * */

  //获取客户端传递过来的参数（地址栏传递过来的参数--查询字符串）
  let param = request.url.split('?')[1]
  let paramObj = parse(param)
  console.log(paramObj)

  response.setHeader('content-type','text/html;charset=utf-8')
  if(paramObj.name === 'zhangsan'){
    response.end('<h1>hello! 你好zhangsan</h1>')
  }else if(paramObj.name === 'lisi'){
    response.end('<h1>hello! 你好lisi</h1>')
  }
  response.end('<h1>hello! 你好陌生人</h1>')


})

//3.绑定端口监听
server.listen(3000,(err)=>{
  if(!err) console.log('服务器启动成功了')
  else console.log(err)
})








