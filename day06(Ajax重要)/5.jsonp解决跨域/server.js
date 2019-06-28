let express = require('express')

let app = express()
app.disable('x-powered-by')
app.use(express.urlencoded({extended:true}))

app.get('/testGET',(request,response)=>{
  let {callback} = request.query
  let person = [{name:'kobe',age:18},{name:'wade',age:19}]
  let str = `${callback}(${JSON.stringify(person)})`
  console.log(str)
  response.send(str)
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