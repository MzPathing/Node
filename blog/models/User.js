var mongoose=require('mongoose'),
	usersSchema=require('../schemas/users')
	// console.log(usersSchema);
module.exports=mongoose.model('User',usersSchema)