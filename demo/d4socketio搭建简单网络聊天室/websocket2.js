// var express=require('express'),
// 	app=express.createServer(),
// 	wsio=require('websocket.io'),
// 	ws=wsio.attach(app),
// 	num=0,
// 	user={}
// app.use(express.static('./public'))
// ws.on('connection',function (socket){
// 	socket.id=++num
// 	// socket.send(JSON.stringify(user))这里发送的是连接者，但是这个案例不需要所以我注释掉了
// 	socket.on('message',function(msg){
// 		try{
// 			var pos=JSON.parse(msg)
// 		}catch(e){
// 			return
// 		}
// 		user[socket.id]=pos
// 		broadcast(JSON.stringify({type:'user',pos:pos,id:socket.id}))
// 		console.log(msg);
// 	})
// 	socket.on('close',function(){
// 		delete user[socket.id]
// 		broadcast(JSON.stringify({type:'disconnect',id:socket.id}))
// 	})
// 	function broadcast(msg){
// 		for(var i=0,len=ws.clients.length;i<len;i++){
// 			if(ws.clients[i]&&socket.id!=ws.clients[i].id){
// 				ws.clients[i].send(msg)
// 			}
// 		}
// 	}
// })


// app.listen(3000)
var express=require('express'),
	app=express.createServer(),
	wsio=require('websocket.io'),
	ws=wsio.attach(app),
	num=0,
	users={}
app.use(express.static('./public'))
ws.on('connection',function(socket){
	// console.log(ws.clients[2]);//ws.clients显示了当前所有连接的websocket，如果有其他连接，就往后递增，如果有客户端关闭，则那一个客户端的内容就变成null但是还是要占一个连接位置
	socket.id=++num
	socket.on('message',function(msg){
		users[socket.id]=msg;
		console.log(msg);
		// socket.send(num.toString())
		for(var i=0,len=ws.clients.length;i<len;i++){
			if(ws.clients[i]){
				ws.clients[i].send(JSON.stringify(users))
			}
		}
	})
	socket.on('close',function (){
		delete users[socket.id]
	})

})
app.listen(3000)