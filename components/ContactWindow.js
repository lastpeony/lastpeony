import React, { Component } from 'react';
import '../styles/ContactWindow.css'; // import css
import Typist from 'react-typist';
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time


export default class ContactWindow extends Component{

  constructor(props) {
    super(props);
    
    this.state = { 
    };
  }  
  componentDidMount(){
    


  }







  render(){
  
        return(

            <div className={this.props.contactWindowMinimizedClassSelector()}>
            <Draggable>
  
              <div className="contactWindowContainer">
         <div className="contactWindowToolBar">
         <div style={{display:"flex",alignItems:"center",paddingBottom:"5px",paddingTop:"5px"}}>
         <img width="35px" src="../static/contact.png"></img>
         <span style={{fontFamily:"Courier",fontSize:"20px",marginLeft:"5px"}}>Contact</span>
  
         </div>
        <div className="closeMinimize">
  <span onClick={()=> this.props.minimizeContactWindow()} className="minimize">-</span>
  <span onClick={()=> this.props.closeContactWindow()} className="closeWindow">×</span>
        </div>
         </div>
         <div className="contactWindowContent">
         <span>You look like an awesome person and i always look forward to meet with awesome people!</span>
         <br/>
         <br/>
         <span>I'd love to talk about your new project/work ideas or we can just dream about a cyberpunk future together.</span>
         <br/>
         <br/>
         <span>##########################</span>
         <br/>
         <br/>
         <a style={{color:"#0f0"}} target="_blank" href="mailto:yguney@sabanciuniv.edu">yguney@sabanciuniv.edu</a>
         <br/>
         <a style={{color:"#0f0"}} target="_blank" href="https://www.linkedin.com/in/yunus-emre-g%C3%BCney-99b056115/">LinkedIn</a>

  
  
         </div>
    
        
              </div>
              </Draggable>
  </div>
            
            
            )
    

    



  }




}

