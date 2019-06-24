/*
* 该模块用于创建students模型
* */
//首先引入mongoose
let mongoose = require('mongoose')

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
module.exports = mongoose.model('students',studentSchema)