//引入express
let express = require('express')
//引入数据库连接模块
let db = require('./db')
//引入user模型对象
let usersModel = require('./model/users')
//设置端口
const PORT = 3000

//创建app应用对象
let app = express()
//使用中间件解析post请求的请求体
app.use(express.urlencoded({extended:true}))
//暴露静态资源
app.use(express.static('public'))

//连接数据库
db
  .then(()=>{
    //用户注册的路由-----业务路由----注册
    app.post('/register',async(request,reponse)=>{

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

      //try里面写可能出错的代码
      try{
        //3.去数据库中查找该邮箱是否注册过
        let findResult = await usersModel.findOne({email})
        if(findResult){
          //邮箱已经注册过
          reponse.send(`${email}邮箱已经注册过，不能重复注册`)
        }else{
          //邮箱没有注册过
          await usersModel.create({email,user_name,password})
          reponse.send(`${email}邮箱注册成功！`)
          console.log(`邮箱为：${email}，姓名为：${user_name}的用户注册成功！${Date.now()}`)
        }
      }
      catch(err){
        //计数操作，一些安全性的操作写在此处
        console.log(err)
        reponse.send('当前网络不稳定，请稍后重试！')
      }
    })

    //用户登录的路由-----业务路由----登录
    app.post('/login',async(request,reponse)=>{
      //1.获取用户的输入
      let {email,password} = request.body //对象类型
      //2.校验数据格式 ----- 正则
      let emailReg = /^[a-zA-Z0-9_]{5,16}@[a-zA-Z0-9]{2,8}\.com$/ //校验邮箱的正则
      let passwordReg = /^[a-zA-Z0-9]{5,16}$/ //校验密码的正则
      //3.使用正则去校验
      if(!emailReg.test(email)){
        reponse.send('邮箱输入不合法，应为用户名@主机名.com,用户名长度：5-16，主机名长度：2-8')
        return
      }else if(!passwordReg.test(password)){
        reponse.send('密码输入不合法，应为6-20的英文字母或数字或#@!')
        return
      }
      //去数据库中查找
      try{
        let findResult = await usersModel.findOne({email,password})
        if(findResult){
          //登录成功了
          console.log(`邮箱为${email}的用户登录成功`)
          reponse.redirect('https://www.baidu.com')
        }else{
          //登录失败------真实项目中在这里会做一些安全性处理
          console.log(`邮箱为${email}的用户登录失败`)
          reponse.send('登录失败，邮箱或密码不正确！')
        }
      }
      catch(err){
        
      }



    })

    //UI路由---注册页面
    app.get('/register',(request,reponse)=>{
      reponse.sendFile(__dirname+'/public/register.html')
    })
    //UI路由---登录页面
    app.get('/login',(request,reponse)=>{
      reponse.sendFile(__dirname+'/public/login.html')
    })
  })
  .catch((err)=>{
    console.log(err)
  })


//绑定端口监听
app.listen(PORT,(err)=>{
  if(!err) console.log(`服务器启动成功了,端口号为:${PORT}`)
  else console.log(err)
})