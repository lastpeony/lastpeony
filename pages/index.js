import React, { Component } from 'react';
import dynamic from 'next/dynamic'

import Virus from '../components/Virus'
const RealName = dynamic(import('../components/RealName'), {ssr: false})
const ConsoleWindow = dynamic(import('../components/ConsoleWindow'), {ssr: false})

import NeverKnowText from '../components/NeverKnowText'
import {Link} from '../routes'
import {Router} from '../routes'





export default class Index extends Component{

  constructor(props) {
    super(props);
 


    this.state = { 
    renderVirus :false,
    renderNeverKnowText:false,
    renderStrikedName:false,
    show:false,
    };
  }  

  componentDidMount(){
 
    this.setState({show:true})



  }
  displayPage = ()=>{

  }
  renderVirusOrNot = ()=>{
    if(this.state.renderVirus){
      return(
        <Virus/>
      )
    }
  }
  renderNeverKnowTextOrNot = ()=>{
    if(this.state.renderNeverKnowText){
      return(
        <NeverKnowText/>
      )
    }
  }
  renderVirus = ()=>{
    this.setState({renderVirus:true})
  }
  closeClicked = ()=>{
    this.setState({renderNeverKnowText:true})
  }

  renderRealName = ()=>{
  if(this.state.renderStrikedName){
return(
  <RealName strikedName={true}/>
)

  }else{
    return(
      <RealName strikedName={false}/>
    )
  }


  }
  makeStrikedName = ()=>{
    this.setState({renderStrikedName:true})
  }
render(){
  if(this.state.show == true){
    return(

      <div style={{backgroundColor:"#010203",height:"100%"}}>
      {this.renderRealName()}
      <ConsoleWindow makeStrikedName = {this.makeStrikedName} closeClicked={this.closeClicked} renderVirus={this.renderVirus} />
      {this.renderVirusOrNot()}
      {this.renderNeverKnowTextOrNot()}
      <Link route='desktop' >
      <div style={{position:"absolute",bottom:0,left:0}}>
        <span className="skipButton">Skip</span>
      </div>
      </Link>
  
    </div>
  
  
    )
  }else{
    return null
  }
  
 


}
}



