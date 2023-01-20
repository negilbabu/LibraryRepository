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
  constructor(private router:Router ,private service:UserserviceService,private toast : NgToastService) { }
  
  
  
  ObjSampleForm:FormGroup=new FormGroup(
    { 
      firstName:new FormControl('',[Validators.required]),
      lastName:new FormControl('',[Validators.required]),
      dob:new FormControl('',[Validators.required]),
      address:new FormControl('',[Validators.required]),
      phone:new FormControl('',[Validators.required]),
     // role:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required]),
    
      
    }
  )

  ngOnInit(): void {
    this.date = new Date();
  }


  onSubmit(){


   if(this.ObjSampleForm.valid){
     this.var=this.ObjSampleForm.value
      this.service.add(this.ObjSampleForm.value).subscribe(result=>{
        if(result.userId){  
          console.log("bbb");
          console.log(result);
          alert("User added");
          this.router.navigate(['/login'])
        }
        else{
          alert("User Not added");
        }
      },
      (error: any) =>{
        this.toast.error({detail:'User Registration Failed',summary:'Email Already Registered',duration:5000});
        console.log(error)});    
      
      
    }
    else{   
      this.toast.error({detail:'User Registration Failed',summary:'Fill up the fields',duration:2000});
         }


   }


   

   Login()
   {
     this.router.navigate(['/login'])
   }

  // clear(){
  //   // window.location.reload()
  //   this.ObjSampleForm.reset()
  // }




}





// <div class="body"></div>
// <div class="grad"></div>
// <div class="header">
//     <div>Lib<span>rary</span></div>
// </div>
// <br>

// <form [formGroup]="loginForm" class="login">
//     <span><mat-icon style="color:#c99f14">library_books</mat-icon> <Label style="color: #dddbd5">LIB</Label><Label style="color: #c99f14">RARY</Label></span> 
   
//    <br>
//     <input type="email" placeholder="email" formControlName="email"><br>

//     <span class="text-danger"   class="text-danger" *ngIf="loginForm.controls['email'].touched && loginForm.hasError('required','email')"><small>Email is required</small>
//     </span>
    
    
//         <input type="password" class="text-danger1" placeholder="password" formControlName="password" name="password" pattern='(?=.*\d)(?=.*[a-z])(?=.*[#$@!%&*?])(?=.*[A-Z]).{8,}' minlength="8" required> 
//         <span class="text-danger"   *ngIf="loginForm.controls['password'].touched && loginForm.hasError('required','password')"><small>pswd is required</small></span>            
//         <span class="text-danger" *ngIf=" loginForm.hasError('pattern','password')"><small>use alphanumeric & special characters &nbsp;</small></span> 
//         <span class="text-danger" *ngIf="loginForm.controls['password'].touched && loginForm.hasError('minlength','password')"><small>minimum 8 character</small></span>   
//          <br><br>                
    
//     <!-- <input type="password" placeholder="password" formControlName="password"
//         pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"><br>

//         <span class="text-danger"   class="text-danger" *ngIf="loginForm.controls['password'].touched && loginForm.hasError('required','password')"><small>password is required<br>use (uppercase ,lowercase and numbers)<br>minimum 8 character</small>
//             </span> -->
  
//     <input type="button" value="Login" (click)="login()" [disabled]="!loginForm.valid">
//     <input type="button" value="Register" routerLink="/user-reg">  
//      <a href="forgotpassword"  >Forgot_Password </a>
// </form>
