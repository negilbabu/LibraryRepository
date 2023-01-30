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
          this.toast.success({detail:'User Registred Successfully',summary:'Please Log in',duration:5000});
          this.router.navigate(['/login'])
          console.log(result)
        }
        else{
          alert("User Not added");
        }

      },
      (error: any) =>{
      //  if(error.status==500){
        this.toast.error({detail:'User Registration Failed',summary:'Email Already Registered',duration:5000});
        // this.ObjSampleForm.reset()
        setTimeout(() => {
          // window.location.reload()       
        }, 1500);
      // }
        
      });    
      
      
    }
    else{   
      this.toast.error({detail:'User Registration Failed',summary:'Fill up the fields',duration:2000});
         }

   }


   

   Login()
   {
     this.router.navigate(['/login'])
   }




}



