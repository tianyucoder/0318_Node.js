/*
说明：
    mongoDB：一个非关系型数据库的名字
    mongod：启动数据库服务命令
    mongo：连接数据库命令
    mongoose：用于在Node环境下连接数据库的框架（很流行）
*/

//1.引入mongoose
let mongoose = require('mongoose')
mongoose.set('useCreateIndex',true)

//构建一个Promise实例
let dbPromise = new Promise((resolve,reject)=>{
    //2.连接数据库
    mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser:true})

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

/*操作数据库的代码*/
;(async()=>{
  await dbPromise


  //1.引入Schema ------  请了一个保安
  let Schema = mongoose.Schema;

  //2.创建一个约束对象 -------- 制定进入你豪宅的规则
  let studentSchema = new Schema({
    stu_id:{
      type:String,
      required:true,//必须填写
      unique:true//唯一字段
    },
    name:{
      type:String,
      required:true,//必须填写
    },
    age:{
      type:Number,
      required:true,//必须填写
    },
    sex:{
      type:String,
      required:true,//必须填写
    },
    hobby:[String],
    info:Schema.Types.Mixed,//接收所有类型的数据
    date:{
      type:Date,
      default:Date.now()
    },
    enable_flag:{
      type:String,
      default:'Y'
    }
  })

  //3.创建一个模型对象 -------- 告诉保安你的规则
  let studentModel = mongoose.model('students',studentSchema)

  //4.数据的增删改查 ------ 真正有人要进入你家了，（模型对象上有操作数据库的所有方法）
  studentModel.create({
    stu_id:'20190624004',
    name:'晓雯',
    age:20,
    sex:'女',
    hobby:['心理疏导','爱情','打代码'],
    info:'一个非常热心的人'
  },(err,data)=>{
    if(!err){
      console.log('数据写入成功了',data)
    }else{
      console.log(err)
    }
  })

})()





