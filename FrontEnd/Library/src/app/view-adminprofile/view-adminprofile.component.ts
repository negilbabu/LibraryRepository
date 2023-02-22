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
         
        }
    )
  
    ngOnInit(): void {
  
      
      this.Load();
    }

    EditProfile() {

      this.rslt=2;
 

      this.service.editCurrentUser().subscribe({
        next:(result) =>{
          console.log("name-",result[0].role);
          
          this.ObjSampleForm.controls['firstName'].setValue(result[0].firstName)
          this.ObjSampleForm.controls['lastName'].setValue(result[0].lastName)
          this.ObjSampleForm.controls['address'].setValue(result[0].address)
          this.ObjSampleForm.controls['dob'].setValue(result[0].dob)
          this.ObjSampleForm.controls['phone'].setValue(result[0].phone)

        },
      })
      this.displayStyle = "block";
        }

  
    Load() {
      this.service.getAdmin().subscribe((data: any)=>{
      this.userdata=data;
      });  }  





  closePopup() {
  this.displayStyle = "none";
  this.ObjSampleForm.reset();
  this.rslt=0;
        }
        
  
      openPopup() {

      if(this.ObjSampleForm.valid){

         this.service.currentUserProfileEdit(this.ObjSampleForm.value).subscribe(result=>{
           if(result.userId){  
             this.toast.success({detail:' Profile Updated Successfully',duration:5000});
             this.router.navigate(['/view-adminprofile'])
             console.log(result)
             this.rslt=0;
           }
           this.Load()
         },
         (error: any) =>{
       
        if(error.status==400){
             this.toast.error({detail:'User editing Failed',duration:5000});
             }
     
         });    
         
         
       }
       else{   
         this.toast.error({detail:'User Registration Failed',summary:'Fill up the fields',duration:2000});
            }
   this.Load()
          
    }

  
  }
  