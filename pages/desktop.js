import React, { Component } from 'react';
import Link from 'next/link'
import DesktopComponent from '../components/DesktopComponent'

import { PageTransition } from 'next-page-transitions'




export default class Desktop extends Component{

  constructor(props) {
    super(props);
 


    this.state = { 
  
    };
  }  

  componentDidMount(){





  }


  
render(){
  return(
    
    <PageTransition timeout={800} classNames="page-transition">
<DesktopComponent/>
 
  </PageTransition>

  )
 


}
}



