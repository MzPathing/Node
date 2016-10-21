var express=require('express'),
	router=express.Router(),
	user=require('../models/User.js'),
	registerResult={}
router.get('/',function(req,res,next){
	res.render('index',{
		username:false,
		title:"首页",
		layout:'layout'
	})
	next()
})
router.get('/register',function(req,res,next){
	res.render('register',{
		username:false,
		title:"欢迎注册",
		layout:'layout'
	})
	next()
})
router.post('/register',function(req,res,next){//当用户注册username失去焦点时，通过ajax验证是否存在该用户
	console.log(req.body.username)
	// user.findOne({name:req.body.username}).then(function(result){
	// 	console.log(result+'123456')
	// 	if(result){
	// 		registerResult.num=1
	// 		registerResult.message="已经存在该用户，请重新填写用户名"
	// 	}else{
	// 		registerResult.num=1
	// 		registerResult.message="该用户名可用"
	// 	}
	// })
	//这个地方，会提示mongoose的promise对象是过时的，本来这个提示无关紧要，但是如果有这个提示，会导致在里面无法res.send(或者json)，现在对promise对象还不是特别了解，所以在这个地方刷了个小聪明，一秒过后再输出以确保查询完毕，但是这个地方有个bug，要是查找数据足够多，可能会导致这一秒的时间还没有查找完导致名字冲突问题
	// setTimeout(function(){
	// 	res.send(registerResult)
	// 	next()
	// },1000)
	//修复bug
	user.findOne({name:req.body.username},function(result){
		if(result){
			registerResult.num=1
			registerResult.message="已经存在该用户，请重新填写用户名"
		}else{
			registerResult.num=1
			registerResult.message="该用户名可用"
		}
		res.json(registerResult)
		next()
	})
})
router.post('/signup',function(req,res,next){//当所有的数据都没有问题时允许提交，这里接收数据，再次判断
	console.log(req.body.username);
	next()
	
})
module.exports=router