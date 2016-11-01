var mongoose=require('mongoose'),
	schema=mongoose.Schema
	module.exports=new schema({
		username:String,
		password:String,
		contact:String,
		isAdmin:Boolean
	})