import React, { Component } from 'react';
import '../styles/WorkWindow.css'; // import css
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time
import ImageGallery from 'react-image-gallery';
import '../styles/image-gallery.css'
import {isMobile} from 'react-device-detect';


export default class WorkWindow extends Component{

  constructor(props) {
    super(props);
    this.currentStatusIndex;
    this.galleryImages;
    this.projects = [
{
type:"web",
headerImage:"",
images:[],
title:"yguney.com",
date:"2019 Summer",
desc:"My personal portfolio website,yguney.com is developed with Next.js + Express.js.Since its next.js project entire front end is React.While next.js is handling most of the backend, Space Hamster game server is handled by express.For physics P2.js is used on both client and server side.Socket connections are done with socket.io.It took me 2 weeks to develope this website from scratch and i had lots of fun  doing it! I hope you are also having fun visiting it :)"




},
{
  type:"web",
headerImage:"",
images:[{
  original:"https://i.lensdump.com/i/WcWwrZ.png"
}],
title:"Sportsout",
date:"2019 Spring",
desc:"Sportsout is an online video learning platform for sports similar to udemy.Instructors can add and edit their video courses , students can buy courses and watch their videos etc...Since for such a website SEO was very important,i have decided to develope it as server side rendered.So entire website was next.js.For REST API express is used.For database since lots of relational data involved i used MySQL.I developed this project for 2 entrepreneur friends from Sabanci University.Desing psds belongs to them."

},
{
  type:"web",
headerImage:"",
images:[],
video:["https://streamable.com/q6y98"],
title:"Bellroy.com Replica",
date:"2019 Winter",
desc:"Bellroy.com has  one of the most liked e-commerce website design.I have decided to re-create this website to sharpen my front-end  skills.Fully CSS flexbox and grid used.I have also used next.js express and mysql for simple e commerce website backend.I also developed custom image cauresel for the website."

},
{
  type:"web",
headerImage:"",
images:[],
video:["https://streamable.com/0i8pu"],
title:"MyTown",
date:"2018 Summer",
desc:"What Yunus does when he is bored at summer in Sabanci dorms ? Of course he writes code.As a fan of old school online browser games, i have decided to make a troll one for myself.Mytown is an online browser town building game with crafting,cooking and farming features.Players could build different structures to obtain different resources.Entire backend is developed with meteor.js,database  was mongodb.Even though front end was pretty much trash I wrote so much solid backend-db code during this project and learned a ton of stuff."

},
{
  type:"web",
headerImage:"",
images:[
  {
    original:"../static/laravel1.png"
  },
  {
    original:"../static/laravel2.png"
  },
  {
    original:"../static/laravel3.png"
  },
  {
    original:"../static/laravel4.png"
  },
  {
    original:"../static/laravel5.png"
  },
],
  
video:[],
title:"Laravel E-commerce",
date:"2018 Spring",
desc:"My first MVC web project was a simple e commerce website.I developed this website with Laravel PHP since there was an hype with Laravel going on :).Functionality wise it was pretty much CRUD app with authentication.It was an experimental learning experience,no payment system was integrated.I learned about MVC pattern and practiced my PHP-mysql query skills."


},
{
  type:"web",
headerImage:"",
images:[
  {
    original:"../static/course1.png"
  },
  {
    original:"../static/course2.png"
  },
  {
    original:"../static/course3.png"
  },
  {
    original:"../static/course4.png"
  },
  {
    original:"../static/course5.png"
  },
  {
    original:"../static/course6.png"
  },
  {
    original:"../static/course7.png"
  },
  {
    original:"../static/course8.png"
  },
  {
    original:"../static/course9.png"
  },
],
  
video:[],
title:"Course Registration System",
date:"2018 Spring",
desc:"Course registration system was a course project at my uni.I developed an entire course registration system alone.System was developed for the usage of students,instructors,admins,system admins.It had functionalities such as add drop withdraw course, time conflict detect,special approval, grading etc...I developed front end  with Angular and integrated it with Ionic for progressive web app usage to use it as mobile app.Backend was firebase which was a very bad desicion since lots of relational data involved,but since i did the job hard way i learned firebase very well."


},
{
  type:"web",
headerImage:"",
images:[
  {
    original:"../static/agarioclone1.png"
  },
  {
    original:"../static/agarioclone2.png"
  },
 
],
  
video:[],
title:"Agar.io Clone with Phaser",
date:"2018 Winter",
desc:"After feeling  comfortable with phaser game engine and socket connections,i have decided to develope an agar.io clone.I wrote lots of raw javascript code and socket.io backend code during this project.I also divided my project to parts and commented on code in turkish so that in future i might share my experience as a tutorial.I am still using the socket code i wrote during this project everywhere :)"

},

{
  type:"mobile",
headerImage:"",
images:[
 
 
],
  
video:[],
title:"Online MiniGame Platform",
date:"Under Development",
desc:"I am working on an online mobile mini game platform.Users will play various 1v1 2v2 mini games against each other,video calls during games and beting will be possible for competitive environment.I have integrated android project and LibGDX.Using box2d as physics engine on both server and client side.Express backend with lots of socket connections involved..."

},
//{
//  type:"mobile",
//headerImage:"",
//images:[
 
 
//],
  
//video:[],
//title:"Trojan Hacker Panel",
//date:"2019...",
//desc:"I  develope administrator panels of my malwares as a mobile app since it feels  more portable and definitly cooler :) Usually i list information of infected devices and interact with them,sending commands or reading logs using this app.Developed with React-native"

//},
{
  type:"mobile",
headerImage:"",
images:[
 
 
],
  
video:["https://streamable.com/5jr03"],
title:"The Art Hunter",
date:"2018-2019 and beyond...",
desc:"Considerably my greatest project, The Art Hunter is an online augmented reality/geocaching rpg game for IOS and Android(similar to pokemon go).Players are playing as heroes whom aim is to bring light back to their country.Each player use his mobile phone as detectors to find buried art-relics around Sabanci University campus.Collected art works drops lumos which are light particles.There are minigames,mysteries and  puzzles around map which are waiting to be solved by players.There are many different NPCs with quests.Each player can decorate their own gallery and visit other players gallerys,each players movement is rendered on map thus game is dynamic and real time.Meteor+Mongo+Express used as backend."

},
{
  type:"mobile",
headerImage:"",
images:[
 
 
],
  
video:["https://streamable.com/ruk21"],
title:"Done App",
date:"2018 Spring",
desc:"Done is a native android app which sends its users daily missions and keeps progress of them.It has a simple forum where users can discuss missions.Design of the app is done by 2 of my group friends,entire client(java) and backend code is written by me in 2 weeks.Functionality wise done is firebase CRUD application with auth."

},
//{
  //type:"desktop",
//headerImage:"",
//images:[
 
 
//],
  
//video:[],
//title:"Kudur Super Trojan",
//date:"2019 Summer",
//desc:"Kudur is a super trojan fully written in C++.It has features such as screenlogging,keylogging,remote message transfer,remotely activated ransomware feature, running any system command on victims computer, file transfer and more.Kudur is controled by attacker using trojan administrator tool from mobile phone.Kudur stays undetected by using a diffent infection methodology."

//},
//{
  //type:"desktop",
//headerImage:"",
//images:[
 
 
//],
  
//video:[],
//title:"PeoRAT",
//date:"2019 Spring",
//desc:"PeoRAT is a remote administration trojan written in Python.Its more of a remote administration tool rather than a trojan since its actually an earlier form of Kudur Super Trojan.Allows attacker to run commands on victims computer such as message transfer,shutting down remotely etc.Controlled by trojan administrator tool."

//},
//{
  //type:"desktop",
//headerImage:"",
//images:[
 
 
//],
  
//video:[],
//title:"CryMore",
//date:"2019 Spring",
//desc:"CryMore is a ransomware written in Python and C++(seperately).Crymore uses AES 128 bit encryption to encrypt all important files on victims computer and sends decryption key to attacker.CryMore demands BTC or some other task from victim.When task is completed,a decryptor antidote file is automaticly sent to the victim so they can get their files back."

//},
{
  type:"desktop",
headerImage:"",
images:[
 
 
],
  
video:["https://streamable.com/7uxm6"],
title:"Distributed Systems Algorithms",
date:"2019 Spring",
desc:"During my course distributed systems i have implemented 2 important algorithms alone with Python.1 st one is 'chord' which is base of p2p systems.2 nd one is 'Byzantine Fault Tolerence'.  "

},
{
  type:"desktop",
headerImage:"",
images:[
 
 
],
  
video:["https://streamable.com/cdrxx"],
title:"Web Scraping",
date:"2019 Spring",
desc:"Using nodes xray.js i scraped html data from web.During this project i  mined imdb movie gross and point data and ploted them  as graph with react.This was a very simple task but on the other hand i learned how to mine any data from web so it was a great achievement."

},
{
  type:"desktop",
headerImage:"",
images:[
 
 
],
  
video:["https://streamable.com/m3kmc"],
title:"C# Online Quiz Game",
date:"2018 Winter",
desc:"I developed a simple online quiz game in C# to experiment with raw sockets.Both client and server is c#.Each round a player asks a question and other players answers.Player with highest point wins."

},
{
  type:"desktop",
headerImage:"",
images:[
 
 
],
  
video:[],
title:"Java Game Engine",
date:"2017",
desc:"After learning core concepts of a game engine such as gameloop,rendering graphics, tick frame etc, i have decided to write a simple java game engine.I used an open source  engine as starting point and did lots of game programming experiment on it.Since it was not using any libraries, my general programming skills are improved, java skills are carried to next level."

},

    ]



    this.state = { 
      status:0,
      statusArray:[0],
      showGallery:false,


    };
  }  
  componentDidMount(){
    


  }


