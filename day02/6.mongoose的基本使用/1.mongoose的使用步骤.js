//1.引入mongoose
let mongoose = require('mongoose')

let dbPromise = new Promise((resolve,reject)=>{
  //2.连接数据库
  mongoose.connect('mongodb://localhost:27017/mongoose_test',{useNewUrlParser:true})
  //3.绑定监听
  mongoose.connection.once('open',(err)=>{
      if(!err){
        console.log('数据库连接成功了')
        resolve()
      }else{
        console.log(err)
        reject(err)
      }
    })
})

//第一种
/*dbPromise.then(()=>{
  //4.操作数据库的代码
  console.log('操作数据库的代码')
},(err)=>{
  console.log(err)
})*/

//第二种
/*dbPromise.then(()=>{
  console.log('操作数据库的代码')
}).catch((err)=>{
  console.log(err)
})*/

//第三种
/*async function conDB() {
  await dbPromise;
  console.log('操作数据库的代码')
}
conDB()*/

;(async ()=>{
  await dbPromise;
  console.log('操作数据库的代码')
})()


