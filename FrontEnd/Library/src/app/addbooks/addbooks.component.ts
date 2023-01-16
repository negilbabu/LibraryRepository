import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog,MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { BooksService } from '../books.service';
import { BooksComponent } from '../books/books.component';
import { CategoryService } from '../category.service';
import { ImageuploadService } from '../imageupload.service';

@Component({
  selector: 'app-addbooks',
  templateUrl: './addbooks.component.html',
  styleUrls: ['./addbooks.component.css']
})
export class AddbooksComponent implements OnInit {
  categoryList: any[];
  categoryId:any;


  booksList: any[];
  books: any;
  booksId: any;
  key: any;
  pkey:any;

  categorydata:any;
  booksdata:any;
  catdata: any;

data: any;
page:number=1;
count: any;
tableSize: number = 3;
ProdData: any;
sortedData: any;
a:any;
b:any;
searchResult:any
searchData:any
sort:string="auther";
len: any;
result: any;
  booksCount: any;
  direction=-1;

selectedFiles?: FileList;
currentFile?: File;
  // ObjSampleForm:FormGroup;
  constructor(private router:Router ,private toast : NgToastService,private booksService:BooksService,private service:CategoryService,private imageService:ImageuploadService,private dialog: MatDialog) { 
    this.booksList=[];
    this.categoryList=[];
    
    
  }

  search:FormGroup=new FormGroup({
    inp:new FormControl()
  })


  ngOnInit(): void {
    this.Load();
    localStorage.removeItem('booksId'); 

  }

  search1(key:any){
    console.log("before api=",key);
    this.booksService.search(key,this.page,this.tableSize,this.sort,this.direction).subscribe(response=>{
      this.result=response.content;
     console.log("searchRslt=",this.result);
      this.data=this.result;
       this.count=response.totalElements;
       console.log("count=",this.count);
       this.pkey=this.search.controls['inp'].value;
       console.log("pk",this.pkey)
     });
}
  

Load() {
  this.booksService.pagination1(this.page,this.tableSize,this.sort,this.direction).subscribe(result=>{
    this.result=result.content;
    this.count=result.totalElements
    console.log("loaded books=",this.result);   
    console.log("page=",this.page);  
    this.data=this.result; 
    this.booksdata=this.result;                   
      });
}  


sortfn(a:any){    
  this.sort=a;      
  // this.page=this.page;
  // this.tableSize;

  if(this.pkey==null){
  if(this.direction==1){
    this.direction=-1;
    console.log("from desc to :",this.direction)
    this.ngOnInit();       
  }

  else{
    this.direction=1;
    console.log("from asc to desc",this.direction)
  this.ngOnInit(); 
  }
}
else{
  if(this.direction==1){
    this.direction=-1;
    console.log("from desc to :",this.direction)
    this.search1(this.search.controls['inp'].value);       
  }

  else{
    this.direction=1;
    console.log("from asc to desc",this.direction)
  this.search1(this.search.controls['inp'].value); 
  }

}
  
}

onTableDataChange(event:any) {
  // this.pkey==this.search.controls['inp'].value;
  console.log("p-",this.pkey)
  if(this.pkey==null){
  console.log("page=",event)
    this.booksService.pagination1(this.page,this.tableSize,this.sort,this.direction).subscribe(result=>{
      this.result=result.content;
      this.count=result.totalElements
      console.log("loaded books=",this.result);   
      this.data=this.result;   
      this.booksdata=this.result;                     
        })      
      }
      else{
        // this.pkey==this.search.controls['inp'].value;
        console.log("page=",event)
        console.log("pkey in page=",this.pkey)
        this.booksService.search(this.pkey,this.page,this.tableSize,this.sort,this.direction).subscribe(result=>{
          this.result=result.content;
          this.count=result.totalElements
          console.log("loaded books=",this.result);   
          this.data=this.result;   
          this.booksdata=this.result;                     
            })  
      } 
  }


  openDialog() {

    const dialogConfig = new MatDialogConfig();
    this.dialog.open(BooksComponent,
      {
        width:'32%',height:'70%'
      
      }
      );
  
  }

  delete(booksId:any): void{
    if(confirm('Are you sure want to delete?'))
    {
   console.log(booksId);
   this.toast.error({detail:'BOOK DELETED',summary:'The book '+booksId.booksName+' Has DELETED',duration:5000}); 
    this.booksService.delete(booksId.booksId).subscribe({next:(res)=>{
      console.log(res);            
      setTimeout(() => {

        window.location.reload()       
    }, 1500);
    },
    error:(msg)=>{}      
    })
   }
   else{
    this.router.navigate(['/books'])
   }
  }

  edit(booksId:any) {
    // localStorage.setItem('flag',this.flag);
     localStorage.setItem('booksId',booksId);
     const dialogConfig = new MatDialogConfig();
     this.dialog.open(BooksComponent,
      {
        width:'32%',height:'70%'
      
      }
      );
   
   }
   



////////////////////////////////////

selectFile($event:any) {
  this.selectedFiles=$event.target.files;
   }

   
   
   upload(): void {
 
     if (this.selectedFiles) {
       const file: File | null = this.selectedFiles.item(0);
 
       if (file) {
         this.currentFile = file;
         this.booksService.uploadCsv(this.currentFile).subscribe(res=>{
           console.log(res);
           if(res!==null){
            this.toast.success({detail:'SUCCESS',summary:'The CSV File upload is successfull',duration:5000}); 
             
          
      setTimeout(() => {

        window.location.reload()       
    }, 5000);  
            
           }
         })
 
     
       }
 
       this.selectedFiles = undefined;
     }
   }


  




}
