/*
* 登录与注册路由器-----业务路由器
* */
//引入Router
let {Router} = require('express')
//实例化一个Router
let router = new Router()
//引入user模型对象
let usersModel = require('../model/users')

//业务路由----注册
router.post('/register',async(request,response)=>{

  //1.获取用户的输入
  let {email,user_name,password,re_password} = request.body //对象类型

  //2.校验数据格式 ----- 正则
  let emailReg = /^[a-zA-Z0-9_]{5,16}@[a-zA-Z0-9]{2,8}\.com$/ //校验邮箱的正则
  let userName = /^[a-zA-Z0-9]{5,16}$/ //校验姓名的正则
  let passwordReg = /^[a-zA-Z0-9_#@!]{6,20}$/ //校验邮箱的正则
  //定义一个错误对象
  let errMsg = {}
  //使用正则去校验
  if(!emailReg.test(email)){
    errMsg.emailErr = '邮箱输入不合法，应为用户名@主机名.com,用户名长度：5-16，主机名长度：2-8'
  }
  if(!userName.test(user_name)){
    errMsg.userNameErr = '姓名输入不合法，应为5-16的英文字母或数字'
  }
  if(!passwordReg.test(password)){
    errMsg.passwordErr = '密码输入不合法，应为6-20的英文字母或数字或#@!'
  }
  if(password !== re_password){
    errMsg.rePasswordErr = '两次输入密码不一致'
  }

  //判断用户是否输入错误
  if(JSON.stringify(errMsg) !== '{}'){
    response.render('register',{errMsg})
    return
  }

  //try里面写可能出错的代码
  try{
    //3.去数据库中查找该邮箱是否注册过
    let findResult = await usersModel.findOne({email})
    if(findResult){
      //邮箱已经注册过
      errMsg.emailErr = `${email}邮箱已经注册过，不能重复注册`
      response.render('register',{errMsg})
      return
    }else{
      //邮箱没有注册过
      await usersModel.create({email,user_name,password})
      response.redirect(`/login?email=${email}`)
      console.log(`邮箱为：${email}，姓名为：${user_name}的用户注册成功！${Date.now()}`)
    }
  }
  catch(err){
    //计数操作，一些安全性的操作写在此处
    console.log(err)
    errMsg.networkErr = `${email}邮箱已经注册过，不能重复注册`
    response.render('register',{errMsg})
  }
})

//业务路由----登录
router.post('/login',async(request,response)=>{
  //1.获取用户的输入
  let {email,password} = request.body //对象类型
  //2.校验数据格式 ----- 正则
  let emailReg = /^[a-zA-Z0-9_]{5,16}@[a-zA-Z0-9]{2,8}\.com$/ //校验邮箱的正则
  let passwordReg = /^[a-zA-Z0-9]{5,16}$/ //校验密码的正则
  let errMsg = {}
  //3.使用正则去校验
  if(!emailReg.test(email)){
    errMsg.emailErr = '邮箱输入不合法，应为用户名@主机名.com,用户名长度：5-16，主机名长度：2-8'
  }
  if(!passwordReg.test(password)){
    errMsg.passwordErr = '密码输入不合法，应为6-20的英文字母或数字或#@!'
  }
  //判断用户是都输入错误
  if(JSON.stringify(errMsg) !== '{}'){
    response.render('login',{errMsg})
    return
  }
  //去数据库中查找
  try{
    let findResult = await usersModel.findOne({email,password})
    if(findResult){
      //登录成功了
      console.log(`邮箱为${email}的用户登录成功`)
      //response.redirect('https://www.baidu.com')
      let userId = findResult._id
      //response.render('userCenter',{userName})
      response.cookie('userId',userId.toString(),{maxAge:1000*30})
      response.redirect(`/userCenter`)
    }else{
      //登录失败------真实项目中在这里会做一些安全性处理
      console.log(`邮箱为${email}的用户登录失败`)
      errMsg.loginErr = '登录失败，邮箱或密码不正确！'
      response.render('login',{errMsg})
    }
  }
  catch(err){
    console.log(err)
    errMsg.networkErr = '网络不稳定，稍后再试！'
    response.render('login',{errMsg})
  }

})

module.exports = router