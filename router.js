/*
	路由处理
*/

const express = require('express');
const service = require('./service.js');
const router = express.Router();

//路由处理：提供所有图书信息
router.get('/books',service.allBooks);

//路由处理：提交添加的图书信息数据
router.post('/books/book',service.addBook);

//路由处理：修改(编辑)图书时根据id查询相应的信息
router.get('/books/book/:id',service.getBookById);

//路由处理：提交修改(编辑)的图书信息数据
router.put('/books/book',service.editBook);

//路由处理：删除图书信息
router.delete('/books/book/:id',service.deleteBook);

//这样，在入口文件index.js才能访问到router
module.exports = router; 
