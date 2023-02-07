import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
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

  categoryId: any;
  books: any;
  booksId: any;
  key: any;
  pkey: any;

  categorydata: any;
  booksdata: any;
  catdata: any;

  data: any;
  page: number = 1;
  count: any;
  tableSize: number = 5;
  ProdData: any;
  sortedData: any;
  a: any;
  b: any;
  searchResult: any
  searchData: any
  sort: string = "auther";
  len: any;
  result: any;
  booksCount: any;
  direction = -1;
  noValue=0;

  selectedFiles?: FileList;
  currentFile?: File;

  constructor(private router: Router, private toast: NgToastService, private booksService: BooksService, private service: CategoryService, private imageService: ImageuploadService, private dialog: MatDialog) {
  
  }

  search: FormGroup = new FormGroup({
    inp: new FormControl()
  })


  ngOnInit(): void {
    this.Load();
    localStorage.removeItem('booksId');

  }

  search1(key: any) {

    this.booksService.search(key, this.page, this.tableSize, this.sort, this.direction).subscribe(response => {
      this.result = response.content;

      if (this.result.length == 0) {
        this.noValue = 1;
        
      }
      this.data = this.result;
      this.count = response.totalElements;
      this.pkey = this.search.controls['inp'].value;

    });
  }


  Load() {
    this.booksService.pagination1(this.page, this.tableSize, this.sort, this.direction).subscribe(result => {
      this.result = result.content;
      this.count = result.totalElements
      this.data = this.result;
      this.booksdata = this.result;

    });
  }


  sortfn(a: any) {
    this.sort = a;

    if (this.pkey == null) {

      if (this.direction == 1) {
        this.direction = -1;
        this.ngOnInit();
      }

      else {
        this.direction = 1;
        this.ngOnInit();
      }
    }
    else {
      if (this.direction == 1) {
        this.direction = -1;
        this.search1(this.search.controls['inp'].value);
      }

      else {
        this.direction = 1;
        this.search1(this.search.controls['inp'].value);
      }

    }

  }

  onTableDataChange(event: any) {

    if (this.pkey == null) {

      this.booksService.pagination1(this.page, this.tableSize, this.sort, this.direction).subscribe(result => {
        this.result = result.content;
        this.count = result.totalElements
        this.data = this.result;
        this.booksdata = this.result;
      })
    }
    else {
      this.booksService.search(this.pkey, this.page, this.tableSize, this.sort, this.direction).subscribe(result => {
        this.result = result.content;
        this.count = result.totalElements
        this.data = this.result;
        this.booksdata = this.result;
      })
    }
  }


  openDialog() {

    const dialogConfig = new MatDialogConfig();
    this.dialog.open(BooksComponent,
      {
        closeOnNavigation: true,
        width: '55%', height: 'auto'

      }
    );
    this.router.events
      .subscribe(() => {
        this.dialog.closeAll();
      });

  }

  delete(booksId: any): void {
    if (confirm('Are you sure want to delete?')) {

      this.booksService.delete(booksId.booksId).subscribe({
        next: (res) => {
         
      this.toast.error({ detail: 'BOOK DELETED', summary: 'The book ' + booksId.booksName + ' Has DELETED', duration: 5000 });
            this.Load();

        },
        error: (msg) => {
          this.toast.warning({ detail: 'UNABLE TO DELETE', summary: 'The book ' + booksId.booksName + ' cannot be DELETED', duration: 5000 });
         }
      })
    }
    else {
      this.router.navigate(['/addbooks'])
    }
  }

  edit(booksId: any) {

    localStorage.setItem('booksId', booksId);
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(BooksComponent,
      {
        closeOnNavigation: true,
        width: '30%', height: '70%'

      }
    );
    this.router.events
      .subscribe(() => {
        this.dialog.closeAll();
        this.Load();
      });

  }


  selectFile($event: any) {
    this.selectedFiles = $event.target.files;
  }



  upload(): void {

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
        this.booksService.uploadCsv(this.currentFile).subscribe(res => {

          if (res !== null) {
            this.toast.success({ detail: 'SUCCESS', summary: 'The CSV File upload is successfull', duration: 5000 });

            // setTimeout(() => {
              this.Load()

            // }, 3000);
          }
        }, (error: any) => {
          this.toast.error({ detail: 'CSV Upload Failed', summary: 'Invalid CSV File', duration: 5000 });
          this.Load();
        });



      }

      this.selectedFiles = undefined;
    }
  }







}
