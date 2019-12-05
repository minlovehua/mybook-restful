/*
	业务处理
*/
const db = require('./db.js');

//业务处理：提供所有图书信息
exports.allBooks = (req,res)=>{
	let sql = 'select * from book';
	db.base(sql,null,(result)=>{
		//返回json形式的字符串
		res.json(result);
	});
};

//业务处理：提交添加的图书信息数据
exports.addBook = (req,res)=>{
	let info = req.body;  //获取表单提交的数据
	let sql = 'insert into book set ?';
	db.base(sql,info,(result)=>{
		if(result.affectedRows == 1){
			res.json({flag:1});
		}else{
			res.json({flag:2});
		}
	});
};

//业务处理：修改(编辑)图书时根据id查询相应的信息
exports.getBookById = (req,res)=>{
	let id = req.params.id;
	let sql = 'select * from book where id=?';
	let data = [id];
	db.base(sql,data,(result)=>{
		res.json(result[0]);
	});
};

//业务处理：提交修改(编辑)的图书信息数据
exports.editBook = (req,res)=>{
	let info = req.body;
	let sql = 'update book set name=?,author=?,category=?,description=? where id=?';
	let data = [info.name,info.author,info.category,info.description,info.id];
	db.base(sql,data,(result)=>{
		if(result.affectedRows == 1){
			res.json({flag:1});
		}else{
			res.json({flag:2});
		}
	});
};

//业务处理：删除图书信息
exports.deleteBook = (req,res)=>{
	let id = req.params.id;
	let sql = 'delete from book where id=?';
	let data = [id];
	db.base(sql,data,(result)=>{
		if(result.affectedRows == 1){
			res.json({flag:1});
		}else{
			res.json({flag:2});
		}
	});
};