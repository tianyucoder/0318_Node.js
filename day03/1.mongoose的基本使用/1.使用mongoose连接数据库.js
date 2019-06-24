/*
说明：
    mongoDB：一个非关系型数据库的名字
    mongod：启动数据库服务命令
    mongo：连接数据库命令
    mongoose：用于在Node环境下连接数据库的框架（很流行）
*/

//1.引入mongoose
let mongoose = require('mongoose')

//构建一个Promise实例
let dbPromise = new Promise((resolve,reject)=>{
  //2.连接数据库
  mongoose.connect('mongodb://localhost:27017/test')

  //3.绑定监听
  mongoose.connection.once('open',(err)=>{
    if(!err){
      console.log('数据库连接成功了！')
      resolve()
    }else{
      reject(err)
    }
  })
})

/*第一种写法*/
/*dbPromise.then(()=>{
  console.log('操作数据库的代码')
},(err)=>{
  console.log(err)
})*/

/*第二种写法*/
/*dbPromise
  .then(()=>{
    console.log('操作数据库的代码')
  })
  .catch((err)=>{
    console.log(err)
  })*/

/*第三种*/
/*async function demo() {
  await dbPromise
  console.log('操作数据库的代码')
}
demo()*/

/*IIFE写法*/
;(async()=>{
  await dbPromise
  console.log('操作数据库的代码')
})()





