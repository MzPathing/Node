var express=require('express'),
	router=express.Router()
router.get('/users',function(req,res,next){
	res.send('nihao')
})
module.exports=router