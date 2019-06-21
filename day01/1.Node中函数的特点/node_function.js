/*
* 1.在Node中，所有的模块（js文件），运行的时候，都被自动包裹了一个外层函数。
*     function (exports, require, module, __filename, __dirname) {
*
*     }
*           1.exports  ------ 用于暴露模块
*           2.require ------- 用于引入模块
*           3.module  ------- 用于暴露模块
*           4.__filename ----- 当前文件的绝对路径
*           5.__dirname -------当前文件所在文件夹的路径（绝对路径）
*           
* 2.这个外层函数有什么用？
*       1.能让Node直接使用CommonJs语法
*       2.隐藏内部实现
* */

console.log(__filename)
console.log(__dirname)
//console.log(arguments.callee.toString())


/*function demo() {
  console.log(arguments.callee.toString())
}
demo()*/



