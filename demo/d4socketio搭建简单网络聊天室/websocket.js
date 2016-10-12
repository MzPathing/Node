var express=require('express'),
	wsio=require('websocket.io'),
	app=express.createServer(),
	ws=wsio.attach(app)

	app.use(express.static('public'))
	ws.on('connection',function(socket){
		socket.on('message',function (msg){
			console.log(msg);
			socket.send('pong')
		})
	})
	// app.get('/',function(req,res){
	// 	res.end('<h1>welcome</h1>')
	// })
	// var onlineUsers={}
	// var onlineCount=0
	// io.on('connection',function(socket){
	// 	console.log('a user connected');
	// 	socket.on('login',function (obj){
	// 		socket.name=obj.userid;
	// 		if(!onlineUsers.hasOwnProperty(obj.userid)){
	// 			onlineUsers[obj.userid]=obj.username;
	// 			onlineCount++
	// 		}
	// 		io.emit('login',{onlineUsers:onlineUsers,onlineCount:onlineCount,user:obj},
	// 			console.log(obj.username+"加入了聊天室"))
	// 	})
	// 	socket.on('disconnect',function(){
	// 		if(onlineUsers.hasOwnProperty(socket.name)){
	// 			var obj={userid:socket.name,username:onlineUsers[socket.name]}
	// 			delete onlineUsers[socket.name]
	// 			onlineCount--;
	// 			io.emit('logout',{onlineUser:onlineUsers,onlineCount:onlineCount},
	// 				console.log(obj.username+"退出了聊天室"))
	// 		}
	// 	})
	// 	soncket.on('message',function(obj){
	// 		io.emit('message',obj)
	// 		console.log(obj.username+"说"+obj.content);
	// 	})
	// })
	app.listen(3000,function(){
		console.log(111);
	})