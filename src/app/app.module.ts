import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './Pages/signin/signin.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersGroupsComponent } from './Pages/users-groups/users-groups.component';
import { EmployeeComponent } from './Pages/employee/employee.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { AttendanceDepartureComponent } from './Pages/attendance-departure/attendance-departure.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    UsersGroupsComponent,
    EmployeeComponent,
    NavbarComponent,
    AttendanceDepartureComponent,
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
