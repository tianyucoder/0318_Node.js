//引入express框架
let express = require('express')
//创建app应用对象
let app = express()
//引入服务器内部具体实现
app.disable('x-powered-by')
//用于解析post请求的请求体参数
app.use(express.urlencoded({extended:true}))

app.get('/testGET',(request,response)=>{
  console.log(request.query);
  //从请求的url中获取callback属性对应的值（采用了解构赋值的方式）
  let {callback} = request.query
  //模拟一个人的数组
  let person = [{name:'kobe',age:18},{name:'wade',age:19}]
  //构建一个字符串，该字符串“刚好”符合js语法规则
  let str = `${callback}(${JSON.stringify(person)})`
  console.log(str,typeof str)
  //返回内容
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