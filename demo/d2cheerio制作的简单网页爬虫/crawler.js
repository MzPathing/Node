var http=require('http');
var url="http://www.imooc.com/course/list";
var cheerio=require('cheerio');
var html="";
function crawler(html){
	var $=cheerio.load(html);
	var oLists=$('.moco-course-wrap');
	oLists.each(function (list){
		var info=$(this).find('p').text().trim();
		var index=$(this).index();
		console.log('['+index+']'+info);
	})
}
http.get(url,function(res){
	res.on('data',function(data){
		html+=data;
	})
	res.on('end',function (){
		crawler(html);
	})
})
