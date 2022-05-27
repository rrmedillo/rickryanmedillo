import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  { 
    path: 'admin', 
    component: AdminComponent,
    data: { showHeader: false, showSidebar: false, showFooter: false },
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'user-create',
        component: UserCreateComponent
      },
      {
        path: 'user-detail',
        component: UserDetailComponent
      },
      {
        path: 'user-list',
        component: UserListComponent
      },
      {
        path: 'signin',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: RegistrationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
