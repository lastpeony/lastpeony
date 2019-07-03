import React, { Component } from 'react';
import '../styles/NickName.css'; // import css
import Typist from 'react-typist';


export default class NickName extends Component{

  constructor(props) {
    super(props);
    
    this.state = { 

    };
  }  
  componentDidMount(){



  }







  render(){

    return(
<div>
        <div className="nickNameContainer">
          <span>#Last Peony</span>
        </div>
        <div className="nickNameContainerMobile">
        <span>#</span>
        <br/>
        <span style={{fontSize:"55px"}}>Last Peony</span>
        </div>
</div>
        
        
        )

 
  
   
    

    



  }




}

