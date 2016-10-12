var express=require('express')
var search=require('./search')
var app=express.createServer()
app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.set('view options',{layout:false})
// console.log(app.set('view options'));//用app.set('***')的方法获取配置的标志
app.get('/',function(req,res){
	res.render('index')
})
app.get('/search',function(req,res){
	search(req.query.q,function(err,tweets){
		if(err) return next(err);
		console.log(tweets[0].word.length);
		res.render('search',{results:tweets,search:req.query.q})
	})
})
app.listen(3000)
//app.refister('.html',require('jade'))可以把html扩展名匹配到jade模板引擎