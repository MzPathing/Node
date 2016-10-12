var express=require('express'),
	mongodb=require('mongodb'),
	//创建数据库服务，提供ip和断口
	app=express.createServer(),
	// server=new mongodb.Server('127.0.0.1',27017)
	// //连接数据库（如果指定名字不存在，会新建数据库）
	// new mongodb.Db('my-website',server).open(function(err,client){
	// 	if(err) throw err;
	// 	console.log('connected');
	// 	//建立集合快捷方式
	// 	app.users=new mongodb.Collection(client,'users',function(){})
	// 	app.listen(3000)
	// })
	Db=mongodb.Db,
	server=mongodb.Server,
	db=new Db('my-website',new server('127.0.0.1',27017))
	db.open(function(err,db){
		app.users=db.collection('users')
		db.ensureIndex('users','email',function(err){
			if(err) throw err
			// console.log('ensured indexes');
		app.listen(3000)
		})
		console.log('successful')
	})
app.use(express.bodyParser())
app.use(express.cookieParser())
app.use(express.session({secret:'my secret'}))
app.use(function(req,res,next){
	res.local('authenticated',true)
	if(req.session.loggedIn){
		app.users.findOne({email:req.session.loggedInEmail},function(err,doc){
//了不起的nodejs里面查询的是id，我之前以为id是可以查询的，但是是经过测试发现不能查询id，只能查询自己定义过的属性。所以我在上一个函数定义了一个req.session.loggedInEmail变量在这个地方调用
			console.log(1);
			res.local('me','123')
			next()//next函数不能放在外面，必须每个都执行，不然会导致me传递不到前端，可能是bug
		})
	}else{
		res.local('authenticated',false)
		console.log(2);
		next()
	}
})
app.set('view engine','pug')
app.set('view options',{layout:false})
app.set('views',__dirname+'/views')
// app.get('/',function(req,res){
// 	res.render('index',{authenticated:false})//传递了一个本地变量，等登录过后会动态输出该变量
// })//因为之前有了一个中间件，判断参数，所以这里就不需要判断get‘/’的情况改成
app.get('/',function(req,res){
	res.render('index')
})
app.get('/login',function (req,res){
	res.render('login')
})
app.get('/signup',function(req,res){
	res.render('signup')
})
//通过注册页面post提交
app.post('/signup',function(req,res,next){
	// console.log(req.body.user);
	app.users.insert(req.body.user,function(err,doc){
		if(err) return next(err)
		// console.log(doc.ops[0].email);//这里的输出数据并不是像《了不起的nodejs》中的那样是doc[0].email,而是doc.ops[0].email
		res.redirect('/login/'+doc.ops[0].email)
	})
})
app.get('/login/:signupEmail',function(req,res){
	res.render('login',{signupEmail:req.params.signupEmail})
	console.log(req.params);
})
app.post('/login',function(req,res,next){
	app.users.findOne({email:req.body.user.email,password:req.body.user.password},function(err,doc){
		if(err) return next(err)
		if(!doc) return res.send('<p>User is not found</p>')
		// console.log(doc)
		req.session.loggedIn=doc._id.toString()
		req.session.loggedInEmail=doc.email.toString()
		console.log(req.session.loggedIn)
		res.redirect('/')
	})
})
app.get('/logout',function(req,res){
	req.session.loggedIn=false
	res.redirect('/')
})