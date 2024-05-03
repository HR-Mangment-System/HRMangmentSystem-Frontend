import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './Pages/signin/signin.component';
import { UsersGroupsComponent } from './Pages/users-groups/users-groups.component';
import { EmployeeComponent } from './Pages/employee/employee.component';

const routes: Routes = [
  { path: '', component: SigninComponent },
  {path: 'users-groups',component: UsersGroupsComponent},
  {path: 'employee',component: EmployeeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
