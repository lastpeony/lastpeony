const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 80
const dev = process.env.NODE_ENV == 'production'

var p2 = require('p2'); 

const server = express()
var socketServer = require('http').Server(server);

var io = require('socket.io')(socketServer,{});
socketServer.listen(2000)
const app = next({ dev })
const handle = app.getRequestHandler()

var playerList = [];
var meteorList = [];
var stepCount = 0;
var startTime = (new Date).getTime()/1000;
var lastTime;
var lastUpdate = Date.now()/1000;
var fixedTimestepAccumulator = 0;
var MAX_ACCUMULATED_TIME = 1;
var TIMESTEP = 1/60.0;


var world = new p2.World({
	gravity : [0,0],
	restitution:0.9
});



var Player = function (startX, startY, userName,id) {
  this.x = startX/-20
this.y = startY/-20
this.userName = userName
this.id = id
this.body = new p2.Body ({
	mass: 0.5,
	damping:0.9,
  position: [this.x,this.y],
  fixedRotation: true
});
var circleShape = new p2.Circle({ radius: 28/20 });
this.body.addShape(circleShape);
world.addBody(this.body);



}
var bottom = new p2.Body({
	// the x value is irrelevant here, the plane spans the entire x axis
	STATIC:1,
  position: [0, -60]
});
var top = new p2.Body({
	STATIC:1,
	angle: Math.PI,

	position: [0, 0],
	

});
var left = new p2.Body({
	STATIC:1,
	angle: Math.PI / 2,

  position: [0, -60]
});
var right = new p2.Body({
STATIC:1,
angle: (3 * Math.PI) / 2,
position: [-60, 0]


})

var wallShape1 = new p2.Plane({
	material:new p2.Material()
})
var wallShape2 = new p2.Plane({
	material:new p2.Material()
})
var wallShape3 = new p2.Plane({
	material:new p2.Material()
})
var wallShape4 = new p2.Plane({
	material:new p2.Material()
})
function createMeteors(){
	for(var i=0;i<15;i++){
	var randomX = -1 * Math.floor(Math.random()*(50-10+1)+10);
	var randomY = -1 * Math.floor(Math.random()*(50-10+1)+10);
	var meteor = new p2.Body({
		mass: 0.7,
			
		id:i,
		
		position: [randomX, randomY],
		
		
		})
	var circleShape = new p2.Circle({ radius: 32/20,	material:new p2.Material()
	});
	world.addContactMaterial(new p2.ContactMaterial(circleShape.material, wallShape1.material, {
		restitution: 0.8,
		stiffness: Number.MAX_VALUE // We need infinite stiffness to get exact restitution
	}));
	world.addContactMaterial(new p2.ContactMaterial(circleShape.material, wallShape2.material, {
		restitution: 0.8,
		stiffness: Number.MAX_VALUE // We need infinite stiffness to get exact restitution
	}));
	world.addContactMaterial(new p2.ContactMaterial(circleShape.material, wallShape3.material, {
		restitution: 0.8,
		stiffness: Number.MAX_VALUE // We need infinite stiffness to get exact restitution
	}));
	world.addContactMaterial(new p2.ContactMaterial(circleShape.material, wallShape4.material, {
		restitution: 0.8,
		stiffness: Number.MAX_VALUE // We need infinite stiffness to get exact restitution
	}));
	meteor.addShape(circleShape)
	world.addBody(meteor)
	meteorList.push(meteor)
	}
	
		
	
		
	}
	
	
	createMeteors()


top.addShape(wallShape1)
bottom.addShape(wallShape2);

left.addShape(wallShape3);
right.addShape(wallShape4);

world.addBody(top)
world.addBody(bottom)
world.addBody(left)
world.addBody(right)





function secondPhysicsHandler(){
  world.step(TIMESTEP,6,2);

  sendWorldUpdates()

}
function physicsHandler() {

	var now = Date.now() / 1000;
	var delta = now - lastUpdate;
	lastUpdate = now;
	fixedTimestepAccumulator +=delta ;
	if(fixedTimestepAccumulator > MAX_ACCUMULATED_TIME){
	fixedTimestepAccumulator = MAX_ACCUMULATED_TIME;

	}
	//console.log("delta "+delta)
	while (fixedTimestepAccumulator >= TIMESTEP) {
    world.step(TIMESTEP,6,2);

       
		fixedTimestepAccumulator -= TIMESTEP;
	}


	
}

