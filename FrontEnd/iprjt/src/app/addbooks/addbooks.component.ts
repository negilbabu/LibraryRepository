import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
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

  categorydata:any;
  booksdata:any;
  catdata: any;

data: any;
page:number=1;
count: any;
tableSize: number = 5;
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
  // ObjSampleForm:FormGroup;
  constructor(private router:Router ,private booksService:BooksService,private service:CategoryService,private imageService:ImageuploadService,private dialog: MatDialog) { 
    this.booksList=[];
    this.categoryList=[];
    
    
  }

  ngOnInit(): void {
    this.Load();
    localStorage.removeItem('booksId'); 
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
  this.page=this.page;
  this.tableSize;

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

onTableDataChange(event:any) {
  
  console.log("page=",event)
    this.booksService.pagination1(this.page,this.tableSize,this.sort,this.direction).subscribe(result=>{
      this.result=result.content;
      this.count=result.totalElements
      console.log("loaded books=",this.result);   
      this.data=this.result;   
      this.booksdata=this.result;                     
        })       
  }


  openDialog() {

    const dialogConfig = new MatDialogConfig();
    this.dialog.open(BooksComponent, dialogConfig);
  
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

  edit(booksId:any) {
    // localStorage.setItem('flag',this.flag);
     localStorage.setItem('booksId',booksId);
     const dialogConfig = new MatDialogConfig();
     this.dialog.open(BooksComponent, dialogConfig);
   
   }
   
  




}
