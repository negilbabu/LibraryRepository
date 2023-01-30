import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';
import { NgToastModule, NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  responsedata: any;

  constructor(private router:Router, private service:UserserviceService,private toast : NgToastService )
   { 
    }
    loginForm:FormGroup=new FormGroup(
    { 
      email:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required])
      
    }
  )

  ngOnInit(): void {
    localStorage. clear();   
  }


  login(){

    //  if(this.loginForm.valid){
        this.service.login(this.loginForm.value).subscribe(result=>{
          if(result.userId){
            this.responsedata=result
         
            if(result.role==2){
            localStorage.setItem('token',this.responsedata.accessToken.value)        
            this.toast.info({detail:'Hello User ',summary:'LogIn Successfull',duration:5000});        
            this.router.navigate(['/homepage'])
            }
            
            
            else{
              localStorage.setItem('token',this.responsedata.accessToken.value)         
              this.toast.info({detail:'Hello Admin : '+result.firstName,summary:'LogIn Successfull',duration:5000});
              this.router.navigate(['/body'])

            }

          }
          
      
        }, (error: any) =>{
          if(error.status==400){
            this.toast.error({detail:'Login Failed',summary:'Fill Up the Fields',duration:5000});
          }
          else if(error.status==417){
            this.toast.error({detail:'Login Failed',summary:'Username or Password incorrect',duration:5000});
          }
         
           });
        
        
    //  }
     
       
   
  //  else{   
    // this.toast.error({detail:'Login Failed',summary:'Fill up the fields',duration:5000});
      //  }
  }


  onSignUp(){

    this.router.navigate(['/user-reg'])

  }

}