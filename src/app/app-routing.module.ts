import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeListComponent } from './component/core/employe-list/employe-list.component';
import { EmployeFormComponent } from './component/core/employe-form/employe-form.component';
import { LoginComponent } from './component/core/login/login.component';
import { NotFoundComponent } from './component/core/not-found/not-found.component';
import { ProfileComponent } from './component/core/profile/profile.component';
import { CreateAccountComponent } from './component/core/create-account/create-account.component';
import { loginGuardGuard } from './services/login-guard.guard';
import { isAdminGuard } from './services/is-admin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'employees', component: EmployeListComponent ,canActivate:[loginGuardGuard,isAdminGuard]},
  { path: 'employees/add', component: EmployeFormComponent,canActivate:[loginGuardGuard,isAdminGuard] },
  { path: 'employees/edit/:id', component: EmployeFormComponent ,canActivate:[loginGuardGuard,isAdminGuard]},
  { path: 'account/add/:id', component: CreateAccountComponent ,canActivate:[loginGuardGuard,isAdminGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent,canActivate:[loginGuardGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
