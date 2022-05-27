import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    UserCreateComponent,
    UserDetailComponent,
    UserListComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
