import { Injectable } from '@angular/core';
import { ChatComponent } from './chat/chat.component';
import { ChatMessageDto } from './models/ChatMessageDto';

@Injectable({
  providedIn: 'root'
})
export class WebSoketService {

 

  webSocket!: WebSocket;
  chatMessages:ChatMessageDto[]=[];
  roomName=localStorage.getItem('room_name')


  constructor() { }

  public openwebSocket(){
    console.log("roooom",this.roomName);
    

    this.webSocket=new WebSocket(
      'ws://'
     // + window.location.host
      + '127.0.0.1:8000'
      + '/ws/chat/'
      + localStorage.getItem('room_name')
      + '/'

      //'ws://127.0.0.1:8001/ws/chat/g/'
      
  );
 


  this.webSocket.onopen=(event)=>{
    console.log("connection open ",event);
    
  };

  this.webSocket.onmessage=(event)=>{
    const chatMessageDto= JSON.parse(event.data) 
    this.chatMessages.push(chatMessageDto);
    
  };

  this.webSocket.onclose=(event)=>{
    console.log("connection close",event);
    

  };

  
  }


  public sendMessage(chatMessageDto:ChatMessageDto){
    this.webSocket.send(JSON.stringify(chatMessageDto));
  }

  public closeWebsocket(){
    this.webSocket.close
  }
}