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


    if(this.rslt==1){
         this.toast.error({detail:'OTP Sent Failed :(',summary:'Unregistered Email Detected ', duration:5000,position:'tr'}) 
      setTimeout(() => {
        this.ObjForm.reset()   
        this.rslt=0;
        this.val=0;
    }, 3000);   
      // this.rslt=0;
   
    }
    
  }

  Login()
  {
    this.router.navigate(['/login'])
  }

  


//verify otp
  SaveData() {

    // if(this.ObjForgetForm.valid!==true){

    this.ObjForgetForm.value.email=this.email;
    console.log(this.ObjForgetForm.value.email);



    if(this.ObjForgetForm.value.otp==null ) {
      this.toast.warning({detail:'OTP =required',summary:'Please Enter valid OTP', duration:10000,position:'tr'}) 
    }
    if(this.ObjForgetForm.value.newPassword==null ) {
      this.toast.warning({detail:' Password required',summary:'Please EnternewPassword', duration:10000,position:'tr'}) 
    }




     
     if(this.ObjForgetForm.value.newPassword==this.ObjForgetForm.value.cnewPassword){    
    this.emails.verify(this.ObjForgetForm.value).subscribe(result=>{
      if(result){
        this.toast.success({detail:'password changed',summary:'Please Login', duration:10000,position:'tr'})
        this.router.navigate(['/login'])
      }
      else{
        this.toast.warning({detail:'Failed',summary:'Please Enter valid OTP', duration:10000,position:'tr'})
      }

    })
  }
  // else if(this.ObjForgetForm.value.otp!=null) {
  //   this.toast.warning({detail:'OTP required',summary:'Please Enterdddd valid OTP', duration:10000,position:'tr'}) 
  // }
  else{
  this.toast.warning({detail:'Password Mismatch',summary:'Please Enter valid password', duration:10000,position:'tr'})
   
  
  }

    // else{
    //   this.toast.warning({detail:'Failed',summary:'Fill Up all Fields', duration:10000,position:'tr'})
    // }
    
  }


  //send otp
  openPopup() {
    
    if(this.ObjForm.valid!==true){
      console.log("hiii");
      this.toast.warning({detail:'Warning',summary:'Please provide email ', duration:5000,position:'tr'}) 
      this.val=0
  }
  else{
    this.val=1;
    this.email=this.ObjForm.value.sentto;    
    this.emails.sendotp(this.ObjForm.value).subscribe((result=>{
      this.rslt=2;
    this.openSuccess();     
    }),
    (error)=>{
console.log(error.status);

     if(error.status==406){    
        this.rslt=1;      
        this.ngOnInit()
     }
     

    });
    
    
  }

    // this.openSuccess();
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
