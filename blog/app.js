var express=require('express'),
	app=express(),
	partials = require('express-partials'),//express3.0移除了layout，需要这样引入
	bodyParser=require('body-parser'),
	mongoose=require('mongoose'),
	session=require('express-session')
	mongoose.connect('mongodb://localhost:27017/blog',function(err){
		if(err){
			console.log("数据库连接失败");
			console.log(err);
		}else{
			console.log("数据库连接成功");
			app.listen(3000)
		}
	})
//注册模板引擎
app.set('view engine','ejs')
app.use(partials())
app.set('view options',{layout:false})
app.set('views',__dirname+'/views')
//设置中间件
app.use(express.static(__dirname+'/public'))
app.use(bodyParser.urlencoded())
app.use(session({
    secret: 'yzdapp', //secret的值建议使用随机字符串
    proxy: true,
    resave: true,
    saveUninitialized: true
}))
//设置路由
app.use('/admin',require('./routers/admin'))//用户管理、发表文章、评论管理
app.use('/users',require('./routers/users'))//评论（文章、时间、内容）
app.use('/',require('./routers/main'))//首页、注册页面、登录页面
//连接数据库