function sendWorldUpdates(){
var worldUpdate ={
  playerUpdates:[],
  meteorUpdates:[]
}

playerList.forEach(player=>{
var playerUpdate = {
  id:player.id,
position:player.body.position,
angle:player.body.angle,
velocity:player.body.velocity,
angularVelocity:player.body.angularVelocity,


}

worldUpdate.playerUpdates.push(playerUpdate)



})


meteorList.forEach(meteor=>{
var myMeteor = {
	velocity:meteor.velocity,
	angle:meteor.angle,
	angularVelocity:meteor.angularVelocity,
	position: meteor.position,
	id:meteor.id
}
worldUpdate.meteorUpdates.push(myMeteor)
})

io.emit('onWorldUpdate',worldUpdate)


}
setInterval(physicsHandler,1000/60);
setInterval(sendWorldUpdates,60);
//onNewplayer fonksiyonu clienttan "new_player" mesajı geldiğinde çağrılacak.
function onNewplayer (data) {
	//Player objesi yarat.
	console.log("player geldi")
	var newPlayer = new Player(data.x, data.y, data.userName,this.id);
	console.log(newPlayer.userName)
	//this.id direk socket.id ye eşit.this socket e point ediyor.
	console.log( newPlayer.id+"ID si ile yeni oyuncu yaratıldı.");
	//Yeni oyuncunun bilgileri.
	var current_info = {
		id: newPlayer.id, 
		x: newPlayer.x,
		y: newPlayer.y,
		userName: newPlayer.userName,
	}; 

	//Yeni giriş yapan oyuncuya kimlerin oyunda oldugu bilgisini gönder.	
	for (i = 0; i < playerList.length; i++) {
		var existingPlayer = playerList[i];
		var player_info = {
			id: existingPlayer.id,
			x: existingPlayer.body.position[0],
			y: existingPlayer.body.position[1],
			userName: existingPlayer.userName,			
		};
		//send message to the sender-client only
	
		this.emit("newPlayer", player_info);
	}

//Yeni oyuncunun bilgilerini bağlanan yeni oyuncu dışında herkese gönderelim.
this.broadcast.emit('newRemotePlayer', current_info);


playerList.push(newPlayer);//yaratılan player objesini tüm playerları tuttuğumuz array e ekle. 

var meteorData =[]

meteorList.forEach(meteor=>{
var myMeteor = {
	position: meteor.position,
	id:meteor.id
}
meteorData.push(myMeteor)
})

this.emit('meteors',meteorData)
}
function onInputFired (data) {
	var movePlayer = findPlayerById(this.id); 
	if (!movePlayer) {
		console.log('Oyuncu yok.'); 
		return;
	}
	  if(data.type =="left"){
			movePlayer.body.applyForce([12,0])

		


	  }else if(data.type =="right"){
			movePlayer.body.applyForce([-12,0])

		


	  }else if(data.type=="up"){

			movePlayer.body.applyForce([0,12])

		

	  }else if(data.type=="down"){
				movePlayer.body.applyForce([0,-12])
	
			


		}
		
		//x -1 ila -58 arasında bir rakam olmalı
		//y -1 ila -58
			

}
function findPlayerById(id){

  for (var i = 0; i < playerList.length; i++) {

		if (playerList[i].id == id) {
			return playerList[i]; 
		}
	}
	
	return false; 
}
function onClientDisconnect() {
	console.log('disconnect'); 

	var removePlayer = findPlayerById(this.id); 
		
	if (removePlayer) {
		playerList.splice(playerList.indexOf(removePlayer), 1);
	}
	
	console.log("removing player " + this.id);
	
	//send message to every connected client except the sender
	this.broadcast.emit('remove_player', {id: this.id});
	
}
io.sockets.on('connection', function(socket){
	
	console.log("socket connected"); 
	//Soketin unique(eşsiz) idsini yazdır.(server a bağlanan client socket idlerini yazdırır)
	console.log(socket.id);
	console.log(socket.request.connection._peername.address);
	// Clientten gelecek disconnect mesajı için dinle.
	socket.on('disconnect', onClientDisconnect); 

	//Clienttan gelecek "new_player" mesajını dinle.Mesaj gelince onNewplayer fonksiyonunu çalıştır.
	socket.on("newPlayer", onNewplayer);

	// Clientten gelecek player pozisyon update mesajı için dinle.
	//ARTIK KULLANMIYORUZ DOMİNANT SERVER MODELİNE GEÇTİK.
	//socket.on("move_player", onMovePlayer);

		//Clienttan gelecek player inputları için dinle.
		socket.on("inputFired", onInputFired);


});

app.prepare().then(() => {

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> asdasdsdf on http://localhost:${port}`)
  })
})