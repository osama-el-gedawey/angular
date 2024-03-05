import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './component/shared/nav/nav.component';
import { FooterComponent } from './component/shared/footer/footer.component';
import { LoginComponent } from './component/core/login/login.component';
import { EmployeListComponent } from './component/core/employe-list/employe-list.component';
import { EmployeFormComponent } from './component/core/employe-form/employe-form.component';
import { ProfileComponent } from './component/core/profile/profile.component';
import { NotFoundComponent } from './component/core/not-found/not-found.component';
import { CreateAccountComponent } from './component/core/create-account/create-account.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    LoginComponent,
    EmployeListComponent,
    EmployeFormComponent,
    ProfileComponent,
    NotFoundComponent,
    CreateAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
