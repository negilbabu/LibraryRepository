import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ImageuploadService } from '../imageupload.service';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-imageupload',
  templateUrl: './imageupload.component.html',
  styleUrls: ['./imageupload.component.css']
})
export class ImageuploadComponent implements OnInit {
  selectedFiles: any;
  currentFile: any;
  data: any;

  constructor(
    private service:ImageuploadService,
    private serv:UserserviceService, 
    private toast : NgToastService ,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.service.LoadBooks().subscribe(data=>{
      this.data=data
      
    })
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload()
  {
      if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
      }
   
      this.service.imageUpload(this.currentFile,this.service.getId()).subscribe(
      response =>{
        this.toast.success({detail:'Success',summary:' Book cover uploaded',duration:5000});
        this.router.navigate(['/addbooks'])

        
        if(response)
        {
          
        }

      }, error => { alert("Invalid Data\t " +error.HttpErrorResponse+"  Status" +error.status) 
    }
    )}
  
  }
  
  home()
  {
    this.router.navigate(['/sidenav'])
  }

}
  
