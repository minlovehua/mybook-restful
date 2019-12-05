/*
	业务：请求后台接口数据，用于界面的渲染工作
*/

// 首先要保证DOM加载完成 $();
$(function(){

	//将“渲染列表数据”功能封装成一个函数，因为后面要多次用到
	function initList(){
		//发送一个ajax请求 $.ajax();  通过ajax调用后台接口
		$.ajax({
			type:'get',               //指定get请求方式
			url:'/books',             //url用我们处理好的接口 
			dataType:'json',          //指定响应的数据格式
			success:function(data){   //回调函数，拿到数据data

				//直接调用模板引擎的API来渲染模板
				//参数1：模板引擎id。参数2：数据，要给它起个别名叫list。
				var html = template('indexTpl',{list:data});
				//填充页面  id选择器 #
				$('#dataList').html(html);

				//为什么在这里来写"修改"和"删除"的逻辑呢？？？
				//因为：必须保证在数据列表加载完成(渲染完内容)之后才可以操作列表中的标签(DOM标签)。
				//在tbody(id=dataList)中的找到tr并遍历它，从而找到其中的td(“修改”按钮)
				$('#dataList').find('tr').each(function(index,element){

					//element 即当前遍历到的那个tr，是一个原生的DOM。
					//$(element) 即DOM转jQuery
					//因为一共有6列，即一行(tr)有6列(td),下标从0开始，所以"修改"在下标为5的那列(td)。
					var td = $(element).find('td:eq(5)');

					//element当前的那行。 td:eq(0) id在下标为0的那一列。 .text() 获取文本内容。
					//获取点击的当前行的id，用于在调用后台接口时传入路径路由url
					var id = $(element).find('td:eq(0)').text(); 

					//绑定"修改"(编辑)图书的单击事件  'a:eq(0)'--->修改
					td.find('a:eq(0)').click(function(){
						//console.log("修改");  //测试代码
						editBook(id);
					});

					//绑定“删除”图书的单击事件 'a:eq(1)'--->删除
					td.find('a:eq(1)').click(function(){
						//console.log("删除");  //测试代码
						deleteBook(id);
					});  

					//绑定单击“添加图书”事件
					//在数据列表的数据加载完成了也渲染完成了的时候，让这个addBook方法再执行一遍。
					//这样子，当编辑成功之后，调用initList方法的时候，会将“添加图书”的绑定事件重新绑定一下。
					//比如：在修改完图书时，点击“提交”按钮，会先unbind解绑了添加图书的“提交”按钮，才bind绑定
					//修改图书的"提交"按钮的。这样子，修改的图书信息提交之后，执行initList重新渲染了主页面。
					//而渲染主页面时，也addBook了，所以再点击添加图书的“提交”按钮时，会解绑了修改图书的“提交”按钮，
					//再绑定添加图书的“提交”按钮。
					addBook();                    //将添加图书的功能封装成函数之后，在这里调用的目的：
					                              //保证了添加图书的“提交”按钮和修改图书的“提交”按钮互不影响。

					//重置表单
					//因为编辑弹框里的表单的时候，往里面填充了数据，提交表单之后，表单中还是保留有数据的，
					//比如点击“添加图书”按钮，弹出来的框上就会有上一次编辑过的数据，而我们需要的是一个空白的表单
					//供我们填写新图书。解决：提交完表单数据之后，清空一下表单。
					var form = $('#addBookForm');
					//form.get(0) jQuery转换成原生DOM
					form.get(0).reset();
					//.reset() 这种方式并不能对隐藏域的id进行清空
					//单独清空隐藏域
					//form.find('input[type=hidden]').val('');           

				});
			}
		});
	}

	//渲染列表数据（渲染主页）
	initList();

	//修改(编辑)图书信息
	function editBook(id){
		// 通过ajax调用后台接口，拿到数据。弹框，将数据显示在弹框中的form上面
		var form = $('#addBookForm');
		$.ajax({
			type:'get',
			url:'/books/book/'+id,
			dataType:'json',
			success:function(data){ //拿到的数据data
				var mark = new MarkBox(600,400,'修改图书信息',form.get(0)); //初始化窗口
				mark.init();//显示弹框

				//给表单添加一行 id
				form.prepend('<input type="hidden" name="id">');

				//填充表单数据
				form.find('input[name=id]').val(data.id);
				form.find('input[name=name]').val(data.name);
				form.find('input[name=author]').val(data.author);
				form.find('input[name=category]').val(data.category);
				form.find('input[name=description]').val(data.description);

				//点击“提交”按钮。  
				//因为在添加图书那里的也有给“提交”按钮绑定事件，
				//所以 先.unbind('click')给“提交”按钮解绑，解决按钮重用问题。
				form.find('input[type=button]').unbind('click').click(function(){
					$.ajax({
						type:'put',
						url:'/books/book',
						data:form.serialize(),
						dataType:'json',
						success:function(data){
							if(data.flag==1){
								mark.close(); //关闭弹框
								//删除表单中id那行，避免影响“添加图书”功能
								form.find('input[type=hidden]').remove();
								initList(); //重新渲染主页面
							}
						}
					});
				});
			}
		});
	}

	//删除图书
	function deleteBook(id){
		$.ajax({
			type:'delete',
			url:'/books/book/'+id,
			dataType:'json',
			success:function(data){
				if(data.flag==1){ //如果删除成功
					initList();  //重新渲染主页
				}
			}
		});
	}

	//添加图书信息
	function addBook(){
		$('#addBookId').click(function(){
			var form = $('#addBookForm');
			//实例化弹框 
			//参数1:弹框的宽。参数2:弹框的高。参数3:弹框标题。参数4:弹框内容。
			//因为这个弹框使用原生的js实现的，所以参数4要jQuery转DOM，即传入原生DOM对象。
			var mark = new MarkBox(600,400,'添加图书信息',form.get(0));
			mark.init(); //显示弹框
			//给表单的"提交"按钮绑定事件：提交数据
			//因为在添加图书那里的也有给“提交”按钮绑定事件，
			//所以 先.unbind('click')给“提交”按钮解绑，解决按钮重用问题。
			form.find('input[type=button]').unbind('click').click(function(){
				//往后台提交数据  $.ajax();
				$.ajax({
					type:'post',               //指定http请求方式
					url:'/books/book',         //url用我们处理好的接口 
					data:form.serialize(),     //数据是获取到的表单数据
					dataType:'json',           //回调函数得到的数据的格式
					success:function(data){    //回调函数
						if(data.flag == 1){  //如果提交成功
							//console.log("我是添加完提交");
							mark.close();      //关闭弹框
							initList();        //重新渲染列表(主页)
						}
					}
				});
			});
		});		
	}
});