import { Component, OnInit } from '@angular/core';
import { Employee } from './../../Models/employee';
import { EmployeeService } from 'src/app/Service/employee.service';
import { EmployeeDepartmentService } from 'src/app/Service/employee-department.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  minContractDate: string = '2008-01-01';
  message: string = '';
  errMes: string = '';
  departments: any[] = [];
  employee: Employee = {
    name: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    dateOfBirth: '',
    nationality: '',
    nationalId: '',
    hireDate: '',
    salary: 0,
    attendanceTime: '',
    departureTime: '',
    isDeleted: false,
    departmentId: 0,
  };

  constructor(private empSer: EmployeeService, private empDepSer: EmployeeDepartmentService) {}

  ngOnInit(): void {
    this.empDepSer.getDepartments().subscribe(
      (response: any) => {
        if (Array.isArray(response)) {
          this.departments = response;
        } else if (response.data && Array.isArray(response.data)) {
          this.departments = response.data;
        } else {
          console.error('Unexpected response format:', response);
        }
      },
      (error) => {
        console.error('Error fetching departments:', error);
      }
    );
  }

  addEmp(): void {
    this.empSer.addEmp(this.employee).subscribe(
      (response) => {
        console.log('Employee added successfully:', response);
        this.message = 'Employee Added Successfully!';
        this.resetForm();
      },
      (error) => {
        console.error('Error adding employee:', error);
        this.errMes = 'Employee Addition Failed!';
      }
    );
  }

  updateEmp(): void {
    this.empSer.updateEmp(this.employee).subscribe(
      (response) => {
        console.log('Employee edited successfully:', response);
        this.message = 'Employee Edited Successfully!';
        this.resetForm();
      },
      (error) => {
        console.error('Error editing employee:', error);
        this.errMes = 'Employee Edition Failed!';
      }
    );
  }

  deleteEmp(nationalId: string): void {
    this.empSer.deleteEmp(nationalId).subscribe(
      () => {
        console.log('Employee deleted successfully');
        this.message = 'Employee Deleted Successfully!';
        this.resetForm();
      },
      (error) => {
        console.error('Error deleting employee:', error);
        this.errMes = 'Employee Deletion Failed!';
      }
    );
  }

  resetForm(): void {
    this.employee = {
      name: '',
      email: '',
      phone: '',
      address: '',
      gender: '',
      dateOfBirth: '',
      nationality: '',
      nationalId: '',
      hireDate: '',
      salary: 0,
      attendanceTime: '',
      departureTime: '',
      isDeleted: false,
      departmentId: 0,
    };
  }
}
