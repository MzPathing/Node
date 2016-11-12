var mongoose=require('mongoose'),
	schema=mongoose.Schema
module.exports=new schema({
	title:String,//文章名字
	describe:String,//文章描述
	lable:String,//文章标签，如所属html、JavaScript等
	date:Date,//文章发表时间
	link:String,//文章链接
	comment:Array//文章评论，以数组内含对象的形式储存
})