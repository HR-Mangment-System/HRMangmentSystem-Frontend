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
import { AttendanceDepartureComponent } from './Pages/attendance-departure/attendance-departure.component';
import { AnnualHolidaysComponent } from './Pages/annual-holidays/annual-holidays.component';
import { AlertComponent } from './Pop up/alert/alert.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    UsersGroupsComponent, UserRegisterComponent,
    EmployeeComponent,
    NavbarComponent,
    AttendanceDepartureComponent,
    AnnualHolidaysComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
