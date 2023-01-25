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
  val=0;
  spin=0;

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
    
    this.ObjForgetForm.reset()
    this.spin=0;


    if(this.rslt==1){
         this.toast.error({detail:'OTP Sent Failed :(',summary:'Unregistered Email Detected ', duration:5000,position:'tr'}) 
      setTimeout(() => {
        this.ObjForm.reset()   
        this.rslt=0;
        this.val=0;
    }, 3000);   
     
   
    }
    
  }

  Login()
  {
    this.router.navigate(['/login'])
  }

  


//verify otp
  SaveData() {



    this.ObjForgetForm.value.email=this.email;
    
    if(this.ObjForgetForm.value.otp==null ) {
      this.toast.warning({detail:'OTP =required',summary:'Please Enter 1 valid OTP', duration:10000,position:'tr'}) 
    }
    if(this.ObjForgetForm.value.newPassword==null ) {
      this.toast.warning({detail:' Password required',summary:'Please 1 EnternewPassword', duration:10000,position:'tr'}) 
    }

    
     if(this.ObjForgetForm.value.newPassword==this.ObjForgetForm.value.cnewPassword){    
    this.emails.verify(this.ObjForgetForm.value).subscribe({
      next:(result:any)=>{
        
      
        this.toast.success({detail:'password changed',summary:'Please Login', duration:10000,position:'tr'})
        this.router.navigate(['/login'])

    
    },
    error: (Response: any) => {
      console.log(Response)
      if(Response.status==400){
        this.toast.warning({detail:'Failed',summary:'Please Enter valid OTP', duration:10000,position:'tr'})
      }
      
      this.toast.warning({detail:'Failed',summary:'OTP Expired', duration:10000,position:'tr'})
    }
    
  })
  }

  else{
  this.toast.warning({detail:'Password Mismatch',summary:'Please Enter valid password', duration:10000,position:'tr'})
   
  
  }

    
  }


  //send otp
  openPopup() {
    
    if(this.ObjForm.valid!==true){

      this.toast.warning({detail:'Warning',summary:'Please provide email ', duration:5000,position:'tr'}) 
      this.val=0
  }
  else{
    this.val=1;
    this.spin=1;
    console.log("val=",this.val)
    console.log("spin=",this.spin)
    this.email=this.ObjForm.value.sentto;    
    this.emails.sendotp(this.ObjForm.value).subscribe((result=>{
      this.rslt=2;
      this.spin=0;
    this.openSuccess();     
    console.log("msg=",result)
    }),
    (error)=>{
// console.log("in err-",error.status)
//      if(error.status===406){    
        this.rslt=1;      
        this.ngOnInit()
    //  }
     

    });
    
    
  }

   this.displayStyle = "block";
    
  }
  closePopup() {
    this.displayStyle = "none";
    this.ObjForgetForm.reset()

  }

  openSuccess(){
    this.toast.success({detail:'OTP Sent Success',summary:'OTP Has been Sent to your mail', duration:5000,position:'tr'})
    }

}
