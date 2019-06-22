//1.引入mongoose
let mongoose = require('mongoose')
mongoose.set('useCreateIndex',true)

let dbPromise = new Promise((resolve,reject)=>{
    //2.连接数据库
    mongoose.connect('mongodb://localhost:27017/mongoose_test',{ useNewUrlParser: true })
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

;(async ()=>{
  await dbPromise;

  //1.获取Schema对象---------------请了一个保安
  const Schema = mongoose.Schema

  //2.创建约束对象（实例）---------------------告诉保安他的任务是什么
  let studentsSchema = new Schema({
    stu_id:{
      type:String,
      unique:true, //是否唯一
      required:true//必须的
    },
    name:{
      type:String,
      required:true//必须的
    },
    age:Number,
    sex:String,
    hobby:[String],
    info:Schema.Types.Mixed,//接收所有类型
    enable_flag:{
      type:String,
      default:'Y'
    },
    date:{
      type:Date,
      default:Date.now()
    }

  })
  
  //3.创建模型对象-----------------保安拿到你的任务开始干活了
  let StudentModel = mongoose.model('students',studentsSchema)
  
  /*//4.创建文档对象-----------------有客人来你家了
  let stu1 = new StudentModel({
    stu_id:'0003',
    name:'陈良通',
    age:18,
    sex:'男',
    hobby:['女','打代码','赚钱'],
    info:'帅，就是帅！',
  })
  
  
  //5.将数据保存到数据库中-----------尝试着进入你家
  stu1.save((err,data)=>{
    if (!err) console.log('数据保存成功了，',data)
    else console.log(err)
  })*/

  //新增
  let createPrimse = StudentModel.create({
    stu_id:'0099',
    name:'丹尼',
    age:18,
    sex:'男',
    hobby:['女','打代码','赚钱'],
    info:'帅，就是帅！'
  })
  await createPrimse

  //查找
  /*  StudentModel.findOne({
      age:18
    },{
      name:1,
      _id:0
    },(err,data)=>{
      if(!err) console.log(data)
      else console.log(err)
    })*/

  //更新
  /*StudentModel.updateMany({age:18},{sex:'女'},(err,data)=>{
    if(!err) console.log(data)
    else console.log(err)
  })*/

  //删除
  /*StudentModel.deleteMany({ sex:'女'},(err,data)=>{
    if(!err) console.log(data)
    else console.log(err)
  })*/

})()


