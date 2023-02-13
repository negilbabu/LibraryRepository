import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  title = 'angular-google';
  user:any;
  loggedIn:any;
  idToken:any;
  constructor(private authService: SocialAuthService,
    private userService: UserserviceService,
    private router:Router,
    private toast : NgToastService 
    ) {
    

     }

     googleForm:FormGroup=new FormGroup(
      { 
        idToken:new FormControl('',[Validators.required]), 
        
      }
    )

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.googleSign(user);

  
    });
  }

  googleSign(user:any){
  
    console.log("googleSignIn:",user)
    // this.idToken=user.idToken;

    let body={
      idToken: user.idToken
    }
    console.log("body here:",body)
      this.userService.googleSignIn(body).subscribe(result=>{           
                
      this.router.navigate(['/login'])
    
      }, (error: any) =>{
       alert("aaaaaaa aaaa aaa ")
       
         });


  }


}