  workWindowContainerCssSelector = ()=>{
    if(this.state.status == 0){
      return 'workWindowContainer'
    }else{
      return 'workWindowProjectContainer'
    }
  }
  adressBarCssSelector = ()=>{
    if(this.state.status == 0){
      return 'adressBar'
    }else{
      return 'adressBarProject'
    }
  }
  backwardClicked = ()=>{
    if(this.state.statusArray.length>1){
      this.currentStatusIndex = this.state.statusArray.length-2
      this.setState({status:0})
    }



  }
  forwardClicked = ()=>{
   
    if(this.state.statusArray[this.currentStatusIndex+1]!=undefined){

      var status = this.state.statusArray[this.currentStatusIndex+1]
      this.setState({status:status})
    }



  }

  projectTitleClicked = (projectTitle)=>{
    
  this.projects.map(project=>{
    if(project.title == projectTitle){
      if(project.images.length > 0){
        this.galleryImages = project.images;
        this.setState({showGallery:true})

      }
      if(project.video !=undefined){
        project.video.forEach(video =>{
          window.open(video)

        })
      }
    }
  })




  }

  renderWorkWindowContent = ()=>{
    if(this.state.status == 0){
      return(
        <div>
        <span style={{fontFamily:"Courier",fontSize:"17px",color:"#0f0"}}>Click on project names for images/videos.</span>

        <div className="workWindowIconContainer">
        
        <div onClick={()=>this.webClicked()} className="webIcon">
<img  width="78px" style={{display:"block"}} src="../static/web.png"/>
<span>Web</span>
</div>
<div onClick={()=>this.mobileClicked()} className="mobileIcon" >
<img  width="45px" style={{display:"block"}} src="../static/mobile.png"/>
<span>Mobile</span>
</div>
<div onClick={()=>this.desktopClicked()} className="desktopIcon" >
<img  width="90px" style={{display:"block"}} src="../static/desktop.png"/>
<span>Desktop</span>
</div>   
        
        </div>

</div>

      )
    }else if(this.state.status == 1){
      return(
        this.projects.map(project =>{
          if(project.type == "web" && project.headerImage =="" ){
            return(
<div>
  <div style={{display:"flex",alignItems:"center"}}>
  <span onClick={()=> this.projectTitleClicked(project.title)} className="projectTitle">{project.title}</span>
  <span className="projectDate">{project.date}</span>

  </div>
  <span className="projectDesc">{project.desc}</span>
  </div>

            )
          }else if(project.type == "web" && project.headerImage !=""){
            return(
              <div>
                <img width={"75%"} src={project.headerImage}/>
                <div style={{display:"flex",alignItems:"center"}}>
                
                <span onClick={()=> this.projectTitleClicked(project.title)} className="projectTitle">{project.title}</span>
                <span className="projectDate">{project.date}</span>
              
                </div>
                <span className="projectDesc">{project.desc}</span>
                </div>
              
                          )


          }


        })
        
      )
    }else if(this.state.status == 2){
      return(
this.projects.map(project=>{
if(project.type == "mobile"){
return(
<div>
  <div style={{display:"flex",alignItems:"center"}}>
  <span onClick={()=> this.projectTitleClicked(project.title)} className="projectTitle">{project.title}</span>
  <span className="projectDate">{project.date}</span>

  </div>
  <span className="projectDesc">{project.desc}</span>
  </div>


)

}



})
)
      
    }else if(this.state.status == 3){
      return(
        this.projects.map(project=>{
        if(project.type == "desktop"){
        return(
        <div>
          <div style={{display:"flex",alignItems:"center"}}>
          <span onClick={()=> this.projectTitleClicked(project.title)} className="projectTitle">{project.title}</span>
          <span className="projectDate">{project.date}</span>
        
          </div>
          <span className="projectDesc">{project.desc}</span>
          </div>
        
        
        )
        
        }
        
        
        
        })
        )

    }


  }

