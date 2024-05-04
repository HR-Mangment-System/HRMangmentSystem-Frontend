import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './Pages/signin/signin.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersGroupsComponent } from './Pages/users-groups/users-groups.component';
import { UserRegisterComponent } from './Pages/user-register/user-register.component';
import { EmployeeComponent } from './Pages/employee/employee.component';
import { NavbarComponent } from './Components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    UsersGroupsComponent, UserRegisterComponent,
    EmployeeComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
