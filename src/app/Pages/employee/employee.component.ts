import { Component } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  employee: any = {
    personal: {
      name: '',
      address: '',
      phoneNumber: '',
      dateOfBirth: '',
      gender: '',
      nationalID: '',
      nationality: ''
    },
    workRelated: {
      contractDate: '',
      salary: '',
      attendanceTime: '',
      departureTime: ''
    }
  };
required: any;

  constructor() {}

  saveEmployee(): void {
    if (this.validateForm()) {
      // Send employee data to the server
      console.log('Employee data saved:', this.employee);
    }
  }

  validateForm(): boolean {
    let isValid = true;
    const errorMessage = [];

    // Personal data validation
    for (const key of Object.keys(this.employee.personal)) {
      if (!this.employee.personal[key]) {
        errorMessage.push(`Please enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        isValid = false;
      }
    }

    // Work-related data validation
    for (const key of Object.keys(this.employee.workRelated)) {
      if (!this.employee.workRelated[key]) {
        errorMessage.push(`Please enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        isValid = false;
      }
    }

    // Other validations
    if (!this.isValidPhoneNumber(this.employee.personal.phoneNumber)) {
      errorMessage.push('Please enter a valid phone number');
      isValid = false;
    }

    if (!this.isValidNationalID(this.employee.personal.nationalID)) {
      errorMessage.push('The national ID must be at least 14 digits');
      isValid = false;
    }

    if (!isValid) {
      alert(errorMessage.join('\n'));
    }

    return isValid;
  }

  isValidPhoneNumber(phoneNumber: string): boolean {
    const phoneRegex = /^\d{11}$/;
    return phoneRegex.test(phoneNumber);
  }

  isValidNationalID(nationalID: string): boolean {
    return nationalID.length >= 14;
  }

  editEmployee(): void {
    // Add edit logic here
    console.log('Edit employee');
  }

  deleteEmployee(): void {
    // Add delete logic here
    console.log('Delete employee');
  }
}
