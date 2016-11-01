var mongoose=require('mongoose'),
	articlesSchema=require('../schemas/articles')
	// console.log(usersSchema);
module.exports=mongoose.model('articles',articlesSchema)