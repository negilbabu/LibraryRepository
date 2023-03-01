import { Injectable } from '@angular/core';

// import { Messaging } from '@angular/fire/messaging';

// import { AngularFireMessaging } from '@angular/fire/messaging';

// import { AngularFireMessaging } from '@angular/fire/compat/messaging';

import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MessagingService {




  // currentMessage = new BehaviorSubject(null);
  // constructor(private angularFireMessaging: AngularFireMessaging) {
  // this.angularFireMessaging.messages.subscribe(
  // (_messaging) => {
  //   console.log(_messaging);
    
  // _messaging.onMessage = _messaging.onMessage.bind(_messaging);
  // _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
  // }
  // )
  // }
  // requestPermission() {
  // this.angularFireMessaging.requestToken.subscribe(
  // (token) => {
  // console.log(token);
  // },
  // (err) => {
  // console.error('Unable to get permission to notify.', err);
  // }
  // );
  // }
  // receiveMessage() {
  // this.angularFireMessaging.messages.subscribe(
  // (payload) => {
  // console.log("new message received. ", payload);
  // this.currentMessage.next(payload);
  // })
  }


































  // currentMessage = new BehaviorSubject(null);

  // constructor(private afMessaging: AngularFireMessaging) {}

  // requestPermission() {
  //   this.afMessaging.requestToken.subscribe(
  //     (token) => {  
  //       currentMessage = new BehaviorSubject(null);

  // constructor(private afMessaging: AngularFireMessaging) {}

  // requestPermission() {
  //   this.afMessaging.requestToken.subscribe(
  //     (token) => {
  //       console.log('Permission granted! Save to server!', token);
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }

  // receiveMessage() {
  //   this.afMessaging.onMessage((payload) => {
  //     console.log('Message received. ', payload);
  //     this.currentMessage.next(payload);
  //   });
  // }
  //       console.log('Permission granted! Save to server!', token);
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }

  // receiveMessage() {
  //   this.afMessaging.onMessage((payload) => {
  //     console.log('Message received. ', payload);
  //     this.currentMessage.next(payload);
  //   });
  // }
// currentMessage = new BehaviorSubject(null);

// constructor(private messaging: Messaging) {}

// requestToken() {
//   this.messaging.requestToken.subscribe(
//     (token) => {
//       console.log('Token received:', token);
//     },
//     (error) => {
//       console.error('Error getting token:', error);
//     }
//   );
// }


// }







// this.angularFireMessaging.messaging.subscribe(
// (_messaging) => {
// _messaging.onMessage = _messaging.onMessage.bind(_messaging);
// _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
// }
// )
// }



// requestPermission() {
// this.angularFireMessaging.requestToken.subscribe(
// (token) => {
// console.log(token);
// },
// (err) => {
// console.error('Unable to get permission to notify.', err);
// }
// );
// }


// receiveMessage() {
// this.angularFireMessaging.messages.subscribe(
// (payload) => {
// console.log("new message received. ", payload);
// this.currentMessage.next(payload);
// })
// }



// }