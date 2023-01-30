import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-notfound',
  templateUrl: './page-notfound.component.html',
  styleUrls: ['./page-notfound.component.css']
})
export class PageNotfoundComponent implements OnInit {


  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  home() {
    
   this.router.navigate(['/body'])
    }
}
