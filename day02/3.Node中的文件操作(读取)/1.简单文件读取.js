/*
* 简单文件读取：
*   fs.readFile(path[, options], callback)
*       --path:文件路径
*       --options：配置对象（可选）
*        --flag：打开文件要进行的操作,默认值"r"
*              "r" ：读取
*        --encoding：编码，默认值是"utf-8"
*       --callback：回调函数
* */

//1.引入fs模块
let {readFile,writeFile} = require('fs')

//2.读取文件
readFile('./music.mp3',(err,data)=>{
  if(!err){
    //思考：为什么读取出来的东西是Buffer类型？
    //console.log(data.toString())
    writeFile('../demo.wav',data,(err)=>{
      if(!err) console.log('文件写入成功')
      else console.log(err)
    })

  }else{
    console.log(err)
  }
})