  webClicked = ()=>{
    var statusArray = this.state.statusArray
    statusArray.push(1);
    this.setState({statusArray:statusArray,status:1})
  }
  mobileClicked = ()=>{
    var statusArray = this.state.statusArray
    statusArray.push(2);
    this.setState({statusArray:statusArray,status:2})
  }

  desktopClicked = ()=>{
    var statusArray = this.state.statusArray
    statusArray.push(3);
    this.setState({statusArray:statusArray,status:3})

  }
  renderBackwardForward = ()=>{
if(isMobile){
  return(
    <div>
    <img  onClick={()=>this.backwardClicked()} width="15px" src="../static/backward.png"></img>
    <img  onClick={()=>this.forwardClicked()} style={{marginLeft:"5px"}} width="15px" src="../static/forward.png"></img>
</div>
  )
}else{

return(
  <div>
  <img  onClick={()=>this.backwardClicked()} width="25px" src="../static/backward.png"></img>
  <img  onClick={()=>this.forwardClicked()} style={{marginLeft:"10px"}} width="25px" src="../static/forward.png"></img>
  </div>
)
}


  }

  renderWorkWindowAdressBar = ()=>{
    if(this.state.status == 0){
      return(
        <div className="workWindowAdressBarContainer">
        <div className="backForwardContainer">
      {this.renderBackwardForward()}
        </div>
        <div className={this.adressBarCssSelector()}>
        <span>C:\\Users\\LastPeony\\Desktop\\Projects</span>
        </div>
                 </div>
      )
    }else if(this.state.status == 1){
      return(
        <div className="workWindowAdressBarContainer">
        <div className="backForwardContainer">
        {this.renderBackwardForward()}

        </div>
        <div className={this.adressBarCssSelector()}>
        <span>C:\\Users\\LastPeony\\Desktop\\Projects\\Web</span>
        </div>
                 </div>
      )
    }else if(this.state.status == 2){
      return(
        <div className="workWindowAdressBarContainer">
        <div className="backForwardContainer">
        {this.renderBackwardForward()}

        </div>
        <div className={this.adressBarCssSelector()}>
        <span>C:\\Users\\LastPeony\\Desktop\\Projects\\Mobile</span>
        </div>
                 </div>
      )
    }else if(this.state.status == 3){
      return(
        <div className="workWindowAdressBarContainer">
        <div className="backForwardContainer">
        {this.renderBackwardForward()}

        </div>
        <div className={this.adressBarCssSelector()}>
        <span>C:\\Users\\LastPeony\\Desktop\\Projects\\DeskP.</span>
        </div>
                 </div>

      )

    }
  }

renderGallery = ()=>{
if(this.state.showGallery == true){

  return(


    <div className="galleryContainer">
    <div onClick={()=> this.closeGalleryClicked()} style={{position:"absolute",right:"0",top:"0",fontFamily:"Courier",color:"#0f0",cursor:"pointer",fontWeight:"bold",fontSize:"25px",zIndex:"99999999999999999"}}>Close</div>
    <ImageGallery showPlayButton={false} showThumbnails={false} items={this.galleryImages} />
    </div>



  )
}




}

closeGalleryClicked = ()=>{
  if(this.state.showGallery == true){
    this.setState({showGallery:false})
  }
}
  render(){
    if(isMobile){
      return(
          
        <div className={this.props.workWindowMinimizedClassSelector()}>
        {this.renderGallery()}

          <div  onClick={()=> this.closeGalleryClicked()} className={this.workWindowContainerCssSelector()}>
     <div className="workWindowToolBar">
     <div style={{display:"flex",alignItems:"center",paddingBottom:"5px",paddingTop:"5px"}}>
     <img width="35px" src="../static/work.png"></img>
     <span style={{fontFamily:"Courier",fontSize:"20px",marginLeft:"5px"}}>Projects</span>

     </div>
    <div className="closeMinimize">
<span onClick={()=> this.props.minimizeWorkWindow()} className="minimize">-</span>
<span onClick={()=> this.props.closeWorkWindow()} className="closeWindow">×</span>
    </div>
     </div>
   {this.renderWorkWindowAdressBar()}
     <div className="workWindowContent">
   {this.renderWorkWindowContent()}

     </div>

    
          </div>
        </div>
        )
    }else{
      return(
          
        <div className={this.props.workWindowMinimizedClassSelector()}>
        {this.renderGallery()}
        <Draggable>

          <div  onClick={()=> this.closeGalleryClicked()} className={this.workWindowContainerCssSelector()}>
     <div className="workWindowToolBar">
     <div style={{display:"flex",alignItems:"center",paddingBottom:"5px",paddingTop:"5px"}}>
     <img width="35px" src="../static/work.png"></img>
     <span style={{fontFamily:"Courier",fontSize:"20px",marginLeft:"5px"}}>Projects</span>

     </div>
    <div className="closeMinimize">
<span onClick={()=> this.props.minimizeWorkWindow()} className="minimize">-</span>
<span onClick={()=> this.props.closeWorkWindow()} className="closeWindow">×</span>
    </div>
     </div>
   {this.renderWorkWindowAdressBar()}
     <div className="workWindowContent">
   {this.renderWorkWindowContent()}

     </div>

    
          </div>
        </Draggable>
        </div>
        )

    }

      
    

    



  }




}

