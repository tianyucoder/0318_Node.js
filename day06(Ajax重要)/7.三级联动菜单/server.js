let express = require('express')
//引入数据库连接模块
let db = require('./db')
//引入操作数据库的模型
let cityModel = require('./model/cities')

let app = express()

;(async ()=>{
  await db

  //获取中国全部省份信息
  app.get('/getAllProvince',(request,response)=>{
    //数据库中查找
    cityModel.find({level:1},{name:1,province:1,_id:0},(err,data)=>{
      if(!err){
        response.json({state:1,data})
      }else{
        console.log(err)
        response.json({state:0,err:'网络不稳定，稍后再试'})
      }
    })
  })
})()

app.listen(3000,(err)=>{
    if(!err){
      console.log('服务启动成功')
    }else{
      console.log(err)
    }
})