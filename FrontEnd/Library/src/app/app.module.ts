import { NgModule } from '@angular/core';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

import { BrowserModule } from '@angular/platform-browser';

import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider} from '@abacritt/angularx-social-login';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegComponent } from './user-reg/user-reg.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BodyComponent } from './body/body.component';

import {MatDialogConfig, MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS,} from '@angular/material/dialog';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AsyncPipe, DatePipe, provideCloudflareLoader } from '@angular/common';
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
import { ViewAdminprofileComponent } from './view-adminprofile/view-adminprofile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';

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
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UserDetailviewComponent } from './user-detailview/user-detailview.component';
import {MatTableModule} from '@angular/material/table';
import { PageNotfoundComponent } from './page-notfound/page-notfound.component';
import { RestpasswordComponent } from './restpassword/restpassword.component';
import { ChatComponent } from './chat/chat.component';
import { ChatsComponent } from './chats/chats.component';
// import { ChatMessasageDtoComponent } from './model/chat-messasage-dto/chat-messasage-dto.component';
// import { ChatMessasageDtoComponent } from './models/chat-messasage-dto/chat-messasage-dto.component';

// import {AngularFireMessagingModule} from '@angular/fire/messaging'
// import { AngularFireMessagingModule } from '@angular/fire/messaging';
// import { AngularFireDatabaseModule } from '@angular/fire/database';
// import { AngularFireAuthModule } from '@angular/fire/auth';
// import { AngularFireModule } from '@angular/fire';  

// import { AngularFireModule } from '@angular/fire';
// import { AngularFireMessagingModule } from '@angular/fire/messaging';
/////////////////////////////
// import { AngularFireModule } from "@angular/fire/compat";
// import { AngularFireAuthModule } from "@angular/fire/compat/auth";
// import { AngularFireStorageModule } from '@angular/fire/compat/storage';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
// import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
// import { MessagingService } from './messaging.service';

// import { AngularFireMessagingModule } from '@angular/fire/messaging';

// import { AngularFireModule } from '@angular/fire';


// import { AngularFireModule } from '@angular/fire';
// import { AngularFireMessagingModule } from '@angular/fire/messaging';

// import {AngularFireMessagingModule} from '@angular/fire/messaging'



const firebaseConfig = {
  // your Firebase config goes here
};

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
    AdminNavbarComponent,
    HomepageComponent,
    UserDetailviewComponent,
    PageNotfoundComponent,
    RestpasswordComponent,
    ChatComponent,
    ChatsComponent,
    // ChatMessasageDtoComponent,
    // ChatMessasageDtoComponent,


    

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
    MatGridListModule,
    MatTableModule,
    SocialLoginModule,
    // AngularFireDatabaseModule,
    // AngularFireAuthModule,
    // AngularFireMessagingModule
    
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireMessagingModule,
    

  ],
  providers: [ {provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true},
    [HomeguardGuard, GuardserviceService],
    [DatePipe],
    [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '508399831720-cai87nbnl4updp779c21a4br40kqc77s.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('clientId')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  // [MessagingService,AsyncPipe]
],
  bootstrap: [AppComponent],
  entryComponents:[CategoryComponent,DemoComponent],
})
export class AppModule { }