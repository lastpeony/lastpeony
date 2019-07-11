import React, { Component } from 'react';
import '../styles/ChatBotWindow.css'; // import css
import Typist from 'react-typist';
import {isMobile} from 'react-device-detect';

import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time

export default class ChatBotWindow extends Component{

  constructor(props) {
    super(props);
    this.initialResponse = "Hi ! I am Last Peony  - the digital version of Software Engineer Yunus Emre Güney! Thanks for connecting to my computer and stopping by for the chat.I haven't seen a human for a long time... Go  ahead and ask me something!"
    this.questionList= ["Who are you?","What are your skills?","What do you like to code in ?","Can i see your projects/work?","Which CS topics are you interested in ?","What are you up-to nowadays?","Can you hack my computer ?"]
    this.questionAnswers = [{
      answers:["My name is Yunus.I am  21 years old Computer Science graduate located in Istanbul working as a software engineer.I am a full-stack web,mobile app programmer,online game developer.","I am passionate about creating apps which connects people,developing products which solves daily problems,creating virtual worlds where everyone can have fun!","I am pretty much platform agnostic.I can develope for web,mobile(IOS-Android) and desktop.","Personality wise I'm a liberal who is obsessive about freedom.When it comes to projects i am very serious,i cant sleep with an existed bug!(:P).I have never ending curiosity about computers and space! I believe in a cyberpunk future.","So best way to guess future is to create it!"]


    },{
      answers:["I am a full stack developer.When it comes to web i can write code for front-end or server side.For database, i have lots of experinece with RDMS and NoSQL.","I can develope native mobile applications for android and IOS.","I like online apps so i am good at socket programming and multithreaded applications.","I love developing online games for fun! I usually prefer low level game engines such as LibGDX or Phaser.","Sometimes i code/analyse existed malware since i find the process  very interesting and creative.I have experience with Trojans,Ransomwares or worse :)"]

    },
  {
    answers:["For front end i have little experience with Vue and Angular.My expertise and favourite is React.","For back-end i have experience with PHP(Laravel) and Java(Spring) but nowadays my go to is Node.js technologies like Express.js and Next.js.If a simple API is needed sometimes i prefer to use Python(Flask) on server side.If a real time feature is needed i use WebSockets.I have lots of experience with Socket.io","For database i use MongoDB,Firebase or MySQL depending on project.","I can develope native java applications for android.But nowadays i prefer React-Native since its more than enough for most of the projects and maintaining single code base for Android-IOS is easier.","When it comes to game development i prefer to work with low level game engines such as LibGDX and Phaser.","For android and IOS i use libGDX with Java, for web games i use Phaser with javascript.","For desktop programming i have experience with C++,Java,C# and Python.Nowadays most of the time i use Java and Python."]
  },
{
  answers:["Of course! Click on Projects icon which is located on desktop to check projects i have developed using my skills."]
},
{
  answers:["I am interested in Distributed Systems,Computer Vision,Computer Networks and Cyber Security.","I am looking forward to learn more about AI and ML in future."]
},
{
  answers:["I am looking for work!","Meanwhile i am working on server side physics engine for online 2D games, figuring out Web-RTC and developing malwares in C++ which will be part of my botnet in future."]
},
{
  answers:["If you become my target probably i can otherwise no :/"]
}
]
    this.state = { 
      chatHistory:[],
      showTypingMessage:true,
      showMoreQuestions:false,
      selectedQuestion:null,
      questionSelected:false,
      botAnswering:false,


    };
  }  
  componentDidMount(){
      // First message is doesn't come from bot so we can introduce the app to the user
      setTimeout(() => {
        this.triggerFirstMessage()
      }, 3000)


  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  scrollToBottom() {
    this.el.scrollIntoView({ behavior: 'smooth' });
  }

triggerFirstMessage = ()=>{

    this.updateHistory(this.initialResponse, "LastPeony Bot", true)


}

updateHistory = (message,userName,isBot=false)=>{
  const { chatHistory } = this.state

  chatHistory.push({
    userName,
    message,
    isBot
  })


 

    this.setState({ chatHistory,showTypingMessage:false })

}

renderIsTypingMessage =()=>{
  if(this.state.showTypingMessage){
    return(
      <div style={{marginTop:"auto"}}>
        <span style={{color:"yellow",fontSize:"15px",fontFamily:"Courier"}}>LastPeony Bot is typing...</span>
      </div>
      
      
        )

  }

}

renderChatHistory = ()=>{
  return(
    this.state.chatHistory.map(message=>{
      var userName = "<"+message.userName+">"

      if(message.isBot){
        return(

          <div key={message.message+Math.random()} style={{display:"flex",fontFamily:"Courier",marginTop:"10px",marginBottom:"10px",minHeight:"30px"}}>
          <span>
          <span style={{color:"yellow",fontSize:"18px"}}>{userName}</span>
          <span style={{color:"lightblue",fontSize:"17px",marginLeft:"20px"}}>{message.message}</span>
    
          </span>
          
    
          </div>
        )
      }else{
        return(
          <div key={message.message+Math.random()}  style={{display:"flex",fontFamily:"Courier",marginTop:"10px",marginBottom:"10px",minHeight:"30px"}}>
          <span>
          <span style={{color:"white",fontSize:"18px"}}>{userName}</span>
          <span style={{color:"lightblue",fontSize:"17px",marginLeft:"20px"}}>{message.message}</span>
    
          </span>
          
    
          </div>
      
      
      
        )

      }
    
      
      
      
        })

  )




}

questionClicked = (question)=>{


this.setState({showMoreQuestions:false,selectedQuestion:question,questionSelected:true})




}
renderQuestions = ()=>{
  if(this.state.questionSelected==false && this.state.showTypingMessage == false){
    return(
      this.questionList.slice(0,3).map((question,index) =>{
        if(index==3){
          return true;
        }else{
return(
  
  <div  onClick={()=> this.questionClicked(question)} className="question">
<span>|{question}|</span>
</div>


)

        }



      })
     
   
    )

  }

}

showMoreQuestionsClicked = ()=>{
  if(this.state.showMoreQuestions){
    this.setState({showMoreQuestions:false})
  }else{
    this.setState({showMoreQuestions:true})

  }
}
renderShowMoreQuestions = ()=>{
  if(this.state.showTypingMessage==false && this.state.questionSelected == false){
    return(
      <div onClick={()=> this.showMoreQuestionsClicked()} title="Show More Questions" className="showMoreDots">
<span>...</span>
</div>
    )
  }
}

renderMoreQuestionsContainer = ()=>{
  if(this.state.showMoreQuestions == true){
return(
<div className="moreQuestionsContainer">
{


    this.questionList.slice(3,this.questionList.length).map((question,index)=>{
    return(
      <div onClick={()=> this.questionClicked(question)} className="question">
    <span>{question}</span>
    </div>
    )
    
    
    })
          
              

}
  
</div>



)
  
  }

}
questionWritingCompleted = ()=>{
  this.updateHistory(this.state.selectedQuestion,"You",false)
 this.setState({showTypingMessage:true,botAnswering:true})
 setTimeout(this.replyFromBot,1500)
 


}
answerDelay = (delay)=>{
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });



}
 replyFromBot = async  ()=>{




var questionIndexToReply = this.questionList.indexOf(this.state.selectedQuestion)
for (var i=0; i<this.questionAnswers[questionIndexToReply].answers.length; i++) {
    var answer = this.questionAnswers[questionIndexToReply].answers[i];
    this.updateHistory(answer,"Last Peony",true)
    this.setState({showTypingMessage:true})
var delay =  Math.floor(Math.random()*(8000-6500+1)+6500);

    await this.answerDelay(delay)
  


}
this.updateHistory("What else would you like to know about me?","Last Peony",true)
this.setState({showTypingMessage:false,botAnswering:false,questionSelected:false})



}


