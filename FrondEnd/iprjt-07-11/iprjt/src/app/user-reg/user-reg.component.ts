import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router,Route } from '@angular/router';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-user-reg',
  templateUrl: './user-reg.component.html',
  styleUrls: ['./user-reg.component.css']
})
export class UserRegComponent implements OnInit {
[x: string]: any;
  constructor(private router:Router ,private service:UserserviceService) { }
  
  
  
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
  }


  onSubmit(){
    console.log("aaaa");
    //debugger
   //if(this.ObjSampleForm.valid){
     
      this.service.add(this.ObjSampleForm.value).subscribe(result=>{
        if(result.userId){  
          console.log(result);
          alert("User added");
          this.router.navigate(['/login'])
        }
        else{
          alert("User Not added");
        }
      })
   // }
   }


   

   Login()
   {
     this.router.navigate(['/login'])
   }

  




}
