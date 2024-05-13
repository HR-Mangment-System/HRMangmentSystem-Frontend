import { Employee } from './../../Models/employee';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from 'src/app/Service/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent {
  minContractDate: string = '2008-01-01';
  // employee: any = {
  //   personal: {
  //     name: '',
  //     address: '',
  //     phoneNumber: '',
  //     dateOfBirth: '',
  //     gender: '',
  //     nationalID: '',
  //     nationality: ''
  //   },
  //   workRelated: {
  //     contractDate: '',
  //     salary: '',
  //     attendanceTime: '',
  //     departureTime: ''
  //   }
  // };
  message: string = '';
  errMes: string = '';
  employee: Employee = {} as Employee;
  // employee: Employee = {
  //   name: '',
  //   email: '',
  //   phone: '',
  //   address: '',
  //   gender: '',
  //   dateOfBirth: '',
  //   nationality: '',
  //   nationalId: '',
  //   hireDate: '',
  //   salary: 0,
  //   attendanceTime: '',
  //   departureTime: '',
  //   isDeleted: false,
  //   departmentId: 0,
  // };
  constructor(private empSer: EmployeeService) {}
  addEmp() {
    this.empSer.addEmp(this.employee).subscribe(
      (response) => {
        console.log('Employee added successfully:', response);
        this.message = 'Employee Added Successfully!';
        // Do something with the response if needed
      },
      (error) => {
        console.error('Error adding employee:', error);
        this.errMes = 'Employee Added Faild!';
        // Handle error
      }
    );
  }
  updateEmp() {
    this.empSer.updateEmp(this.employee).subscribe(
      (response) => {
        console.log('Employee editted successfully:', response);
        this.message = 'Employee Editted Successfully!';
        // Do something with the response if needed
      },
      (error) => {
        console.error('Error editting employee:', error);
        this.errMes = 'Employee Editted Faild!';
        // Handle error
      }
    );
  }
  deleteEmp(nationalId: string) {
    this.empSer.deleteEmp(nationalId).subscribe(
      (response) => {
        console.log('Employee deleted successfully:', response);
        this.message = 'Employee Deleted Successfully!';
        // Do something with the response if needed
      },
      (error) => {
        console.error('Error deleting employee:', error);
        this.errMes = 'Employee Deletion Failed!';
        // Handle error
      }
    );
  }
  // saveEmployee(): void {
  //   if (this.validateForm()) {
  //     this.http.post('https://localhost:44337/api/Employees/AddEmployee', this.employee)
  //       .subscribe(
  //         (response) => {
  //           console.log('Employee data saved:', response);
  //           this.message="Employee Added Successfully!"
  //           // Reset form after successful save
  //           this.resetForm();
  //         },
  //         (error) => {
  //           console.error('Error saving employee:', error);
  //         }
  //       );
  //   }
  // }

  // editEmployee(): void {
  //   if (this.employee.personal.nationalID) {
  //     this.http.get(`https://localhost:44337/api/Employees/GetEmployeeByNationalId?NationalId=${this.employee.personal.nationalID}`)
  //       .subscribe(
  //         (response) => {
  //           console.log('Employee data retrieved by national ID:', response);
  //           // Populate form fields with retrieved data for editing
  //           this.employee = response;
  //         },
  //         (error) => {
  //           console.error('Error retrieving employee by national ID:', error);
  //         }
  //       );
  //   } else {
  //     console.error('National ID is required to search for an employee.');
  //   }
  // }

  // deleteEmployee(): void {
  //   if (this.employee.personal.nationalID) {
  //     this.http.delete(`https://localhost:44337/api/Employees/DeleteEmployee?NationalId=${this.employee.personal.nationalID}`)
  //       .subscribe(
  //         (response) => {
  //           console.log('Employee deleted successfully:', response);
  //           // Reset form after successful deletion
  //           this.resetForm();
  //         },
  //         (error) => {
  //           console.error('Error deleting employee:', error);
  //         }
  //       );
  //   } else {
  //     console.error('National ID is required to delete an employee.');
  //   }
  // }

  // validateForm(): boolean {
  //   let isValid = true;
  //   const errorMessage = [];

  //   // Personal data validation
  //   for (const key of Object.keys(this.employee.personal)) {
  //     if (!this.employee.personal[key]) {
  //       errorMessage.push(`Please enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
  //       isValid = false;
  //     }
  //   }

  //   // Work-related data validation
  //   for (const key of Object.keys(this.employee.workRelated)) {
  //     if (!this.employee.workRelated[key]) {
  //       errorMessage.push(`Please enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
  //       isValid = false;
  //     }
  //   }

  //   // Other validations
  //   if (!this.isValidPhoneNumber(this.employee.personal.phoneNumber)) {
  //     errorMessage.push('Please enter a valid phone number');
  //     isValid = false;
  //   }

  //   if (!this.isValidNationalID(this.employee.personal.nationalID)) {
  //     errorMessage.push('The national ID must be at least 14 digits');
  //     isValid = false;
  //   }

  //   if (!isValid) {
  //     alert(errorMessage.join('\n'));
  //   }

  //   return isValid;
  // }

  // isValidPhoneNumber(phoneNumber: string): boolean {
  //   const phoneRegex = /^\d{11}$/;
  //   return phoneRegex.test(phoneNumber);
  // }

  // isValidNationalID(nationalID: string): boolean {
  //   return nationalID.length >= 14;
  // }

  // resetForm(): void {
  //   this.employee = {
  //     personal: {
  //       name: '',
  //       address: '',
  //       phoneNumber: '',
  //       dateOfBirth: '',
  //       gender: '',
  //       nationalID: '',
  //       nationality: ''
  //     },
  //     workRelated: {
  //       contractDate: '',
  //       salary: '',
  //       attendanceTime: '',
  //       departureTime: ''
  //     }
  //   };
  // }
}
