var mongoose=require('mongoose'),
	schema=mongoose.Schema
	module.exports=new schema({
		user:String,
		password:String,
		contact:String
	})