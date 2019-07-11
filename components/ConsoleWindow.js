import React, { Component } from 'react';
import Typist from 'react-typist';
import { Line } from 'rc-progress';
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time
import NickName from  './NickName'
import {Link} from '../routes'
import {Router} from '../routes'
import HashLoader from 'react-spinners/HashLoader';

export default class ConsoleWindow extends Component{

  constructor(props) {
    super(props);
    this.connectingProgressInterval;
    this.connectingPeerProgressInterval;

    this.state = { 
    showAccessDesktopButton:false,
    displayProgressBar:false,
    startConsoleLeaveAnimation:false,
    displayPeerProgressBar:false,
    connectingPercentage:0,
    connectingPeerPercentage:0,
    firstPartCompleted:false,
    secondPartCompleted:false,
    showPeerList:false,
    startRenderingNickName:false,
    showSpinner:false


    };
  }  
  componentDidMount(){
 


  }
 

  renderAccessDesktopButton = ()=>{
if(this.state.showAccessDesktopButton){
    return(
        <Link route='desktop' >

<div onClick={()=>this.setState({showSpinner:true,showAccessDesktopButton:false})} className = "accessDesktopButton">
    <span className="accessDesktopButtonText">Access Desktop</span>
</div>
</Link >



    )
}else if(this.state.showSpinner){

    return(
        <div className = "accessDesktopButton">
       <HashLoader
          css={"position:absolute;top:20%;left:30%;"}
          sizeUnit={"px"}
          size={80}
          color={'#7d12ff'}
        />
</div>
    )
}




  }

  showPeerList = ()=>{
      this.setState({showPeerList:true,secondPartCompleted:true})
  }
  renderPeerList(){
if(this.state.showPeerList == true){
return(
    <div style={{display:"flex",flexDirection:"column"}}>
<span>Peer List Recieved:</span>
<br/>
<div style={{display:"flex"}}>
<span>#12877 Last Peony[192.168.1.2] </span>
<span style={{marginLeft:"5px"}} className="flag-icon flag-icon-tr"></span>
<span  style={{marginLeft:"5px"}} className="onlineCircle"></span>
</div>
<div style={{display:"flex"}}>
<span>#17764 Night Call[72.229.28.1] </span>
<span style={{marginLeft:"5px"}} className="flag-icon flag-icon-us"></span>
<span  style={{marginLeft:"5px"}} className="offlineCircle"></span>

</div>
<div style={{display:"flex"}}>
<span>#13973 Lost Dreams[178.216.33.4] </span>
<span style={{marginLeft:"5px"}} className="flag-icon flag-icon-se"></span>
<span  style={{marginLeft:"5px"}} className="offlineCircle"></span>
</div>

    </div>
)


}

  }
  renderConnectingOrConnected = ()=>{
      if(this.state.connectingPercentage !=100){
          
          return(
              <div style={{display:"flex",alignItems:"center"}}>
              <div>Connecting to 10.121.1.2</div>
                <div className="connectingDot"></div>
              </div>
          )
      }else{
          return(
            <div style={{display:"flex",alignItems:"center"}}>

              <div>Connected to botnet.[10.121.1.2]</div>
              <div className="connectedDot"></div>
              </div>
          )
      }
  }
  renderPeerConnectingOrConnected = ()=>{
    if(this.state.connectingPeerPercentage !=100){
        
        return(
            <div style={{display:"flex",alignItems:"center"}}>
            <div>Connecting to 192.168.1.2</div>
              <div className="connectingDot"></div>
            </div>
        )
    }else{
        return(
          <div style={{display:"flex",alignItems:"center"}}>

            <div>Connected to Last Peony.[192.168.1.2]</div>
            <div className="connectedDot"></div>
            </div>
        )
    }
}

