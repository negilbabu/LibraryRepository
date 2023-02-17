// import { Component, OnDestroy, OnInit } from '@angular/core';
// import {WebSoketService} from '../web-soket.service';
// import {ChatMessageDto} from '../models/ChatMessageDto';
// import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-chat',
//   templateUrl: './chat.component.html',
//   styleUrls: ['./chat.component.css']
// })
// export class ChatComponent implements OnInit, OnDestroy {
//   userList: any;
//   count: any;
//   user_id: any;
//   user_name: any;
//   sender: number = 0;
//   receiver: number = 0;
//   room_name: string = '';
//   sent: string = ""
//   receiver_name: any;
//   MessageList: any = [];
//   selected = false
//   sender_name: any;
//   unreadMessageList: any;
//   userListunreadMessageList: any;
//   usercontactList: any;
//   scroll_flag = false;

//   posts:any;

//   constructor(public webSocketService: WebSoketService) { }

//   chatform: FormGroup = new FormGroup({
//     message: new FormControl("", [Validators.required]),
//   });
//   ngOnInit(): void {
//   }

//   ngOnDestroy(): void {
//     this.webSocketService.closeWebsocket();
//   }

//   // sendMessage() {
//   //   const chatMessageDto = new ChatMessasageDto(this.sender_name, this.chatform.value.message, this.room_name, this.user_name, this.user_id)
//   //   this.websocketservice.sendMessage(chatMessageDto);
//   //   console.log("msg", chatMessageDto);
//   //   this.chatform.reset()
//   // }
  
//   sendMessage() {
//     const chatMessageDto = new ChatMessageDto(this.sender_name, this.chatform.value.message, this.room_name, this.user_name, this.user_id)
//     this.webSocketService.sendMessage(chatMessageDto);
//     console.log("msg", chatMessageDto);
//     this.chatform.reset()
//   }

// }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// import * as Stomp from '@stomp/stompjs';
// import * as SockJS from 'sockjs-client';

// import * as Stomp from 'stompjs';
// import * as SockJS from 'sockjs-client';

// import * as Stomp from 'stompjs';
// import * as SockJS from 'sockjs-client';



import { Component, ElementRef, OnInit, AfterViewChecked} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable,  of } from 'rxjs';


import { UserserviceService } from '../userservice.service';


// import { Messaggio } from '../model/messaggio';
// import { User } from '../model/user';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-chat-',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit{
  url = 'http://localhost:8080';
  // otherUser?: User;
  // thisUser: User = JSON.parse(sessionStorage.getItem('user')!);
  otherUser=7;
  thisUser=5;

  channelName?: string;
  socket?: WebSocket;
  stompClient?: Stomp.Client;
  newMessage = new FormControl('');
// chatform: FormGroup<any>;

chatform: FormGroup = new FormGroup<any>({
  message: new FormControl('', [Validators.maxLength(500), Validators.required]),

})
  // messages?: Observable<Array<Messaggio>>;

  constructor(
    private route: ActivatedRoute,
    private userService: UserserviceService,
    private http:HttpClient,
    private el: ElementRef) {}


  ngOnInit(): void {
    // this.userService.getUserByNickname(this.route.snapshot.paramMap.get('user')!)
    //   .subscribe((data) => {
    //     this.otherUser = data;

        this.connectToChat();
      //   console.log(this.el)
      //   this.el.nativeElement.querySelector("#chat").scrollIntoView();
      // });
  }

  // ngAfterViewChecked(): void {
  //   this.scrollDown();
  // }

  // scrollDown(){
  //   var container = this.el.nativeElement.querySelector("#chat");
  //   container.scrollTop = container.scrollHeight;
  // }

  connectToChat() {
    const id1 = this.thisUser;
    const nick1 = this.thisUser;
    const id2 = this.otherUser;
    const nick2 = this.otherUser;

    if (id1 > id2) {
      this.channelName = nick1 + '&' + nick2;
    } else {
      this.channelName = nick2 + '&' + nick1;
    }

    // this.loadChat();                                            //to load previous chat
    console.log('connecting to chat...');

    this.socket = new SockJS(this.url + '/chat');
    this.stompClient = Stomp.over(this.socket);

    this.stompClient.connect({}, (frame) => {
      //func = what to do when connection is established
      console.log('connected to: ' + frame);
      this.stompClient!.subscribe(
        '/topic/messages/' + this.channelName,
        (response) => {
          //func = what to do when client receives data (messages)
          // this.loadChat();
        }
      );
    });
  }

  sendMessage() {
    // if (this.newMessage.value !== '') {
      this.stompClient!.send('/app/chat/' + this.channelName,{},
        JSON.stringify({sender: this.thisUser,t_stamp: 'to be defined in server', content: this.chatform.value.message,
        })
      );
      this.chatform.reset()

      this.newMessage.setValue('');
    // }
  }

  // loadChat(){
  //   this.messages = this.http.post<Array<Messaggio>>(this.url+'/getMessages' ,  this.channelName);
  //   this.messages.subscribe(data => {
  //     let mgs:Array<Messaggio> = data;
  //     mgs.sort((a, b) => (a.ms_id > b.ms_id) ? 1 : -1)
  //     this.messages = of(mgs);
  //   })
  //   console.log(this.messages);
  // }

  whenWasItPublished(myTimeStamp: string) {
    const endDate = myTimeStamp.indexOf('-');
    return (
      myTimeStamp.substring(0, endDate) +
      ' at ' +
      myTimeStamp.substring(endDate + 1)
    );
  }

}
