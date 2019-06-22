/*
* 1.Buffer是什么？
*    1.它是一个类似于数组的对象，用于存储数据（存储的是二进制数据）。
*    2.Buffer的效率很高，存储和读取很快，直接对计算机的内存进行操作。
*    3.Buffer的大小一旦确定了，不可修改。
*    4.每个元素占用内存的大小为1字节。
*    5.Buffer是Node中的非常核心的模块，无需下载、无需引入即可使用
*
* 2.进制：
*     十六进制：00 ----- ff
*     十进制：0 ----- 255
*     二进制：000000000 ------ 11111111
*
* 3.换算：
*   1byte（字节） =  8bit（位）
*   1024 byte = 1 KB
*   1024 KB = 1 MB
* */

//1.将一个字符串存入到Buffer中
/*let str = 'HELLO ATGUIGU'
let buf = Buffer.from(str)
console.log(buf)*/

//2.创建一个Buffer实例-----即将被废弃（效率很低）
/*let buf = new Buffer(10)
console.log(buf)*/

//3.创建一个Buffer实例-----效率比上面的稍微高一些
/*let buf = Buffer.alloc(10)
console.log(buf)*/

//4.创建一个Buffer实例-----效率最高，但是有一些安全性问题。
/*let buf = Buffer.allocUnsafe(10)
console.log(buf);*/










