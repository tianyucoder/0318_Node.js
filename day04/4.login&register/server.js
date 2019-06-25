//引入express
let express = require('express')
//设置端口
const PORT = 3000

//创建app应用对象
let app = express()
//使用中间件解析post请求的请求体
app.use(express.urlencoded({extended:true}))


//设置路由 ----- 用户注册的路由
app.post('/register',(request,reponse)=>{

  //1.获取用户的输入
  let {email,user_name,password,re_password} = request.body //对象类型

  //2.校验数据格式 ----- 正则
  let emailReg = /^[a-zA-Z0-9_]{5,16}@[a-zA-Z0-9]{2,8}\.com$/ //校验邮箱的正则
  let userName = /^[a-zA-Z0-9]{5,16}$/ //校验姓名的正则
  let passwordReg = /^[a-zA-Z0-9_#@!]{6,20}$/ //校验邮箱的正则
  //使用正则去校验
  if(!emailReg.test(email)){
    reponse.send('邮箱输入不合法，应为用户名@主机名.com,用户名长度：5-16，主机名长度：2-8')
    return
  }else if(!userName.test(user_name)){
    reponse.send('姓名输入不合法，应为5-16的英文字母或数字')
    return
  }else if(!passwordReg.test(password)){
    reponse.send('密码输入不合法，应为6-20的英文字母或数字或#@!')
    return
  }else if(password !== re_password){
    reponse.send('两次输入密码不一致')
    return
  }
  
  console.log('模拟查询')



  //3.去数据库中查找该邮箱是否注册过
  //4.写入数据

  reponse.send('ok')
})


//绑定端口监听
app.listen(PORT,(err)=>{
  if(!err) console.log(`服务器启动成功了,端口号为:${PORT}`)
  else console.log(err)
})