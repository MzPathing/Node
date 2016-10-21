var express=require('express'),
	router=express.Router()
router.get('/yzd',function(req,res,next){
	res.send('yangzhendong')
})
module.exports=router