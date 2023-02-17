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
  baseUrl=environment.apiUrl;

  constructor() {
    // this.initializeWebSocketConnection();
}
stompClient?: Stomp.Client;
public msg = [];
// initializeWebSocketConnection() {

//   const serverUrl = environment.apiUrl;
//   console.log(serverUrl);


//   const ws = new SockJS(serverUrl);
//   this.stompClient = Stomp.over(ws);
//   const that = this;


  // tslint:disable-next-line:only-arrow-functions
//   this.stompClient.connect({}, function(frame) {
//     this.stompClient!.subscribe('/message', (message) => {
//       if (message.body) {
//         that.msg.push(message.body);
//       }
//     });
//   });
// }

// sendMessage(message) {
//   this.stompClient.send('/app/send/message' , {}, message);
// }
}
