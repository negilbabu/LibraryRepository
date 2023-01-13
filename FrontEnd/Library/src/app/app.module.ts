import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegComponent } from './user-reg/user-reg.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BodyComponent } from './body/body.component';

//import { ModalComponent } from './modal/modal.component';
import {MatDialogConfig, MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS,} from '@angular/material/dialog';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe, provideCloudflareLoader } from '@angular/common';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';

// import { MatIconModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { MatListModule } from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { ImageuploadComponent } from './imageupload/imageupload.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FineComponent } from './fine/fine.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SidenavComponent } from './sidenav/sidenav.component';
import { UserSidenavComponent } from './user-sidenav/user-sidenav.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { DemoComponent } from './demo/demo.component';
import { AddbooksComponent } from './addbooks/addbooks.component';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { BorrowDetailViewComponent } from './borrow-detail-view/borrow-detail-view.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import {Chart} from 'chart.js';
import { Sidenav2Component } from './sidenav2/sidenav2.component';
import { Navbar2Component } from './navbar2/navbar2.component';

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
    FineComponent,
    SidenavComponent,
    UserSidenavComponent,
    AddcategoryComponent,
    DemoComponent,
    AddbooksComponent,
    BorrowDetailViewComponent,
    ForgotpasswordComponent,
    Sidenav2Component,
    Navbar2Component,
    // Chart
    
  //  ModalComponent
    

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
    NgxPaginationModule,
    MatDialogModule,
    MatFormFieldModule,
    BrowserAnimationsModule ,
    MatButtonModule,  
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    MatListModule,
    MatGridListModule
    
    // Chart
    

   ///MatIconModule,
    // MatToolbarModule,
    // MatTooltipModule,
    //BrowserAnimationsModule
  ],
  // ,{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  providers: [ {provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true},[HomeguardGuard, GuardserviceService],[DatePipe] ],
  bootstrap: [AppComponent],
  entryComponents:[CategoryComponent,DemoComponent],
})
export class AppModule { }
