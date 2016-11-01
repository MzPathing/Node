var mongoose=require('mongoose'),
	schema=mongoose.Schema
	module.exports=new schema({
		tagName:String,//标签名字
		tagDescription:String,//标签描述
		tags:Array,//标签内容范围
		tagArticle:Number//标签文章数目
	})