import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../category.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';



export interface DialogData  {
categoryName:string;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {



categoryId:any;
categoryName:any;
data: any;
test:any;


ObjSampleForm:FormGroup;

  constructor(
    private router:Router ,
    private service:CategoryService,   
    private toast : NgToastService, 
    ) 
     {
      this.ObjSampleForm=new FormGroup(
        { 
          categoryName:new FormControl('',[Validators.required]),   
        }
      );
    }
  ngOnInit(): void {

this.LoadEdit()

  }
   
LoadEdit(){
  let categoryId=localStorage.getItem("categoryId")  


  if(categoryId!=null){
  this.service.editCategory(categoryId).subscribe({    
    next:(res)=>{
      this.categoryId=res.categoryId;
      this.ObjSampleForm.controls['categoryName'].setValue(res.categoryName)
  
       
    },
    error:(msg)=>{}
  })
}

}

 categorydata:any;



onSubmit(){

  let categoryId=localStorage.getItem("categoryId")  

  if(categoryId!=undefined){
    this.updateCategory(categoryId)
  }else{
  this.addCategory()

  }

}
    addCategory(){
    this.service.addCategory(this.ObjSampleForm.value).subscribe(result=>{
      

      if(result.categoryId){  
        this.toast.success({detail:'Success',summary:'The Category '+result.categoryName+' Added',duration:5000});
      this.router.navigate(['/addcategory'])
     
      
        
      }
      else{
        alert("category Not added");
      }
    })
 }


updateCategory(categoryId:any){
  let body={
    categoryName: this.ObjSampleForm.controls['categoryName'].value
  }

  console.log(body)
  this.service.update(categoryId, body).subscribe({
    next: (Response: any) => {


      this.toast.success({detail:'Success',summary:'The Category - '+Response.categoryName+' Edited',duration:5000});
      // setTimeout(() => {
        this.router.navigate(['/addcategory'])     
      // }, 1500);

    },
    error: (Response: any) => {
      console.log(Response)
      alert("invalid Category credentials")
    }
  })
  localStorage.removeItem('categoryId');


 }
 clear() {
  localStorage.removeItem('categoryId');
  window.location.reload()
  }
    

 
}
