import React from 'react'
import App, { Container } from 'next/app'
import { PageTransition } from 'next-page-transitions'
import Reset from '../styles/Reset.css'
import '../styles/ConsoleWindow.css'; // import css

import '../styles/ChatBotWindow.css';
import '../styles/ContactWindow.css';
import '../styles/WorkWindow.css';
import '../styles/image-gallery.css'

import '../styles/Typist.css'
import '../styles/ConnectionTimerWindow.css'; // import css
import '../styles/ConnectionTimerWindow.css'; // import css
import '../styles/Desktop.css'
class MyApp extends App {
  constructor(props) {
    super(props);



    this.state = { 
   show:false
    };
  }  

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }
componentDidMount(){
  this.setState({show:true})
}
  render() {
    const { Component, pageProps } = this.props
if(this.state.show == true){
  return(
    <Container>

    <Component {...pageProps} />
    <style jsx global>{`
      .page-transition-enter {
        opacity: 0.01;
        transform: scale(1.1);        }
      .page-transition-enter-active {
        opacity: 1;
        transform: scale(1);
        transition: all 1000ms;
      }
      .page-transition-exit {
        opacity: 1;
        transform: scale(1);
    }
      .page-transition-exit-active {
        opacity: 0.01;
        transform: scale(1.1);
        transition: all 1000ms;

      }
    `}</style>
  </Container>
  )
}else{
  return(null)
}
    
  }
}

export default MyApp