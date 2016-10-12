var express=require('express'),
	app=express.createServer(),
	wsio=require('websocket.io'),
	ws=wsio.attach(app),
	num=0,
	user={}
app.use(express.static('./public'))
ws.on('connection',function (socket){
	socket.id=++num
	// socket.send(JSON.stringify(user))这里发送的是连接者，但是这个案例不需要所以我注释掉了
	socket.on('message',function(msg){
		try{
			var pos=JSON.parse(msg)
		}catch(e){
			return
		}
		user[socket.id]=pos
		broadcast(JSON.stringify({type:'user',pos:pos,id:socket.id}))
		console.log(msg);
	})
	socket.on('close',function(){
		delete user[socket.id]
		broadcast(JSON.stringify({type:'disconnect',id:socket.id}))
	})
	function broadcast(msg){
		for(var i=0,len=ws.clients.length;i<len;i++){
			if(ws.clients[i]&&socket.id!=ws.clients[i].id){
				ws.clients[i].send(msg)
			}
		}
	}
})


app.listen(3000)
