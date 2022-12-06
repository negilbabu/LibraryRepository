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
   // sessionStorage.clear();
    this.sendMail()

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
  if (confirm('Are you sure you want to LogOuT?')) {
    localStorage. clear()   
    this.router.navigate(['/login'])
  } else {
    
    this.router.navigate(['/body'])
  } 
  }
  onClickProfile()
  {
    this.router.navigate(['/view-profile'])
  }

  sendMail(){


    this.borrowService.LoadDue().subscribe((data: any)=>{
      console.log(data); 
    //  console.log(data[0].user.email)

     let array1=data;

     this.borrowService.sendMail(array1[1].user.userId).subscribe
     ((data=>{}));


    //   for (let i=0;i< array1.length;i++){
    //   console.log(array1[i].user.userId)
    //   sessionStorage.setItem('email',array1[i].user.email)
    //   this.borrowService.sendMail(array1[i].user.userId)
    //      console.log(array1[i].user.email)   
    //  }







    });
  }



}
function Mailsend() {
  throw new Error('Function not implemented.');
}

