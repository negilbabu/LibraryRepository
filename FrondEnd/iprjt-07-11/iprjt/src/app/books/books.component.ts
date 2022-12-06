import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  


  categoryList: any[];
  categoryId:any;


  booksList: any[];
  books: any;
  booksId: any;

  categorydata:any;
  booksdata:any;
  catdata: any;


  constructor(private router:Router ,private booksService:BooksService,private service:CategoryService) {  
  this.booksList=[];
  this.categoryList=[];
 }


 ngOnInit(): void {

  this.service.LoadCategory().subscribe((data: any)=>{
    this.catdata=data;
    console.log(this.catdata)
    });

 this.Load();
  
}
   
ObjSampleForm:FormGroup=new FormGroup(
  { 
    categoryId:new FormControl('',[Validators.required]), 
    publication:new FormControl('',[Validators.required]), 
    booksName:new FormControl('',[Validators.required]), 
    auther:new FormControl('',[Validators.required]), 
    booksCopies:new FormControl('',[Validators.required]) ,
    // categoryId:new FormControl('',[Validators.required]) ,
  }
)
disp(){
  console.log(this.categoryId)
}

Load() {
  this.booksService.Load().subscribe((data: any)=>{
    console.log(data)
  this.booksdata=data;
  });  }  
  

onSubmit(){
  if(this.booksId!=undefined){
    this.update(this.booksId)
  }else{
    this.booksService.add(this.ObjSampleForm.value).subscribe(result=>{
      console.log(result);
      if(result.booksId){  
        console.log(result);
        alert("Books added");
        window.location.reload();
      }
      else{
        alert("Books Not added");
      }
    })
 }
}


 delete(booksId:any): void{
  if(confirm('Are you sure want to delete?'))
  {
 console.log(booksId);
  this.booksService.delete(booksId.booksId).subscribe({next:(res)=>{
    console.log(res);
    alert("Books deleted");
    window.location.reload();
  },
  error:(msg)=>{}      
  })
 }
 else{
  this.router.navigate(['/books'])
 }
}




edit(booksId:any): void{
 
  this.booksService.edit(booksId.booksId).subscribe({    
    next:(res)=>{
      this.booksId=res.booksId;
      this.ObjSampleForm.controls['categoryId'].setValue(res.categoryName)
      this.ObjSampleForm.controls['publication'].setValue(res.publication)
      this.ObjSampleForm.controls['booksName'].setValue(res.booksName)
      this.ObjSampleForm.controls['auther'].setValue(res.auther)
      this.ObjSampleForm.controls['booksCopies'].setValue(res.booksCopies)
      console.log(res);      
       
    },
    error:(msg)=>{}
  })
}


update(booksId:any){

  console.log("ebd")
  console.log(this.ObjSampleForm.controls['categoryId'].value)
  let body={
    categoryId: this.ObjSampleForm.controls['categoryId'].value,
    publication: this.ObjSampleForm.controls['publication'].value,
    booksName: this.ObjSampleForm.controls['booksName'].value,
    auther: this.ObjSampleForm.controls['auther'].value,
    booksCopies: this.ObjSampleForm.controls['booksCopies'].value
    }

  console.log(body)
  // console.log(body.categoryName)
  this.booksService.update(booksId, body).subscribe({
    next: (Response: any) => {
      console.log(Response);
      alert(" Edited successfully")
      window.location.reload()
    },
    error: (Response: any) => {
      console.log(Response)
      alert("invalid Book Details")
    }
  })

 }

 home()
 {
   this.router.navigate(['/body'])
 }

 
}
