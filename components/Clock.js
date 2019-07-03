import React, { Component } from 'react';
import '../styles/Desktop.css'; // import css
import Typist from 'react-typist';


export default class Clock extends Component{

  constructor(props) {
    super(props);
    
    this.state = { 
        time:new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    };
  }  
  componentDidMount(){
    
    setInterval(this.clockUpdater,1000)


  }


clockUpdater =()=>{

this.setState({time:new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })})

}




  render(){
  
        return(

            <div className="clock">
            <div onClick={()=> this.props.showBackGroundRunningApps()} title="Show apps running on background.">
            <img  className="upArrow" width="20px" src="../static/uparrow.png"></img>
            </div>
            {this.state.time}</div>
            
            
            )
    

    



  }




}

