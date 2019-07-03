import React, { Component } from 'react';
import '../styles/RealName.css'; // import css
import Typist from 'react-typist';


export default class RealName extends Component{

  constructor(props) {
    super(props);
    
    this.state = { 

    };
  }  
  componentDidMount(){



  }







  render(){
  if(!this.props.strikedName){
    return(

      <div className="realNameContainer">
          <Typist cursor={{show:false}}>
<span >Yunus Emre Guney</span>            
      </Typist>
   
        
        </div>
      
      
      )

  }else{
    return(
      <div className="realNameContainer">
      <span ><span className="strike">Yunus Emre Guney</span></span>            
      
        
        </div>

    )
   



  }
       
    

    



  }




}

