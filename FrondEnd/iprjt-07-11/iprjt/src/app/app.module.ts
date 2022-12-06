import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegComponent } from './user-reg/user-reg.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BodyComponent } from './body/body.component';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideCloudflareLoader } from '@angular/common';
import { TokenInterceptorService } from './token-interceptor.service';
import { HomeguardGuard } from './homeguard.guard';
import { GuardserviceService } from './guardservice.service';
import { CategoryComponent } from './category/category.component';
import { BooksComponent } from './books/books.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserbodyComponent } from './userbody/userbody.component';
import { BooksdisplayComponent } from './booksdisplay/booksdisplay.component';
import { BorrowComponent } from './borrow/borrow.component';
import { AcceptrequestComponent } from './acceptrequest/acceptrequest.component';
import { BorrowhistoryComponent } from './borrowhistory/borrowhistory.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { FindbyCategoryComponent } from './findby-category/findby-category.component';
import { NgToastModule } from 'ng-angular-popup';
import { RejectrequestComponent } from './rejectrequest/rejectrequest.component';
import { NotificationComponent } from './notification/notification.component';
import { BookreturnComponent } from './bookreturn/bookreturn.component';



@NgModule({
  declarations: [
    AppComponent,
    UserRegComponent,
    LoginComponent,
    BodyComponent,
    CategoryComponent,
    BooksComponent,
    UserDetailsComponent,
    UserbodyComponent,
    BooksdisplayComponent,
    BorrowComponent,
    AcceptrequestComponent,
    BorrowhistoryComponent,
    ViewProfileComponent,
    FindbyCategoryComponent,
    RejectrequestComponent,
    NotificationComponent,
    BookreturnComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgToastModule
  ],
  providers: [ {provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true},[HomeguardGuard, GuardserviceService] ],
  bootstrap: [AppComponent]
})
export class AppModule { }
