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
  }


  login(){

    //  if(this.ObjSampleForm.valid){
        this.service.login(this.loginForm.value).subscribe(result=>{
          if(result.userId){
            this.responsedata=result
            console.log(result);

            if(result.role==2){
            localStorage.setItem('token',this.responsedata.accessToken.value)        
            this.toast.info({detail:'success msg',summary:'LogIn Successfull',duration:5000});        
            this.router.navigate(['/user-sidenav'])
            }
            
            
            else{
              localStorage.setItem('token',this.responsedata.accessToken.value)         
              this.toast.info({detail:'success msg',summary:'LogIn Successfull',duration:5000});
              this.router.navigate(['/sidenav'])

            }

          }
          
          else{
            //alert("login not sucessful");
            this.toast.warning({detail:'success msg',summary:'LogIn failed',duration:5000});
          }
        })
    //  }
     
       
   // }
   // else{   
   //       return;
     //   }
  }


  onSignUp(){

    this.router.navigate(['/user-reg'])

  }

}
