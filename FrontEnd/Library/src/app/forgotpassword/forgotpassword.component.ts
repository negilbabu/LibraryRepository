import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  displayStyle: any;
  result:any;
  rslt=0;
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
    private toast:NgToastService,
    private router:Router) { }

  ngOnInit(): void { 
    console.log('rslt=',this.rslt)
    if(this.rslt==1){
         this.toast.error({detail:'OTP Sent Failed :(',summary:'Unregistered Email Detected ', duration:5000,position:'tr'}) 
      setTimeout(() => {
        window.location.reload()       
    }, 3000);   
      
    }
    
  }

  Login()
  {
    this.router.navigate(['/login'])
  }

//verify otp
  SaveData() {

    // this.toast.success({detail:'OTP  Sent',summary:'Please verify the OTP', duration:10000,position:'tr'})
    this.ObjForgetForm.value.email=this.email;
    console.log(this.ObjForgetForm.value.email);

    if(this.ObjForgetForm.value.newPassword==this.ObjForgetForm.value.cnewPassword){
    
    this.emails.verify(this.ObjForgetForm.value).subscribe(result=>{

      if(result){
        this.toast.success({detail:'psd changed',summary:'Please Login', duration:10000,position:'tr'})
        this.router.navigate(['/login'])
      }
      else{
        this.toast.warning({detail:'Failed',summary:'Please Enter valid OTP', duration:10000,position:'tr'})
      }


      // alert("password has been Updated")
    })
  } 
  else
  this.toast.warning({detail:'Password Mismatch',summary:'Please Enter valid password', duration:10000,position:'tr'})

  }

  //send otp
  openPopup() {
    
    this.email=this.ObjForm.value.sentto;
    
    this.emails.sendotp(this.ObjForm.value).subscribe(result=>{

     console.log(result);

     if(result==null){
     // this.toast.error({detail:'OTP Not Sent',summary:'Unregistered Email Detected', duration:5000,position:'tr'})
        this.rslt=1;
        console.log("reslt in if=",this.rslt)
        // this.router.navigate(['/forgotpassword'])
        this.ngOnInit()
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
