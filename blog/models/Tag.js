var mongoose=require('mongoose'),
	TagsSchema=require('../schemas/tags')
	// console.log(usersSchema);
module.exports=mongoose.model('Tags',TagsSchema)