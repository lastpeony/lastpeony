import React, { Component } from 'react';
import Typist from 'react-typist';
import '../styles/SpaceHamster.css'
import dynamic from 'next/dynamic'
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time

const HamsterSpaceGame = dynamic(import('../components/HamsterSpaceGame'), {ssr: false})

export default class HamsterSpaceWindow extends Component{
  constructor(props) {
    super(props);
     this.game;
    this.ship;
    this.starfield;
    this.cursors; 
    this.state = { 
        joined:false,
        disconnect:false,
        userName:'',
    };
  }  
  componentDidMount(){

  }

  userNameChange = (event)=>{

    this.setState({userName: event.target.value});


  }

renderGameOrJoin =()=>{
    if(this.state.joined == false){
        return(
            <div className="enterYourNameContainer">
            <span style={{fontSize:"30px",fontFamily:"Courier",color:"white"}}>Enter Your Name:</span>
            <input  className="userNameInput"  value={this.state.userName} onChange={this.userNameChange}></input>
            <span onClick={()=> this.joinClicked()} className="joinText">Join</span>
             </div>
        )
    }else{
return(
    
    <HamsterSpaceGame closeWindow={this.props.hamsterSpaceClosed} disconnect={this.state.disconnect} userName ={this.state.userName}/>
)
    }
}
joinClicked = ()=>{
    if(this.state.userName!= ""){
        this.setState({joined:true})
    }
    
}
closeWindow = ()=>{
    
        if(this.state.joined == true){
            this.setState({disconnect:true})

        }else{
            this.props.hamsterSpaceClosed()
        }

    
}
  render(){
  
        return(

                        <div className="spaceHamsterWindowContainer">

            <div className="chatBotWindowToolBar">
            <div style={{display:"flex",alignItems:"center",paddingBottom:"5px",paddingTop:"5px"}}>
            <img width="35px" src="../static/hamsterspace.png"></img>
            <span style={{fontFamily:"Courier",fontSize:"20px",marginLeft:"5px"}}>Space Hamster</span>
     
            </div>
           <div className="closeMinimize">
     <span onClick={()=> this.closeWindow()}  className="closeWindow">×</span>
           </div>
            </div>
            <div >
    {this.renderGameOrJoin()}
    
           
     
     
            </div>
         
           
            </div>


    
            
            )
    

    



  }




}

