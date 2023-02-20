
import { Component, HostListener } from '@angular/core';
import { MessageService } from '../message.service';
// import {MessageService} from './message.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent  {
  title = 'websocket-frontend';
  input:any;
  constructor(public messageService: MessageService) {}
  sendMessage(message:any) {
    if (this.input) {
      this.messageService.sendMessage(this.input);
      this.input = '';
    }
  }

  // @HostListener('document:keydown', ['$event'])
  // handleKeyboardEvent(event: KeyboardEvent) {
  //   if (event.key === 'Enter') {
  //     this.sendMessage();
  //   }
  // }
}
 



