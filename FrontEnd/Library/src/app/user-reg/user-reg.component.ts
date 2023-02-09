import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router,Route } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-user-reg',
  templateUrl: './user-reg.component.html',
  styleUrls: ['./user-reg.component.css']
})
export class UserRegComponent implements OnInit {
[x: string]: any;
date: any;
var:any;
stat=0;
email:any;
  constructor(private router:Router ,private service:UserserviceService,private toast : NgToastService) { }
  
  
  
  ObjSampleForm:FormGroup=new FormGroup(
    { 
      firstName:new FormControl('',[Validators.required]),
      lastName:new FormControl('',[Validators.required]),
      dob:new FormControl('',[Validators.required]),
      address:new FormControl('',[Validators.required]),
      phone:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required]),
      otp:new FormControl('')
    
      
    }
  )

  EmailForm:FormGroup=new FormGroup(
    { 
      sentto:new FormControl('',[Validators.required]), 
      
    }
  )

  ngOnInit(): void {
    this.date = new Date();
    this.email=null;
    this.ObjSampleForm.reset()
  }


  onSubmit(){
console.log("stat=",this.stat)
// console.log("eeee=",this.EmailForm.controls['sento'].value)
    if(this.stat==0){

   if(this.EmailForm.valid){

    // this.var=this.EmailForm.controls['email'].value

     this.service.verifyUser(this.EmailForm.value).subscribe(result=>{
       console.log(result)
       this.stat=1; 
       this.email=this.EmailForm.controls['sentto'].value
       console.log("####",this.email);  
       
       },
     (error: any) =>{
      if(error.status==409){
       this.toast.error({detail:'User Registration Failed',summary:'Email Already Registered',duration:5000});
       }
       else if(error.status==400){
         this.toast.error({detail:'User Registration Failed',summary:'FILL UP ALL FIELDS',duration:5000});
         }
 
     });    
     
     
   }
   else{   
     this.toast.error({detail:'User Registration Failed',summary:'Fill up the fields',duration:2000});
        }

    }

    else if(this.stat==1){
      let body={
        firstName: this.ObjSampleForm.controls['firstName'].value,
        lastName: this.ObjSampleForm.controls['lastName'].value,
        phone: this.ObjSampleForm.controls['phone'].value,
        address: this.ObjSampleForm.controls['address'].value,
        dob: this.ObjSampleForm.controls['dob'].value,
        password: this.ObjSampleForm.controls['password'].value,
        email: "negilbabu001@gmail.com",
        otp:this.ObjSampleForm.controls['otp'].value
      }
      console.log(":::::::::::::::::::",body.email);
      
      // if(this.ObjSampleForm.valid){

     
        this.var=this.ObjSampleForm.value
         this.service.addUser(body).subscribe(result=>{
           console.log(result)
           this.stat=0; 
           this.toast.success({ detail: 'Registraion successfull', summary: 'Please Log In', duration: 5000, position: 'tr' })
           this.email=null;
           this.router.navigate(['/login'])
           },
         (error: any) =>{
          if(error.status==406){
            this.toast.error({ detail: 'Failed', summary: 'OTP VERIFICATION FAILED', duration: 5000, position: 'tr' })
       }
           else if(error.status==400){
             this.toast.error({detail:'User Registration Failed',summary:'FILL UP ALL FIELDS',duration:5000});
             }
             else if (error.status == 504) {
              this.toast.error({ detail: 'Failed', summary: 'OTP EXPIRED', duration: 5000, position: 'tr' })
            }

     
         });    
         
         
      //  }
      //  else{   
      //    this.toast.error({detail:'User Registration Failed',summary:'Fill up the fields',duration:2000});
      //       }
    

    }




   }


   

   Login()
   {
     this.router.navigate(['/login'])
   }




}



