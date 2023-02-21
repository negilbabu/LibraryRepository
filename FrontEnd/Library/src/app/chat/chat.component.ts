
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


  userList: any;
  // otherUser?: User;
  // thisUser: User = JSON.parse(sessionStorage.getItem('user')!);
  otherUser=7;
  thisUser=5;
  url:any;

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
        this.getUserData();
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
    // const id1 = this.thisUser;
    // const nick1 = this.thisUser;
    // const id2 = this.otherUser;
    // const nick2 = this.otherUser;
    // this.url = 'http://localhost:8082';
    // if (id1 > id2) {
    //   this.channelName = nick1 + '&' + nick2;
    // } else {
    //   this.channelName = nick2 + '&' + nick1;
    // }
    // // this.loadChat();                                            //to load previous chat
    // // console.log('connecting to chat...');

    // this.socket = new SockJS(this.url + '/chat');
    // this.stompClient = Stomp.over(this.socket);

  
  
    //    this.stompClient.connect({}, (frame) => {
    //   console.log('--------------------connected' );
    //   //func = what to do when connection is established
    //   console.log('connected to: ' + frame);
    //   this.stompClient!.subscribe('/topic/messages/' + this.channelName,(response) => {
    //       //func = what to do when client receives data (messages)
    //       // this.loadChat();
          
    //     }
    //   );
    // });
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


  onNoClick(){
    // this.dialoge.closeAll()
  }
  getUserData() {
    // this.service.userlistChat(localStorage.getItem('user_id')).subscribe({
    //   next: (response: any) => {
    //     this.userList = response
    //     this.count = response.count;
    //     console.log("res", response);
    //   },
    //   error: (error: any) => {
    //     console.log('Error', error);
    //     alert('Error');
    //   },
    // });
  }


}
