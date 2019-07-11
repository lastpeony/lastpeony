import React, { Component } from 'react';
import Typist from 'react-typist';
import '../styles/SpaceHamster.css'
import io from 'socket.io-client';
import HamsterGameInfo from '../components/HamsterGameInfo'
window.PIXI   = require('phaser-ce/build/custom/pixi');
window.p2     = require('phaser-ce/build/custom/p2');
window.Phaser = require('phaser-ce/build/custom/phaser-split');

export default class HamsterSpaceGame extends Component{
  constructor(props) {
    super(props);
    this.playerList = [];
    this.meteorList = [];
    this.game;
    this.ship;
    this.meteors;
    this.starfield;
    this.cursors; 
    this.socket;
    this.state = { 
        onlinePlayerCount:0,
        joined:false,
    };
  }  
  componentDidMount(){
 


    this.game= new Phaser.Game(700, 450, Phaser.AUTO, 'phaser', { preload: this.preload, create: this.create, update: this.update, render: this.renderGame });


  }

  onSocketConnected =()=>{

    this.ship = this.game.add.sprite(200, 200, 'ship');
    this.ship.socketId = this.socket.id;
    
    this.ship.scale.set(2);
    this.ship.smoothed = false;
    this.ship.animations.add('fly', [0,1,2,3,4,5], 10, true);
    this.ship.play('fly');


    //  Create our physics body - a 28px radius circle. Set the 'false' parameter below to 'true' to enable debugging
	this.game.physics.p2.enable(this.ship, false);
    this.ship.body.setCircle(28);
    this.playerList.push(this.ship)
    this.setState({onlinePlayerCount:this.playerList.length})

    var playerData = {
        x:200,
        y:200,
        userName:this.props.userName
    }
    var userNameText = this.game.add.bitmapText(0,-24, 'hamsterfont',this.props.userName,6);
    userNameText.anchor.set(0.5);

    this.ship.addChild(userNameText)
    this.socket.emit("newPlayer",playerData);
	this.game.camera.follow(this.ship,Phaser.Camera.FOLLOW_LOCKON);
    this.setState({showGameInfo:true})
  }
  onNewPlayer =(data)=>{ //when player joins recieves already existed players.
    var ship = this.game.add.sprite(data.x,data.y,'ship')
    ship.socketId = data.id;
    ship.userName = data.userName;
   
    ship.scale.set(2)
    ship.smoothed = false;
    ship.animations.add('fly', [0,1,2,3,4,5], 10, true);
    ship.play('fly');
    this.game.physics.p2.enable(ship, false);
    ship.body.setCircle(28);
    var userNameText = this.game.add.bitmapText(0,-24, 'hamsterfont',ship.userName,6);
    userNameText.anchor.set(0.5);
    ship.addChild(userNameText)
    this.playerList.push(ship)
    this.setState({onlinePlayerCount:this.playerList.length})
  }
  componentWillReceiveProps(props){
    if(props.disconnect == true){
        this.socket.disconnect()
        this.props.closeWindow()
    }
  }
  onRemovePlayer = (data)=>{


    this.playerList.forEach((player,index)=>{
    if(player.socketId == data.id){
        player.destroy()
        this.playerList.splice(index, 1);
        this.setState({onlinePlayerCount:this.playerList.length})


    }

    })


  }
  onNewRemotePlayer = (data)=>{

   
    var ship = this.game.add.sprite(data.x,data.y,'ship')
    ship.socketId = data.id;
    ship.userName = data.userName;

   
    ship.scale.set(2)
    ship.smoothed = false;
    ship.animations.add('fly', [0,1,2,3,4,5], 10, true);
    ship.play('fly');
    this.game.physics.p2.enable(ship, false);
    ship.body.setCircle(28);
    var userNameText = this.game.add.bitmapText(0,-24, 'hamsterfont',ship.userName,6);
    userNameText.anchor.set(0.5);
    ship.addChild(userNameText)
    this.playerList.push(ship)
    this.setState({onlinePlayerCount:this.playerList.length})



  }
  findPlayerById =(id)=>{
    for (var i = 0; i < this.playerList.length; i++) {

		if (this.playerList[i].socketId == id) {
			return this.playerList[i]; 
		}
	}
	
	return false; 
  }
  onWorldUpdated = (data)=>{
    data.playerUpdates.forEach(playerUpdate=>{
        this.playerList.forEach(player=>{
           if(player.socketId == playerUpdate.id){
            
            player.body.data.position =playerUpdate.position
            player.body.data.velocity = playerUpdate.velocity;
            player.body.data.angle = playerUpdate.angle;



           }

        })

    })

    data.meteorUpdates.forEach(meteorData=>{
        this.meteorList.forEach(localMeteor=>{
            if(localMeteor.body.data.id == meteorData.id ){
                localMeteor.body.data.position =meteorData.position;
                localMeteor.body.data.angularVelocity = meteorData.angularVelocity;
                localMeteor.body.data.velocity = meteorData.velocity;
                localMeteor.body.data.angle = meteorData.angle;

            }


        })


    })



       // var localPlayer = this.findPlayerById(this.socket.id)
      //  if (!this.game.camera.atLimit.x)
          //  {
          //      this.starfield.tilePosition.x -= (localPlayer.body.data.velocity.x * this.game.time.physicsElapsed);
         //   }
        
          //  if (!this.game.camera.atLimit.y)
         //   {
         //       this.starfield.tilePosition.y -= (localPlayer.body.data.velocity.y * this.game.time.physicsElapsed);
         //   }

  }


preload = ()=>{
   

        this.game.load.image('stars', '../static/starfield.jpg');
        this.game.load.spritesheet('ship', '../static/humstar.png', 32, 32);
        this.game.load.image('meteor', '../static/shinyball.png');
        this.game.load.bitmapFont('hamsterfont', '../static/hamsterfont.png', '../static/hamsterfont.xml');
    
    


}
onMeteorsCreated = (meteorData)=>{
  
for(var i=0;i<meteorData.length;i++){
  
  
    var meteor = this.game.add.sprite(meteorData[i].position[0]*-20,meteorData[i].position[1]*-20,'meteor')
    
   
    this.game.physics.p2.enable(meteor, false);
    meteor.scale.set(2)

    meteor.body.setCircle(32);
    meteor.body.data.id  = meteorData[i].id

    this.meteorList.push(meteor);

}


}
create = ()=>{
    this.socket = io.connect("localhost:2000");// server a bağlantı isteği gönderir.
    this.socket.on("newPlayer", this.onNewPlayer);
    //Serverdan gelecek "enemy_move" mesajını dinle.
    this.socket.on("newRemotePlayer", this.onNewRemotePlayer);
    
    //Serverdan gelecek "remove_player" mesajını dinle.
    
	this.socket.on('remove_player', this.onRemovePlayer); 
	
	//input gelince
    this.socket.on('onWorldUpdate', this.onWorldUpdated);
    this.socket.on('meteors', this.onMeteorsCreated);

    
    this.socket.on('connect',this.onSocketConnected)




    this.game.world.setBounds(0, 0, 1201, 1201);
    this.game.stage.disableVisibilityChange =true;

    this.game.physics.startSystem(Phaser.Physics.P2JS);
    //this.game.physics.p2.defaultRestitution = 0.9;

    this.starfield = this.game.add.tileSprite(0, 0, 800, 600, 'stars');
    this.starfield.fixedToCamera = true;


    this.cursors = this.game.input.keyboard.createCursorKeys();
}

update = ()=>{
    //this.ship.body.setZeroVelocity();
   
    if (this.cursors.left.isDown)
    {
       var  data = {
            type:"left",
            position:this.ship.body.position,
        
        }
        

		this.socket.emit('inputFired',data)
    }
    else if (this.cursors.right.isDown)
    {
       var data = {
            type:"right",
            position:this.ship.body.position,

        }
		this.socket.emit('inputFired',data)
    }

    if (this.cursors.up.isDown)
    {
       var data = {
            type:"up",
            position:this.ship.body.position,
          
        }
		this.socket.emit('inputFired',data)
    }
    else if (this.cursors.down.isDown)
    {
       var data = {
            type:"down",
            position:this.ship.body.position,
        }
		this.socket.emit('inputFired',data)
    }

  
}
renderGame = ()=>{



}
renderGameInfo = ()=>{
    if(this.state.showGameInfo == true ){
        return(
            <HamsterGameInfo/>
           
        )
    }
}
renderOnlinePlayerCount = ()=>{
    if(this.state.showGameInfo == true){
return(
    <div className="onlinePlayerCount">
<span>Online Players:{this.state.onlinePlayerCount}</span>

    </div>
)

    }
}
  render(){
        if(this.props.disconnect == false){
            return(
      
           
                <div id="phaser">
                {this.renderGameInfo()}
                {this.renderOnlinePlayerCount()}
               
                
               </div>    
               
         
         
               
             
               
                  
    
    
    
        
                
                )

        }else{
            return(null)
        }
        
    

    



  }




}

