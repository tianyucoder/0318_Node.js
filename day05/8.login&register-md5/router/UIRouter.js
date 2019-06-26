/*
* UI路由器 ----- 登录与注册页面
* */
//引入Router
let {Router} = require('express')
//引入path模块
let {resolve} = require('path')
//引入cookie解析模块
let cookieParser = require('cookie-parser')
//引入users模型
let userModel = require('../model/users')
//实例化一个Router
let router = new Router()
router.use(cookieParser())

//UI路由---注册页面
router.get('/register',(request,response)=>{
  response.render('register',{errMsg:{}})
})

//UI路由---登录页面
router.get('/login',(request,response)=>{
  let {email} = request.query
  response.render('login',{errMsg:{email}})
})

//UI路由---个人中心页面
router.get('/userCenter',async(request,response)=>{
  //let {userId}= request.cookies
  let {userId}= request.session
  if(userId){
    let findResult = await userModel.findOne({_id:userId})
    if(findResult){
      response.render('userCenter',{userName:findResult.user_name})
    }else{
      //console.log(`该IP地址尝试非法修改cookie`)
      response.redirect('/login')
    }
  }else{
    response.redirect('/login')
  }





})

module.exports = router