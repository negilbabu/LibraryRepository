import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { EmailService } from '../email.service';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-restpassword',
  templateUrl: './restpassword.component.html',
  styleUrls: ['./restpassword.component.css']
})
export class RestpasswordComponent implements OnInit {
  password: any;
  spin=0;
  rslt=0;
  displayStyle: any;
  val=0;

  constructor(private userService: UserserviceService,
    private toast: NgToastService,
    private router: Router) { }

  ngOnInit(): void {
    // this.ObjForm.reset();
  // this.changePasswordForm.reset();

    this.spin = 0;
    this.rslt=0;
  }

  ObjForm: FormGroup = new FormGroup({
    oldPassword: new FormControl('', [Validators.maxLength(50), Validators.required]),
  })

  changePasswordForm: FormGroup = new FormGroup({
    newPassword: new FormControl('', [Validators.maxLength(50), Validators.required]),
    cnewPassword: new FormControl('', [Validators.maxLength(50), Validators.required]),

  })

  openPopup() {

    if(this.ObjForm.valid){

 
    this.spin = 1;
    this.password = this.ObjForm.value.oldPassword;
    this.userService.sendotp(this.ObjForm.value).subscribe((result => {
       this.spin = 0;
       this.rslt=1;
       this.toast.success({ detail: 'Verification Success', summary: 'Please reset your password', duration: 5000, position: 'tr' })
    }),
      (error) => {
        this.spin = 0;
        if (error.status == 412) {
               
          this.ngOnInit()
        }
        if (error.status == 417) {
          this.spin=0;
          this.rslt=0;
          this.val=0;
        
          this.toast.warning({ detail: 'Failed', summary: 'Password Mismatch', duration: 5000, position: 'tr' }) 
          
          // this.ngOnInit()
          
        }
        window.location.reload()
      });

      this.displayStyle = "block";

}
else{
  this.toast.error({ detail: 'Change Password Failed :(', summary: 'Old password cannot be null', duration: 5000, position: 'tr' })  
}
}

closePopup() {
  this.displayStyle = "none";
  this.changePasswordForm.reset()
}


ChangePassword() {

  if(this.changePasswordForm.valid){

  // this.changePasswordForm.value.email = this.email;
  this.userService.verifyPassword(this.changePasswordForm.value).subscribe({
    next: (result: any) => {
      this.toast.success({ detail: 'Password Changed Successfully', summary: ' ', duration: 5000, position: 'tr' })
      this.router.navigate(['/view-adminprofile'])
    },
    error: (Response: any) => {
       if (Response.status == 400) {
        this.toast.warning({ detail: 'Failed to change password', summary: 'INTERNAL SERVER ERROR', duration: 5000, position: 'tr' })
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
