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
import { ViewAdminprofileComponent } from './view-adminprofile/view-adminprofile.component';

// import { MatIconModule, MatToolbarModule, MatTooltipModule } from '@angular/material';

import {MatIconModule} from '@angular/material/icon';
import { ImageuploadComponent } from './imageupload/imageupload.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//  import {MatIconModule} from '@angular/material/icon';
// import { MatToolbarModule } from '@angular/material';
// import {MatTooltipModule} from '@angular/material/tooltip';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ImageUpComponent } from './image-up/image-up.component';


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
    ViewAdminprofileComponent,
    ImageuploadComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgToastModule,
    MatIconModule,
    NgbModule,
   ///MatIconModule,
    // MatToolbarModule,
    // MatTooltipModule,
    //BrowserAnimationsModule
  ],
  providers: [ {provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true},[HomeguardGuard, GuardserviceService] ],
  bootstrap: [AppComponent]
})
export class AppModule { }
