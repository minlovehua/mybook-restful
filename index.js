/*
	图书管理系统项目---基于后台接口的前端渲染---入口文件

	实现图书管理系统所有后台接口
*/

const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router.js');
const app = express(); //创建express实例

//将public目录下的图片、CSS 文件、JavaScript等静态资源文件对外开放访问
//参数1：自己设置的虚拟路径
app.use('/www',express.static('public'));

//挂在参数处理中间件（npm查找body-parser的用法）
//解析post表单提交的数据。
app.use(bodyParser.urlencoded({extended:false}));   

//路由
app.use(router);

//监听端口
app.listen(3000,()=>{
	console.log('running...');
});