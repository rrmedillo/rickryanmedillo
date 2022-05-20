import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    LayoutComponent,
    UserCreateComponent,
    UserDetailComponent,
    UserListComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FlexLayoutModule
  ]
})
export class AdminModule { }
