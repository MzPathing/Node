var express=require('express'),
	router=express.Router(),
	User=require('../models/User.js'),
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
	User.findOne({username:req.body.username},function(err,result){//这个地方应该是现有一个err，判断是否出错，之前忘记写了，并且数据库结构是username而不是user，重新定义一下数据库结构
		var regexp=new RegExp('^[\\d]{2,10}$')//判断正则，用户名不能包括特殊字符并且1位以上10位以下,这里之前自己写的是[\\da-zA-Z]{2,5}，能匹配到最小位置但是不能匹配最大位置，有错
		// console.log(result);
		if(!req.body.username){//如果用户名是空的或者undefined，返回用户名不能为空
			registerResult.num=0
			registerResult.message="用户名不能为空"
			res.send(registerResult)
			return
		}else{
			// console.log(req.body.username);
			// console.log(!regexp.test(req.body.username));
			if(!regexp.test(req.body.username)){
				// console.log(!regexp.test(req.body.username));
				registerResult.num=0
				registerResult.message="用户名是必须2-10位数字或字母"
				res.json(registerResult)
				return
			}
		}
		if(result){
			registerResult.num=0
			registerResult.message="已经存在该用户，请重新填写用户名"
		}else{
			registerResult.num=1
			registerResult.message="该用户名可用"
		}
		res.send(registerResult)
		next()
	})
})
router.post('/signup',function(req,res,next){//当所有的数据都没有问题时允许提交，这里接收数据，再次判断
	var user=new User({
		username:req.body.username,
		password:req.body.password,
		contact:req.body.contact
	})
	user.save()
	// console.log(user);
	next()
})
module.exports=router