  incrementConnectingProgressBar = ()=>{
      if(this.state.connectingPercentage !=100){
        this.setState({connectingPercentage:this.state.connectingPercentage+1})

      }else{
          this.setState({firstPartCompleted:true})
          clearInterval(this.connectingProgressInterval)
      }


  }
  incrementConnectingPeerProgressBar = ()=>{
    if(this.state.connectingPeerPercentage !=100){
      this.setState({connectingPeerPercentage:this.state.connectingPeerPercentage+1})

    }else{
        clearInterval(this.connectingPeerProgressInterval)
        setTimeout(this.animateConsoleWindow,2000)
    }


}
  startConnectingProgress = ()=>{

    this.setState({displayProgressBar:true},()=>{

        this.props.renderVirus()
        this.connectingProgressInterval = setInterval(this.incrementConnectingProgressBar,50)
        

    })

  }
  startPeerConnectingProgress = ()=>{

    this.setState({displayPeerProgressBar:true,startRenderingNickName:true},()=>{
        this.props.makeStrikedName()

        this.connectingPeerProgressInterval = setInterval(this.incrementConnectingPeerProgressBar,75)
        

    })

  }
  renderPeerConnectingProgressBar = ()=>{

    if(this.state.displayPeerProgressBar && this.state.connectingPeerPercentage !=100){
        return(
            <div>
            {this.renderPeerConnectingOrConnected()}
            <div style={{display:"flex",alignItems:"center"}}>
            
            <div style={{display:"inline-block"}}>
            <span>[</span>
            <Line style={{width:"100px"}} percent={this.state.connectingPeerPercentage} trailWidth="10" strokeWidth="10" trailColor='' strokeColor="#0f0" />
<span>]</span>
            </div>

<div className="rotatingStick">|</div>
<div style={{display:"inline-block"}}>
<span>%</span>
<span>{this.state.connectingPeerPercentage}</span>
    </div>

            </div>
            </div>

        )
    }else if(this.state.displayPeerProgressBar == true && this.state.connectingPeerPercentage == 100){
        return(
<div>
{this.renderPeerConnectingOrConnected()}

</div>



        )
    }



  }

  renderProgressBar = ()=>{

    if(this.state.displayProgressBar && this.state.connectingPercentage !=100){
        return(
            <div>
            {this.renderConnectingOrConnected()}
            <div style={{display:"flex",alignItems:"center"}}>
            
            <div style={{display:"inline-block"}}>
            <span>[</span>
            <Line style={{width:"100px"}} percent={this.state.connectingPercentage} trailWidth="10" strokeWidth="10" trailColor='' strokeColor="#0f0" />
<span>]</span>
            </div>

<div className="rotatingStick">|</div>
<div style={{display:"inline-block"}}>
<span>%</span>
<span>{this.state.connectingPercentage}</span>
    </div>

            </div>
            </div>

        )
    }else if(this.state.displayProgressBar == true && this.state.connectingPercentage == 100){
        return(
<div>
{this.renderConnectingOrConnected()}

</div>



        )
    }



  }

  
  renderConsoleParts = ()=>{
      if(this.state.firstPartCompleted && this.state.secondPartCompleted == false){
          return(
              <div>
            <span>Welcome root.</span>
            <br/>
            <span>Connection request sent to the botnet server.</span>
            <br/>
             <span>Acknowledgement recieved.</span>
            {this.renderProgressBar()}
            <Typist avgTypingDelay={90}  onTypingDone={this.showPeerList}>
<span>Requesting Peer List...</span>
            </Typist>
            {this.renderPeerList()}
            </div>
          )
      }else if(this.state.firstPartCompleted && this.state.secondPartCompleted == true){
        return(
            <div>
            <span>Welcome root.</span>
            <br/>
            <span>Connection request sent to the botnet server.</span>
            <br/>
             <span>Acknowledgement recieved.</span>
            {this.renderProgressBar()}
<span>Requesting Peer List...</span>
           
            {this.renderPeerList()}
            <Typist avgTypingDelay={90}  onTypingDone={this.startPeerConnectingProgress}>
<span>1 Peer is online.</span>
<br/>
<span>Connecting peer Last Peony[192.168.1.2]</span>
            </Typist>
            {this.renderPeerConnectingProgressBar()}
            </div>


        )



      }else{
         return(
             <div>
            <Typist avgTypingDelay={90} onTypingDone={this.startConnectingProgress}>
            <span>Welcome root.</span>
            <br/>
            <span>Connection request sent to the botnet server.</span>
            <br/>
             <span>Acknowledgement recieved.</span>
            </Typist>
            {this.renderProgressBar()}
            </div>
         ) 
      }
  }
animateConsoleWindow = ()=>{
    this.setState({startConsoleLeaveAnimation:true,showAccessDesktopButton:true})
}
consoleWindowClass = ()=>{
if(!this.state.startConsoleLeaveAnimation){

return "consoleWindow"
}else{
return "consoleWindowLeaveAnimation"
}


}

  renderNickName= () =>{
if(this.state.startRenderingNickName){
    return(
        <NickName/>
    )
}


  }
  render(){
return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
    {this.renderNickName()}
    {this.renderAccessDesktopButton()}
    <Draggable>

<div className={this.consoleWindowClass()}>
   <div className="consoleWindowHeader">
   <strong>Command Prompt</strong>
    <span onClick={()=> this.props.closeClicked()}>×</span>
   </div>
   <div className="consoleWindowContent">
    {this.renderConsoleParts()}
  

   
   </div>

  
  </div>
  </Draggable>
</div>

)
    



  }




}

