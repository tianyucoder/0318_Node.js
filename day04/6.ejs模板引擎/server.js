let express = require('express')

let app = express()

//配置渲染引擎
app.set('view engine','ejs')
//配置模板文件夹
app.set('views','./views')

app.get('/',(request,response)=>{
  //用ejs渲染一个页面
  //const person = [{name:'kobe',age:18},{name:'wade',age:19},{name:'tianyu',age:20}]
  const data = '<h1>atguigu</h1>'
  response.render('index',{data})
})

//4.绑定端口监听
app.listen(3000,(err)=>{
  if(!err) console.log('服务器启动成功')
  else console.log(err)
})