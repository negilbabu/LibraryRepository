import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  

  categoryList: any[];
  categoryId:any;
  constructor(private router:Router ,private service:CategoryService) {
  
  this.categoryList=[];
 }
 categorydata:any;

 ngOnInit(): void {
  this.LoadCategory();
  
}
   
ObjSampleForm:FormGroup=new FormGroup(
  { 
    categoryName:new FormControl('',[Validators.required]),   
  }
)

LoadCategory() {
  this.service.LoadCategory().subscribe((data: any)=>{
  this.categorydata=data;
  });  }  
  

onSubmit(){
  if(this.categoryId!=undefined){
    this.updateCategory(this.categoryId)
  }else{
    this.service.addCategory(this.ObjSampleForm.value).subscribe(result=>{
      console.log(result);
      if(result.categoryId){  
        console.log(result);
        alert("Category added");
        window.location.reload();
      }
      else{
        alert("category Not added");
      }
    })
 }
}


 deleteCategory(categoryId:any): void{
  if(confirm('Are you sure want to delete?'))
  {
 console.log(categoryId);
  this.service.delete(categoryId.categoryId).subscribe({next:(res)=>{
    console.log(res);
    alert("item deleted");
    window.location.reload();
  },
  error:(msg)=>{}      
  })
 }
 else{
  this.router.navigate(['/category'])
 }
}


editCategory(categoryId:any): void{
 
  this.service.editCategory(categoryId.categoryId).subscribe({    
    next:(res)=>{
      this.categoryId=res.categoryId;
      this.ObjSampleForm.controls['categoryName'].setValue(res.categoryName)
      console.log(res);      
       
    },
    error:(msg)=>{}
  })
}


updateCategory(categoryId:any){
  let body={
    categoryName: this.ObjSampleForm.controls['categoryName'].value
  }

  console.log(body)
  this.service.update(categoryId, body).subscribe({
    next: (Response: any) => {
      console.log(Response);
      alert(" Edited successfully")
      window.location.reload()
    },
    error: (Response: any) => {
      console.log(Response)
      alert("invalid Contact")
    }
  })

 }

 home()
 {
   this.router.navigate(['/body'])
 }

 
}
