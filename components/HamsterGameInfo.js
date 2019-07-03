import React, { Component } from 'react';



export default class HamsterGameInfo extends Component{

  constructor(props) {
    super(props);
    
    this.state = { 
    };
  }  
  componentDidMount(){
    


  }

  shouldComponentUpdate(nextProps,nextState){
    return this.props !== nextProps || this.state !== nextState;



  }





  render(){
  
        return(

            <div className="hamsterGameInfo">
            <span>This game is 100% server authorative.</span>
            <br/>
            <span>So you can not cheat! :) </span>
            
                        </div>
            
            )
    

    



  }




}



<div className="hamsterGameInfo">
<span>This game is 100% server authorative.</span>
<br/>
<span>So you can not cheat! :) </span>

            </div>