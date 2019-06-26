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
  let url = resolve(__dirname,'../public/register.html')
  response.sendFile(url)
})

//UI路由---登录页面
router.get('/login',(request,response)=>{
  let url = resolve(__dirname,'../public/login.html')
  response.sendFile(url)
})

module.exports = router