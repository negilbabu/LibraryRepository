import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { SocialAuthService } from '@abacritt/angularx-social-login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'angular-google';
  user: any;
  loggedIn: any;
  idToken: any;

  responsedata: any;
  state: any;

  constructor(private router: Router,
    private service: UserserviceService,
    private toast: NgToastService,
    private authService: SocialAuthService
  ) {
  }
  loginForm: FormGroup = new FormGroup(
    {
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])

    }
  )

  googleForm: FormGroup = new FormGroup(
    {
      idToken: new FormControl('', [Validators.required]),

    }
  )

  ngOnInit(): void {
    localStorage.clear();

    this.state = this.authService.authState
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.googleSign(user);


    });
  }

  googleSign(user: any) {


    let body = {
      idToken: user.idToken
    }
//token to backend
    this.service.googleSignIn(body).subscribe(result => {
      this.toast.success({ detail: 'User Registration Success', summary: 'Please update your profile', duration: 5000 });

      this.responsedata = result


      if (this.responsedata.role == 2) {
        localStorage.setItem('token', this.responsedata.accessToken.value)
        localStorage.setItem('email', this.responsedata.email.value)
        this.toast.info({ detail: 'Hello User ', summary: 'LogIn Successfull', duration: 5000 });
        this.router.navigate(['/homepage'])
      }


      else {
        localStorage.setItem('token', this.responsedata.accessToken.value)
        localStorage.setItem('email', this.responsedata.email.value)
        this.toast.info({ detail: 'Hello Admin : ' + this.responsedata.firstName, summary: 'LogIn Successfull', duration: 5000 });
        this.router.navigate(['/body'])

      }

      // this.router.navigate(['/login'])

    }, (error: any) => {
      if (error.status == 409) {
        this.toast.info({ detail: 'User Already Registered', summary: 'Log In', duration: 5000, position: 'tr' })
        this.router.navigate(['/login'])
      }

    });


  }


  login() {

    if (this.loginForm.valid) {
      this.service.login(this.loginForm.value).subscribe(result => {

        localStorage.setItem('email', result.email.value)
        if (result.userId) {
          this.responsedata = result
  
          if (result.role == 2) {
            localStorage.setItem('token', this.responsedata.accessToken.value)
            localStorage.setItem('email', this.responsedata.email.value)
            this.toast.info({ detail: 'Hello User ', summary: 'LogIn Successfull', duration: 5000 });
            this.router.navigate(['/homepage'])
          }


          else {
   
            localStorage.setItem('token', this.responsedata.accessToken.value)
          
            this.toast.info({ detail: 'Hello Admin : ' + result.firstName, summary: 'LogIn Successfull', duration: 5000 });
            this.router.navigate(['/body'])

          }

        }


      }, (error: any) => {
        if (error.status == 400) {
          this.toast.error({ detail: 'Login Failed', summary: 'Fill Up the Fields', duration: 5000 });
        }
        else if (error.status == 417) {
          this.toast.error({ detail: 'Login Failed', summary: 'Username or Password incorrect', duration: 5000 });
        }

      });


    }

    else {
      this.toast.error({ detail: 'Login Failed', summary: 'Fill up the fields', duration: 5000 });
    }
  }



}