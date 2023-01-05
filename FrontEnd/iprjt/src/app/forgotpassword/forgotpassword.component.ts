import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  displayStyle: any;


  ObjForm:FormGroup=new FormGroup({
    sentto:new FormControl('',[Validators.maxLength(50),Validators.required]),
  })

  ObjForgetForm:FormGroup=new FormGroup({
    otp:new FormControl('',[Validators.maxLength(50),Validators.required]),
    newPassword:new FormControl('',[Validators.maxLength(50),Validators.required]),
    cnewPassword:new FormControl('',[Validators.maxLength(50),Validators.required]),
    email:new FormControl()
  })
  email: any;


  
  constructor(  private emails:EmailService,
    private toast:NgToastService) { }

  ngOnInit(): void {
  }


//verify otp
  SaveData() {
    this.ObjForgetForm.value.email=this.email;
    console.log(this.ObjForgetForm.value.email);
    this.emails.verify(this.ObjForgetForm.value).subscribe(result=>{

      alert("password has been Updated")
    })

    
  }


  //send otp
  openPopup() {
    this.email=this.ObjForm.value.sentto;
    
    this.emails.sendotp(this.ObjForm.value).subscribe(result=>{

     console.log(result);

     if(result==null){
      alert("mail id is not registered")
      window.location.reload()
     }
      
    })
    this.openSuccess();
    this.displayStyle = "block";
    
  }
  closePopup() {
    this.displayStyle = "none";
  }

  openSuccess(){
    this.toast.success({detail:'OTP Sent Success',summary:'Otp Has been Sent to your mail', duration:5000,position:'tr'})
    }

}
