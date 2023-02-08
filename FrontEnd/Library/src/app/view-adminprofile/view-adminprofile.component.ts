import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-view-adminprofile',
  templateUrl: './view-adminprofile.component.html',
  styleUrls: ['./view-adminprofile.component.css']
})
export class ViewAdminprofileComponent implements OnInit {


  userdata: any;
  role: any;
  rslt=0;
  val=0;
  displayStyle: any;
    constructor(private router:Router, private toast : NgToastService,private service:UserserviceService) {
     }

     ObjSampleForm:FormGroup=new FormGroup(
      { 
        firstName:new FormControl('',[Validators.required]),
        lastName:new FormControl('',[Validators.required]),
        dob:new FormControl('',[Validators.required]),
        address:new FormControl('',[Validators.required]),
        phone:new FormControl('',[Validators.required]),
        password:new FormControl('',[Validators.required]),
        email:new FormControl('',[Validators.required]),
      
        
      }
    )
  
    ngOnInit(): void {
  
      
      this.Load();
    }

  
    Load() {
      this.service.getAdmin().subscribe((data: any)=>{
      this.userdata=data;
      });  }  


      EditProfile() {

      this.rslt=2;
      this.displayStyle = "block";
        }


  closePopup() {
  this.displayStyle = "none";
  this.ObjSampleForm.reset();
  this.rslt=0;
        }
        
  
      openPopup() {

      // if(this.ObjSampleForm.valid){

         this.service.currentUserProfileEdit(this.ObjSampleForm.value).subscribe(result=>{
           if(result.userId){  
             this.toast.success({detail:'User Profile Successfully',duration:5000});
             this.router.navigate(['/view-adminprofile'])
             console.log(result)
           }
           else{
             alert("User Not added");
           }
         },
         (error: any) =>{
       
        if(error.status==400){
             this.toast.error({detail:'User editing Failed',duration:5000});
             }
     
         });    
         
         
      //  }
      //  else{   
      //    this.toast.error({detail:'User Registration Failed',summary:'Fill up the fields',duration:2000});
      //       }
   
          
    }

  
  }
  