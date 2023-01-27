import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { BooksService } from '../books.service';
import { ImageuploadService } from '../imageupload.service';
import { NgToastService } from 'ng-angular-popup';
import { MatDialog } from '@angular/material/dialog';


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
  ObjSampleForm:FormGroup;

  constructor(private router:Router ,
    private booksService:BooksService,
    private service:CategoryService,
    private imageService:ImageuploadService,
    private toast : NgToastService) {  
  this.booksList=[];
  this.categoryList=[];

  this.ObjSampleForm=new FormGroup(
    { 
      categoryId:new FormControl('',[Validators.required]), 
      publication:new FormControl('',[Validators.required]), 
      booksName:new FormControl('',[Validators.required]), 
      auther:new FormControl('',[Validators.required]), 
      booksCopies:new FormControl('',[Validators.required]) ,
      // categoryId:new FormControl('',[Validators.required]) ,
    }
  );
 }


 ngOnInit(): void {
  

  this.LoadCategory();
  this.loadEdit();


} 

   

disp(categoryId:any){
  console.log(categoryId)
}

LoadCategory() {
  
  this.service.LoadCategory().subscribe((data: any)=>{
    this.catdata=data;
    console.log('catadata=',this.catdata)
    });
  }  
  
  clear() {
    localStorage.removeItem('categoryId');
    window.location.reload()
  }
  
onSubmit(){

  // let booksId=localStorage.getItem("booksId") 

  if(this.booksId!=undefined){
    this.update(this.booksId)
  }else
  {


    this.booksService.add(this.ObjSampleForm.value).subscribe(result=>{
      console.log(result);
      if(result.booksId){  
        console.log(result);
        this.toast.success({detail:'Success',summary:'The Book '+result.booksName+' Added',duration:5000});
        this.imageService.setId(result.booksId)
        console.log("bid=",result.booksId)
        // MatDialog.close();
        this.router.navigate(['/imageupload'])

      }
      else{
        this.toast.error({detail:'Invalid',summary:'Add new Book Failed',duration:5000});
      }
    })



 }
}


loadEdit(): void{

  let booksId=localStorage.getItem("booksId")  
  if(booksId!=null){
  this.booksService.edit(booksId).subscribe({    
    next:(res)=>{
      this.booksId=res.booksId;
      this.ObjSampleForm.controls['categoryId'].setValue(res.category.categoryId)
      this.ObjSampleForm.controls['publication'].setValue(res.publication)
      this.ObjSampleForm.controls['booksName'].setValue(res.booksName)
      this.ObjSampleForm.controls['auther'].setValue(res.auther)
      this.ObjSampleForm.controls['booksCopies'].setValue(res.booksCopies)
      console.log("edit",res);   
      //console.log(res);      
       
    },
    error:(msg)=>{}
  })
}
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

  this.booksService.update(booksId, body).subscribe({
    next: (Response: any) => {
      console.log(Response);
      
     

      
      if (confirm('Do you want to change Book cover?')) { 
        this.toast.info({detail:'Success ',summary:'The book '+this.ObjSampleForm.controls['booksName'].value+' Edited Successfully',duration:5000});      
    
      this.imageService.setId(Response.booksId)
      console.log("bookId=",Response.booksId)
      this.router.navigate(['/imageupload'])
    } else {
      
      this.toast.info({detail:'Success ',summary:this.ObjSampleForm.controls['booksName'].value+' Edited Successfully',duration:5000});      
    
      setTimeout(() => {
        this.router.navigate(['/addbooks'])
        window.location.reload()       
    }, 5000); 
    } 


    },
    error: (Response: any) => {
      console.log(Response)
      this.toast.success({detail:'Invalid',summary:'Enter valid details ',duration:5000});  
    }
  })
  localStorage.removeItem('booksId');
 }


 
}
