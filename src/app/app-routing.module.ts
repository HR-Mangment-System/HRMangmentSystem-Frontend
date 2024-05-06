import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './Pages/signin/signin.component';
import { UsersGroupsComponent } from './Pages/users-groups/users-groups.component';
import { UserRegisterComponent } from './Pages/user-register/user-register.component';
import { EmployeeComponent } from './Pages/employee/employee.component';
import { AttendanceDepartureComponent } from './Pages/attendance-departure/attendance-departure.component';
import { EmployeeSalaryComponent } from './employee-salary/employee-salary.component';
import { AnnualHolidaysComponent } from './Pages/annual-holidays/annual-holidays.component';

const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'users-groups', component: UsersGroupsComponent },
  { path: 'user-register', component: UserRegisterComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'attendance-departure', component: AttendanceDepartureComponent },
  { path: 'employee-salary', component: EmployeeSalaryComponent },
  { path: 'attendance-departure', component: AttendanceDepartureComponent },
  { path: 'annual-holidays', component: AnnualHolidaysComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
