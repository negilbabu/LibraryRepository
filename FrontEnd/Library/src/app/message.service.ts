import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
// declare var SockJS;
// declare var Stomp;

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';



@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() {
    this.initializeWebSocketConnection();
  }
  // stompClient?: Stomp.Client;
  private stompClient: any;
  public msg = [];

  private initializeWebSocketConnection() {
    const serverUrl = environment.apiUrl;
    console.log(serverUrl);

    const ws = new SockJS(serverUrl+'/socket');
    console.log("sock js ", ws )

    this.stompClient = Stomp.over(ws);
    const that = this;
    console.log(" this.stompClient ", this.stompClient )
    
    this.stompClient.connect({}, function() {
      console.log("----:::::::::::------")
      that.stompClient.subscribe('/message', (message: { body: any; }) => {
        console.log("----:::::::::::------",message)
        if (message.body) {
          // that.msg.push(message.body);
          console.log("----:::::::::::------",message)
        }

      });
    });
  }

  sendMessage(message: any) {
    this.stompClient.send('/app/send/message' , {}, message);
  }
}
