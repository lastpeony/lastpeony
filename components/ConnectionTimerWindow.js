import React, { Component } from 'react';
import '../styles/ConnectionTimerWindow.css'; // import css
import Typist from 'react-typist';
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time
import { setInterval } from 'timers';
import {isMobile} from 'react-device-detect';


export default class ConnectionTimerWindow extends Component{

  constructor(props) {
    super(props);
    this.totalSeconds = 0;
    this.state = { 
        showConnectionTimer:false,
        minutes:"00",
        seconds:"00"
    };
  }  
  componentDidMount(){


  }

  renderConnectionTimer = ()=>{
if(this.state.showConnectionTimer){
    var timerString = this.state.minutes +":"+this.state.seconds
    return(
<span style={{marginLeft:"10px"}}>{timerString}</span>

    )
}



  }
pad = (val)=>{

    var valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
}
  startConnectionTimer = ()=>{
      setInterval(this.timeIncrementer,1000)
      this.setState({showConnectionTimer:true})
  }

  timeIncrementer = ()=>{
    this.totalSeconds = this.totalSeconds +1;
    this.setState({seconds:this.pad(this.totalSeconds % 60),minutes:this.pad(parseInt(this.totalSeconds / 60))})

  

  }


renderStages = ()=>{
    if(this.state.showConnectionTimer){
        return(
            <div>
            <span>Remote Desktop Connection to Peer Last Peony</span>
            <br/>
            <div style={{display:"flex"}}>
            <span>192.168.1.2</span>
            {this.renderConnectionTimer()}
            <span className="connectionTimerWindowDot" ></span>
       
            </div>
            
            
            </div>
        )
     
    }else{
        return(
            <div>
            <Typist avgTypingDelay={90} onTypingDone={this.startConnectionTimer}  >
         <span>Remote Desktop Connection to Peer Last Peony</span>
         <br/>
         <div style={{display:"flex"}}>
         <span>192.168.1.2</span>
         </div>
         
                     </Typist>
                     {this.renderConnectionTimer()}
         
         </div>
        )
    }
}

renderStagesMobile =()=>{
    if(this.state.showConnectionTimer){
        return(
            <div>
            <span>Remote Desktop Connection</span>
            <br/>
            <div style={{display:"flex"}}>
            <span>192.168.1.2</span>
            {this.renderConnectionTimer()}
            <span className="connectionTimerWindowDot" ></span>
       
            </div>
            
            
            </div>
        )
     
    }else{
        return(
            <div>
            <Typist avgTypingDelay={90} onTypingDone={this.startConnectionTimer}  >
         <span>Remote Desktop Connection</span>
         <br/>
         <div style={{display:"flex"}}>
         <span>192.168.1.2</span>
         </div>
         
                     </Typist>
                     {this.renderConnectionTimer()}
         
         </div>
        )
    }



}

  render(){
        if(isMobile){
            return(

                <div style={{position:"absolute",top:"50%",right:0}}>
                <Draggable>
    
    <div className="connectionTimerWindowMobile">
       <div className="connectionTimerWindowHeaderMobile">
       <span>CONNECTED</span>
       </div>
       <div className="connectionTimerWindowContent">
       {this.renderStagesMobile()}
     
       
       </div>
    
      
      </div>
      </Draggable>
                
                  
                  </div>
                
                
                )
        


        }else{

            return(

                <div style={{position:"absolute",top:0,right:0}}>
                <Draggable>
    
    <div className="connectionTimerWindow">
       <div className="connectionTimerWindowHeader">
       <span>CONNECTED</span>
       </div>
       <div className="connectionTimerWindowContent">
       {this.renderStages()}
     
       
       </div>
    
      
      </div>
      </Draggable>
                
                  
                  </div>
                
                
                )
        


        }
        

    



  }




}