renderUserTyping = ()=>{
if(this.state.questionSelected && this.state.showTypingMessage == false && this.state.botAnswering == false){
  return(
    <div>
<Typist avgTypingDelay={70} onTypingDone={this.questionWritingCompleted}>
<span style={{fontSize:"15px"}}>{this.state.selectedQuestion}</span>
            </Typist>

    </div>
  )
}


}
closeWindow = ()=>{



}

//chatBotWindowContainer
  render(){
  if(isMobile){
    
      return(
        <div className={this.props.chatBotWindowMinimizedClassSelector()}>

          <div className="chatBotWindowContainer">
     <div className="chatBotWindowToolBar">
     <div style={{display:"flex",alignItems:"center",paddingBottom:"5px",paddingTop:"5px"}}>
     <img width="35px" src="../static/chatbot.png"></img>
     <span style={{fontFamily:"Courier",fontSize:"20px",marginLeft:"5px"}}>ChatBot</span>

     </div>
    <div className="closeMinimize">
<span onClick={()=> this.props.minimizeChatBotWindow()} className="minimize">-</span>
<span onClick={()=> this.props.closeChatBotWindow()} className="closeWindow">×</span>
    </div>
     </div>
     <div className="chatBotWindowContent">
      {this.renderChatHistory()}
       <div ref={el => { this.el = el; }} />

      {this.renderIsTypingMessage()}



     </div>
     <div className="questionContainer">
     {this.renderUserTyping()}
     {this.renderQuestions()}
    {this.renderShowMoreQuestions()}

     </div>
     {this.renderMoreQuestionsContainer()}
    
          </div>
</div>
          
          )
    
  }else{
    return(
      <div className={this.props.chatBotWindowMinimizedClassSelector()}>
      <Draggable>

        <div className="chatBotWindowContainer">
   <div className="chatBotWindowToolBar">
   <div style={{display:"flex",alignItems:"center",paddingBottom:"5px",paddingTop:"5px"}}>
   <img width="35px" src="../static/chatbot.png"></img>
   <span style={{fontFamily:"Courier",fontSize:"20px",marginLeft:"5px"}}>ChatBot</span>

   </div>
  <div className="closeMinimize">
<span onClick={()=> this.props.minimizeChatBotWindow()} className="minimize">-</span>
<span onClick={()=> this.props.closeChatBotWindow()} className="closeWindow">×</span>
  </div>
   </div>
   <div className="chatBotWindowContent">
    {this.renderChatHistory()}
     <div ref={el => { this.el = el; }} />

    {this.renderIsTypingMessage()}



   </div>
   <div className="questionContainer">
   {this.renderUserTyping()}
   {this.renderQuestions()}
  {this.renderShowMoreQuestions()}

   </div>
   {this.renderMoreQuestionsContainer()}
  
        </div>
        </Draggable>
</div>
        
        )
  }
        
    

    



  }




}

