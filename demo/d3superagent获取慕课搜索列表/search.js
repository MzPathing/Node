var request=require('superagent')
module.exports=function search(q,fn){
	request.get('http://www.imooc.com/search/history')
	.query({words:q})
	.end(function (err,res){
		fn(null,JSON.parse(res['text']).data)
		console.log(JSON.parse(res['text']).data);
	})
}