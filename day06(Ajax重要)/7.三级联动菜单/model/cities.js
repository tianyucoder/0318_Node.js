/*
* 该模块用于创建students模型
* */
//首先引入mongoose
let mongoose = require('mongoose')

//1.引入Schema ------  请了一个保安
let Schema = mongoose.Schema;

//2.创建一个约束对象 -------- 制定进入你豪宅的规则
let citySchema = new Schema({
  code:String,
  name:String,
  province:String,
  city:String,
  county:String,
  level:Number
})

//3.创建一个模型对象 -------- 告诉保安你的规则
module.exports = mongoose.model('cities',citySchema)