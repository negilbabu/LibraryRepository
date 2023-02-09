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
  result: any;
  rslt = 0;
  val = 0;
  spin = 0;

  ObjForm: FormGroup = new FormGroup({
    sentto: new FormControl('', [Validators.maxLength(50), Validators.required]),
  })

  ObjForgetForm: FormGroup = new FormGroup({
    otp: new FormControl('', [Validators.maxLength(50), Validators.required]),
    email: new FormControl()
  })

  changePasswordForm: FormGroup = new FormGroup({
    newPassword: new FormControl('', [Validators.maxLength(50), Validators.required]),
    cnewPassword: new FormControl('', [Validators.maxLength(50), Validators.required]),
    email: new FormControl()
  })





  email: any;


  constructor(private emails: EmailService,
    private toast: NgToastService,
    private router: Router) { }

  ngOnInit(): void {

    this.ObjForgetForm.reset()
    this.spin = 0;
    this.val = 0;

    if (this.rslt == 1) {
      this.toast.error({ detail: 'OTP Sent Failed :(', summary: 'Unregistered Email Detected ', duration: 5000, position: 'tr' })
      setTimeout(() => {
        this.ObjForm.reset()
        this.rslt = 0;
        this.val = 0;
      }, 3000);


    }

  }

  Login() {
    this.router.navigate(['/login'])
  }


  closePopup() {
    this.displayStyle = "none";
    this.ObjForgetForm.reset()
    this.changePasswordForm.reset()
  }

  openSuccess() {
    this.toast.success({ detail: 'OTP Sent Success', summary: 'OTP Has been Sent to your mail', duration: 5000, position: 'tr' })
  }


  openPopup() {

    if(this.ObjForm.valid){

    this.val = 1;
    this.spin = 1;
    this.email = this.ObjForm.value.sentto;
    this.emails.sendotp(this.ObjForm.value).subscribe((result => {
      console.log("rss",result)
      this.rslt = 2;
      this.spin = 0;
      this.openSuccess();
    }),
      (error) => {

        if (error.status == 412) {
          this.spin = 0;
          this.val = 0;
          this.rslt = 1;
          this.ngOnInit()
        }

        else if (error.status == 400) {
          this.rslt = 0;
          this.spin = 0;
          this.toast.error({ detail: 'OTP Sent Failed :(', summary: 'Fill the fields', duration: 5000, position: 'tr' })
          this.ngOnInit()
        }

        else if (error.status == 422) {
          this.toast.error({ detail: 'OTP Sent Failed :(', summary: 'Unable to process OTP Generation right Now', duration: 5000, position: 'tr' })
          this.ngOnInit()
        }


      });

    this.displayStyle = "block";
    }
    else{
      this.toast.error({ detail: 'OTP Sent Failed :(', summary: 'Email cannot be null', duration: 5000, position: 'tr' })  
    }
  }

  //verify otp
  Otp() {

    if(this.ObjForgetForm.valid){

    this.ObjForgetForm.value.email = this.email;
    this.emails.verify(this.ObjForgetForm.value).subscribe({
      next: (result: any) => {
        this.val = 2;
        this.toast.success({ detail: 'OTP', summary: 'Please Change Password', duration: 10000, position: 'tr' })

      },
      error: (Response: any) => {
           if (Response.status == 400) {
          this.toast.warning({ detail: 'Failed', summary: 'Please Fill in the fields', duration: 5000, position: 'tr' })
        }
        else if (Response.status == 406) {
          this.toast.error({ detail: 'Failed', summary: 'OTP VERIFICATION FAILED', duration: 5000, position: 'tr' })
        }
        else if (Response.status == 504) {
          this.toast.error({ detail: 'Failed', summary: 'OTP EXPIRED', duration: 5000, position: 'tr' })
        }
      }
    })
  }
  else{
    this.toast.warning({ detail: 'Failed', summary: 'Please Fill in the fields', duration: 5000, position: 'tr' })
  }
}




  ChangePassword() {

    if(this.changePasswordForm.valid){

    this.changePasswordForm.value.email = this.email;
    this.emails.verifyPassword(this.changePasswordForm.value).subscribe({
      next: (result: any) => {
        this.toast.success({ detail: 'Password Changed Successfully', summary: ' Please Login', duration: 10000, position: 'tr' })
        this.router.navigate(['/login'])
      },
      error: (Response: any) => {
         if (Response.status == 400) {
          this.toast.warning({ detail: 'Failed to change password', summary: 'INTERNAL SERVER ERROR', duration: 10000, position: 'tr' })
        }
        else if (Response.status == 417) {
          this.toast.warning({ detail: 'Failed', summary: 'Password missmatch', duration: 10000, position: 'tr' })
        }
    
      }

    })

  }
  else{
    this.toast.warning({ detail: 'Validation Failed', summary: 'Please Fill up the fields', duration: 10000, position: 'tr' })
  }

}


}
