import { Component } from '@angular/core';
// import { Component } from ‘@angular/core’;
// import { MessagingService } from './messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Library Management System';

  // title = ‘push-notification’;
  message:any;
  // constructor(private messagingService: MessagingService) { }
  constructor() { }
ngOnInit() {
  // this.messagingService.requestPermission()
  // // this.messagingService.receiveMessage()
  // this.message = this.messagingService.currentMessage
 }
}
