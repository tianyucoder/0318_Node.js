/*
* UI路由器 ----- 登录与注册页面
* */
//引入Router
let {Router} = require('express')
//引入path模块
let {resolve} = require('path')
//实例化一个Router
let router = new Router()

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
router.get('/userCenter',(request,response)=>{
  let {userName} = request.query
  response.render('userCenter',{userName})
})

module.exports = router