import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChatServiceService } from '../chat-service.service';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {
  data1: any;
  id=0;
  user: any;
  senderId: any;
  name: any;


  result: any;
  count: any;
  userdata: any;
  noValue=0;
  send() {
    throw new Error('Method not implemented.');
    }
      data: any;
      val:any="active";
    searchData: any;
    senders: any;
    userextra: any;
    chats: any;
    receiver: any;

    
  constructor(private cht:ChatServiceService,
    private service:UserserviceService
    ) { }


    searchForm: FormGroup = new FormGroup({
      inp: new FormControl()
    })

    chatForm: FormGroup= new FormGroup({
      content:new FormControl('',[Validators.maxLength(50),Validators.required]),
      receiver:new FormControl('',[Validators.required]),
    })


 ngOnInit(): void {

this.LoadUser()
this.CurrentUser();
  }

  LoadUser(){
    this.service.Load().subscribe(data=>{
      this.data=data
      console.log("LoadUser",data);
      console.log(this.data[0].firstName);
      
    })
  }

  CurrentUser(){
    this.cht.loadcuruser().subscribe(result=>{
      this.user=result;
      console.log("rslt",this.user.role)

    })
      
 
  }



  call(data:any){
    console.log("selected user to chat = ",data.userId);
    this.id=data.userId;
        
    this.cht.LoadChat( this.id).subscribe(result=>{
      this.data1=result
      console.log(" chat = ",result);
      console.log(" chat = ",this.data1);
    })
    this.name=data.firstName;    
}
clickk(event:any){
  console.log("hereee");
  if(event.keyCode===13){
    console.log("hereee");
    
this.chatmsg();
  }

}

chatmsg(){
  // this.chatForm.value.senderId=this.senderId;
  this.chatForm.value.receiver=this.id
  console.log("form=",this.chatForm.value)
  this.cht.sendchat(this.chatForm.value).subscribe(result=>{
    console.log("rslt",result)
    this.chatForm.reset()
    this.call1(this.id)
  })
  // window.location.reload();
  this.call1(this.id)
}

call1(id:any){
      
  this.cht.LoadChat( this.id).subscribe(result=>{
    this.data1=result

  })
   
}

Search(key:any) {
  console.log("key-",key);
  
  this.service.searchUser(key).subscribe(result => {
    this.result = result;
    console.log("user-=",result);  
     this.data = this.result;

console.log("-----",this.result.length);

    if (this.result.length == 0) {
      
      this.noValue = 1; 
      console.log("---inside if--",this.noValue);       
    }
    else{
      this.noValue = 0; 
    }
  });

}

}
