import { Component, OnInit } from '@angular/core';
import { MinValidator } from '@angular/forms';
import { Router,Route } from '@angular/router';
import { BorrowService } from '../borrow.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  borrowdata: any;

  constructor(private router:Router,private borrowService:BorrowService) { }
//private userService:UserService,private booksService:BooksService
  ngOnInit(): void {

    sessionStorage.clear();

  //  const schedule = require('node-schedule')
  //  const job = schedule.scheduleJob('21 * * * *', this.sendMail(){
  //    console.log('Send my email.')
  //  })



   this.sendMail()

  }


  onClickDue()
  {
    this.router.navigate(['/fine'])
  }

  onClickCategory()
  {
    this.router.navigate(['/category'])
  }
  onClickBorrow()
  {
    this.router.navigate(['/borrow'])
  }
  onClickAddBooks()
  {
    this.router.navigate(['/books'])
  }
  userDetails()
  {
    this.router.navigate(['/user-details'])
  }
  logout()
  {
  // if (confirm('Are you sure you want to LogOuT?')) {
  //   localStorage. clear()   
  //   this.router.navigate(['/login'])
  // } else {
    
    this.router.navigate(['/login'])
  // } 
  }
  onClickProfile()
  {
    this.router.navigate(['/view-adminprofile'])
  }

  sendMail(){
    // this.borrowService.LoadDue().subscribe((data: any)=>{
    //   console.log("due date expired details"); 
    //   console.log(data); 
    //  let array1=data;
    // //  this.borrowService.sendMail(array1[1].user.userId).subscribe
    // //  ((data=>{}));
    //   for (let i=0;i< array1.length;i++){
    //   console.log(array1[i].user.userId)     
    //   // this.borrowService.sendMail(array1[i].user.userId)
    //   //    console.log(array1[i].user.email)   
    //   this.borrowService.sendMail(array1[i].user.userId).subscribe
    //  ((data=>{}));
    //     }

    // });
  }



}