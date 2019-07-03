import React, { Component } from 'react';
import Link from 'next/link'
import Clock from '../components/Clock'
import ConnectionTimerWindow from '../components/ConnectionTimerWindow'
import ChatBotWindow from '../components/ChatBotWindow'
import ContactWindow from '../components/ContactWindow'
import HamsterSpaceWindow from '../components/HamsterSpaceWindow'
import { PageTransition } from 'next-page-transitions'
import {isMobile} from 'react-device-detect';



export default class DesktopComponent extends Component{

  constructor(props) {
    super(props);
 


    this.state = { 
        openWindows:[],
        desktopReturnsBack:false,
        showHamsterSpaceWindow:false,
        desktopGoesBlack:false,
        showChatBotWindow:false,
        showShutDownMenu:false,
        chatBotWindowMinimized:false,
        showContactWindow:false,
        contactWindowMinimized:false,
      backGroundRunningApps:false,
    };
  }  

  componentDidMount(){
    if(!isMobile){
        var windowObject = {
            windowName:"chatbot",
            isSelected:true
        }    
     
        this.setState({showChatBotWindow:true,openWindows:[...this.state.openWindows, windowObject]})
    }




  }


  showBackGroundRunningApps = ()=>{
      if(this.state.backGroundRunningApps == true){
        this.setState({backGroundRunningApps:false})

      }else{
        this.setState({backGroundRunningApps:true})

      }


  }
  renderBackGroundRunningApps =()=>{
    if(this.state.backGroundRunningApps){
return(
<div className="backGroundRunningApps">
<div title="Bitcoin Miner Working...">
    <img width="35px" src="../static/bitcoin.png"></img>
</div>
<div title="Torrent Client Seeding...">
    <img width="30px" src="../static/torrent.png"></img>
</div>

</div>


)


    }
  }

  chatBotWindowMinimizedClassSelector = ()=>{
   
    

      if(this.state.chatBotWindowMinimized ==true){
          return 'windowMinimized'
      }else{
          return 'windowHighZIndex'
      }
      
  }
  contactWindowMinimizedClassSelector = ()=>{
    this.state.openWindows.forEach(openWindow =>{
        if(openWindow.isSelected == true && openWindow.windowName == "contact"){
            return 'windowHighZIndex'
        }
    })
    
    if(this.state.contactWindowMinimized ==true){
        return 'windowMinimized'
    }else{
        return ''
    }
    
}
  timeUpdater = ()=>{
      setInterval(updateTime,)

  }
  renderChatBotWindow = ()=>{
if(this.state.showChatBotWindow){
    return(
        <ChatBotWindow  chatBotWindowMinimizedClassSelector={this.chatBotWindowMinimizedClassSelector} minimizeChatBotWindow={this.minimizeChatBotWindow} closeChatBotWindow={this.closeChatBotWindow}/>
    )
}
  }

  renderContactWindow = ()=>{
    if(this.state.showContactWindow){
        return(
            <ContactWindow  contactWindowMinimizedClassSelector={this.contactWindowMinimizedClassSelector} minimizeContactWindow={this.minimizeContactWindow} closeContactWindow={this.closeContactWindow}/>
        )
    }

  }

  chatBotWindowIconClicked = ()=>{
    var alreadyOpen = false;

    this.state.openWindows.forEach(window=>{
        window.isSelected=false;

        if(window.windowName == "chatbot"){
            alreadyOpen = true;
            window.isSelected=true;
        }
    })
    
   
      if(!alreadyOpen){
        var windowObject = {
            windowName:"chatbot",
            isSelected:true
        }    
        this.setState({showChatBotWindow:true,openWindows:[...this.state.openWindows, windowObject]})
      }else{
       return;

      }
  }
  contactWindowIconClicked = ()=>{
    var alreadyOpen = false;

    this.state.openWindows.forEach(window=>{
        window.isSelected=false;
        if(window.windowName == "contact"){
            alreadyOpen = true;
            window.isSelected=true;
        }
    })
    
   
      if(!alreadyOpen){
        var windowObject = {
            windowName:"contact",
            isSelected:true
        }    
        this.setState({showContactWindow:true,openWindows:[...this.state.openWindows, windowObject]})
      }else{
       return;

      }


  }
  hamsterSpaceIconClicked = ()=>{
      if(isMobile){
          alert("For now you need a computer to play this game! :/")
      }else{
        this.setState({showHamsterSpaceWindow:true})

      }
  }
  hamsterSpaceClosed = ()=>{
      this.setState({showHamsterSpaceWindow:false})
  }

  closeChatBotWindow = ()=>{
   
   
      this.setState({showChatBotWindow:false,openWindows: this.state.openWindows.filter(openWindow=> { 
        return openWindow.windowName !== "chatbot" 
    })},()=>{
        console.log(this.state.openWindows)

        if(this.state.openWindows.length >0){
            var openWindows = this.state.openWindows
        
            openWindows[0].isSelected = true;
            this.setState({openWindows:openWindows})
        }
       
    })
   

  }
  closeContactWindow = ()=>{

   
    this.setState({showContactWindow:false,openWindows: this.state.openWindows.filter(openWindow=> { 
      return openWindow.windowName !== "contact" 
  })},()=>{
    console.log(this.state.openWindows)

    if(this.state.openWindows.length >0){
        var openWindows = this.state.openWindows
    
        openWindows[0].isSelected = true;
        this.setState({openWindows:openWindows})
    }
   
})

}

