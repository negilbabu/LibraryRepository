import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { BodyComponent } from './body/body.component';
import { UserRegComponent } from './user-reg/user-reg.component';
import { HomeguardGuard } from './homeguard.guard';
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
import { RejectrequestComponent } from './rejectrequest/rejectrequest.component';
import { NotificationComponent } from './notification/notification.component';
import { BookreturnComponent } from './bookreturn/bookreturn.component';
import { ViewAdminprofileComponent } from './view-adminprofile/view-adminprofile.component';
import { ImageuploadComponent } from './imageupload/imageupload.component';
import { FineComponent } from './fine/fine.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { UserSidenavComponent } from './user-sidenav/user-sidenav.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { DemoComponent } from './demo/demo.component';
import { AddbooksComponent } from './addbooks/addbooks.component';
import { BorrowDetailViewComponent } from './borrow-detail-view/borrow-detail-view.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

const routes: Routes = [
  {path: '',redirectTo:'login',pathMatch:'full'},
  {path : 'login',component:LoginComponent},
  {path: 'body',component:BodyComponent,canActivate: [HomeguardGuard]},
  {path: 'user-reg',component:UserRegComponent},
  {path : 'category',component:CategoryComponent,canActivate: [HomeguardGuard]},
  {path : 'books',component:BooksComponent,canActivate: [HomeguardGuard]},
  {path : 'user-details',component:UserDetailsComponent,canActivate: [HomeguardGuard]},
  {path : 'userbody',component:UserbodyComponent},
  {path : 'booksdisplay',component:BooksdisplayComponent},
  {path : 'borrow',component:BorrowComponent,canActivate: [HomeguardGuard]},
  {path : 'acceptrequest',component:AcceptrequestComponent,canActivate: [HomeguardGuard]},
  {path : 'rejectrequest',component:RejectrequestComponent,canActivate: [HomeguardGuard]},
  {path : 'borrowhistory',component:BorrowhistoryComponent},
  {path : 'view-profile',component:ViewProfileComponent},
  {path : 'findby-category',component:FindbyCategoryComponent},
  {path : 'notification',component:NotificationComponent},
  {path : 'bookreturn',component:BookreturnComponent},
  {path : 'view-adminprofile',component:ViewAdminprofileComponent,canActivate: [HomeguardGuard]},
  {path : 'imageupload',component:ImageuploadComponent,canActivate: [HomeguardGuard]},
  {path : 'fine',component:FineComponent,canActivate: [HomeguardGuard]},
  {path : 'sidenav',component:SidenavComponent,canActivate: [HomeguardGuard]},
  {path : 'user-sidenav',component:UserSidenavComponent},
  {path : 'addcategory',component:AddcategoryComponent,canActivate: [HomeguardGuard]},
  {path:'demo',component:DemoComponent},
  {path:'addbooks',component:AddbooksComponent,canActivate: [HomeguardGuard]},
  {path:'borrow-detail-view',component:BorrowDetailViewComponent},
  {path:'forgotpassword',component:ForgotpasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
