var express=require('express'),
	app=express.createServer(),
	sio=require('socket.io'),
	io=sio.listen(app)
app.use(express.static('./public'))
app.listen(3000)
io.sockets.on('connection',function(socket){
	socket.on('join',function(msg){
		socket.nickname=msg;
		socket.broadcast.emit('added',msg+'jioned')
	})
	socket.on('sendmessage',function(msg){//function可以接受2个参数，第二个作为回调函数使用，确保消息发送成功
		console.log(msg);
		socket.broadcast.emit('getmessage',msg)
	})
})