  minimizeChatBotWindow = ()=>{
this.setState({chatBotWindowMinimized:true})


  }
  minimizeContactWindow = ()=>{
    this.setState({contactWindowMinimized:true})
    
    
      }
chatBotMinimizedClicked = ()=>{
    if(this.state.chatBotWindowMinimized ==true){
        this.setState({chatBotWindowMinimized:false})
    }

}
contactMinimizedClicked = ()=>{
    if(this.state.contactWindowMinimized ==true){
        this.setState({contactWindowMinimized:false})
    }

}
  renderOpenWindows = ()=>{ //renderer for görev cubugu
return(
    this.state.openWindows.map(openWindow=>{

        if(openWindow.windowName =="chatbot" && openWindow.isSelected){
            return(
        <div key={"chatbotSelected"} onClick={()=> this.chatBotMinimizedClicked()} className="windowSelected">
        <img width="25px" src="../static/chatbot.png"></img>
               <span>ChatBot</span>
        
        </div>
        
            )
        }else if(openWindow.windowName =="chatbot"&& openWindow.isSelected == false){
            return(
                <div key={"chatBotNotSelected"} onClick={()=> this.chatBotMinimizedClicked()} className="windowNotSelected">
                <img width="25px" src="../static/chatbot.png"></img>
                       <span>ChatBot</span>
                
                </div>
                
                    )

        }else if(openWindow.windowName =="contact" && openWindow.isSelected){
            return(
                <div key={"contactSelected"} onClick={()=> this.contactMinimizedClicked()} className="windowSelected">
                <img width="25px" src="../static/contact.png"></img>
                       <span>Contact</span>
                
                </div>
                
                    )

        }else if(openWindow.windowName =="contact"&& openWindow.isSelected==false){
            return(
                <div key={"contactNotSelected"} onClick={()=> this.contactMinimizedClicked()} className="windowNotSelected">
                <img width="25px" src="../static/contact.png"></img>
                       <span>Contact</span>
                
                </div>  
            )
        }
        
        
            })


)
 



  }
  renderShutDownMenu = ()=>{
if(this.state.showShutDownMenu){
return(
    <div className="shutDownMenu">
<span onClick={()=> this.shutDownClicked()}>Shut Down</span>

    </div>
)



}


  }
  
  renderDesktopBlack = ()=>{
      if(this.state.desktopGoesBlack){
          return(
              <div className="desktopBlack"></div>
          )
      }else if(this.state.desktopReturnsBack){
return(
    <div className="desktopReturn"></div>
)

      }
  }

  startClicked = ()=>{
      if(this.state.showShutDownMenu){
          this.setState({showShutDownMenu:false})
      }else{
          this.setState({showShutDownMenu:true})
      }
  }

  desktopBgChanger = ()=>{
    this.setState({desktopReturnsBack:true,desktopGoesBlack:false})
    setTimeout(()=>this.setState({desktopReturnsBack:false,desktopGoesBlack:false}),3000)
    
  }


  shutDownClicked = ()=>{

    this.setState({desktopGoesBlack:true,showShutDownMenu:false})
    setTimeout(this.desktopBgChanger,6000)

  }
  renderHamsterSpaceWindow = ()=>{
      if(this.state.showHamsterSpaceWindow){
          return(
              <HamsterSpaceWindow hamsterSpaceClosed={this.hamsterSpaceClosed}/>
          )
      }
  }

render(){
  return(
    <div className="desktopContainer" >
    {this.renderDesktopBlack()}
    {this.renderChatBotWindow()}
    {this.renderContactWindow()}
    {this.renderHamsterSpaceWindow()}
    <div className="activateWindowsTextContainer">
    <span style={{fontSize:"25px"}}>Activate Windows</span>
    <span style={{fontSize:"15px"}}>Go to settings to activate Windows.</span>
    </div>
    <ConnectionTimerWindow/>
    {this.renderBackGroundRunningApps()}
    {this.renderShutDownMenu()}
    <div className="desktopIcons">
    <div className="iconTextContainer">
<img onClick={()=> this.chatBotWindowIconClicked()} width="75px" style={{display:"block"}} src="../static/chatbot.png"/>
<span>ChatBot</span>
</div>
<div className="iconTextContainer">
<img onClick={()=> this.contactWindowIconClicked()} width="75px" style={{display:"block"}} src="../static/contact.png"/>
<span>Contact</span>
</div>
<div className="iconTextContainer">
<img width="75px" style={{display:"block"}} src="../static/work.png"/>
<span>Work</span>
</div>
<div className="iconTextContainer">
<img width="75px" style={{display:"block"}} src="../static/resume.png"/>
<span>Resume</span>
</div>
    </div>
    <div onClick={()=> this.hamsterSpaceIconClicked()} className="hamsterIconContainer">
<img width="75px" style={{display:"block"}} src="../static/hamsterspace.png"/>
<span style={{  marginTop:"5px",
    fontSize:"18px",
    color:"white",
    fontFamily:"Courier"}}>Space Hamster</span>

    </div>
    <div className="startBar">
    <div onClick={()=> this.startClicked()} className="startButton">
    <span>Start</span>
    </div>
    <div className="openWindows">
{this.renderOpenWindows()}

    </div>
<Clock showBackGroundRunningApps ={this.showBackGroundRunningApps} />
    </div>

  </div>
  )
 


}
}



