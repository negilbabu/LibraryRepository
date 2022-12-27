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
  this.booksService.Load().subscribe((data: any)=>{
    console.log(data)
  this.booksdata=data;
  });  }  
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
