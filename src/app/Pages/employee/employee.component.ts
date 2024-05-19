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
  employees: Employee[] = [];
  employee: Employee = this.getEmptyEmployee();
  isEditMode: boolean = false;

  constructor(private empSer: EmployeeService, private empDepSer: EmployeeDepartmentService) {}

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.fetchDepartments().then(() => {
      this.fetchEmployees();
    });
  }

  fetchDepartments(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.empDepSer.getDepartments().subscribe(
        (response: any) => {
          if (response.succeeded && response.data && Array.isArray(response.data)) {
            this.departments = response.data;
            console.log('Departments fetched successfully:', this.departments);
            resolve();
          } else {
            console.error('Unexpected response format:', response);
            reject('Failed to fetch departments');
          }
        },
        (error) => {
          console.error('Error fetching departments:', error);
          reject(error);
        }
      );
    });
  }

  fetchEmployees(): void {
    this.empSer.getEmployees().subscribe(
      (employees: Employee[]) => {
        this.employees = employees;
        console.log('Employees fetched successfully:', this.employees);
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  addOrUpdateEmp(): void {
    if (this.isEditMode) {
      this.updateEmp();
    } else {
      this.addEmp();
    }
  }

  addEmp(): void {
    this.empSer.addEmp(this.employee).subscribe(
      (response: any) => {
        if (response.succeeded) {
          console.log('Employee added successfully:', response);
          this.message = response.message;
          this.loadInitialData();
          this.resetForm();
        } else {
          this.errMes = response.message || 'Employee Addition Failed!';
        }
      },
      (error) => {
        console.error('Error adding employee:', error);
        this.errMes = 'Employee Addition Failed!';
      }
    );
  }

  updateEmp(): void {
    const updatedEmployee: Employee = { ...this.employee };

    console.log('Updated Employee before sending:', updatedEmployee);

    this.empSer.updateEmp(updatedEmployee).subscribe(
      (response: any) => {
        if (response.succeeded) {
          console.log('Employee edited successfully:', response);
          this.message = response.message;
          this.loadInitialData();
          this.resetForm();
          this.isEditMode = false;
        } else {
          this.errMes = response.message || 'Employee Edition Failed!';
        }
      },
      (error) => {
        console.error('Error editing employee:', error);
        this.errMes = 'Employee Edition Failed!';
      }
    );
  }

  deleteEmp(nationalId: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.empSer.deleteEmp(nationalId).subscribe(
        (response: any) => {
          if (response.succeeded) {
            console.log('Employee deleted successfully:', response);
            this.message = response.message;
            this.loadInitialData();
          } else {
            this.errMes = response.message || 'Employee Deletion Failed!';
          }
        },
        (error) => {
          console.error('Error deleting employee:', error);
          this.errMes = 'Employee Deletion Failed!';
        }
      );
    }
  }

  editEmp(emp: Employee): void {
    this.employee = { ...emp };
    this.isEditMode = true;
  }

  resetForm(): void {
    this.employee = this.getEmptyEmployee();
    this.isEditMode = false;
  }

  getEmptyEmployee(): Employee {
    return {
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
      departmentName: '',
    };
  }

  getDepartmentName(departmentId: number): string {
    console.log('getDepartmentName() called with departmentId:', departmentId); // Add this logging statement
    const department = this.departments.find(dep => dep.id === departmentId);
    console.log(`Finding department for ID ${departmentId}:`, department); // Add this logging statement
    return department ? department.name : 'Unknown';
  }
}
