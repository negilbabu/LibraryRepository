import { Component, OnInit } from '@angular/core';
// import { OneSignalService } from 'onesignal-ngx';
// import { OneSignal } from 'onesignal-ngx';

import { OneSignal } from 'onesignal-ngx';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent   {

  title = 'angular-example-app';
  constructor(private oneSignal:  OneSignal) {
      this.oneSignal.init({
          appId: "5ff0a8e6-7397-41fd-9019-d007cc66c85d",
      });
console.log("init");

}

onHandleTag(tag: any) {
  console.log('Tagging');
  this.oneSignal.sendTag("tech", tag).then(() => {
    console.log("Sent tag: " + tag);
  });
}
}
