//1.引入数据库连接模块
let db = require('./db')

//2.引入模型对象
let studentsModel = require('./model/students')
let teachersModel = require('./model/teachers')

//3.操作数据库
;(async()=>{
  await db

  let result = studentsModel.find({name:'田田'})
  console.log(await result)

  await teachersModel.create({
    teacher_id:'20190624001',
    name:'班长',
    age:20,
    sex:'女',
    hobby:['打台球','打篮球','踢足球'],
    info:'一个非常成熟，技术好的人'
  })

})()



