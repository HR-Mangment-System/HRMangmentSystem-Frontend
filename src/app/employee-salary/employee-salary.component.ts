import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { EmployeeSalaryService } from '../Service/employee-salary.service';

@Component({
  selector: 'app-employee-salary',
  templateUrl: './employee-salary.component.html',
  styleUrls: ['./employee-salary.component.css']
})
export class EmployeeSalaryComponent implements OnInit {
  @ViewChild('dateInput') dateInput!: ElementRef<HTMLInputElement>;
  @ViewChild('employeeNameInput') employeeNameInput!: ElementRef<HTMLInputElement>;
  employeeSalaries: any[] = [];

  constructor(private employeeSalaryService: EmployeeSalaryService) { }

  ngOnInit() {
    // Optionally, fetch data for the current month on initialization
    const currentDate = new Date();
    const currentMonth = `${currentDate.getFullYear()}-${('0' + (currentDate.getMonth() + 1)).slice(-2)}`;
    this.fetchEmployeeSalaries('', currentMonth);
  }

  showFormattedDate() {
    const dateValue = this.dateInput.nativeElement.value;
    const employeeName = this.employeeNameInput.nativeElement.value;

    // Log the formatted date to the console
    console.log(dateValue);

    // Fetch employee salaries for the selected date and employee name
    this.fetchEmployeeSalaries(employeeName, dateValue);
  }

  fetchEmployeeSalaries(employeeName: string, date: string) {
    this.employeeSalaryService.getEmployeeSalaries(employeeName, date).subscribe(
      (response) => {
        this.employeeSalaries = response.data;
      },
      (error) => {
        console.error('Error fetching employee salaries:', error);
      }
    );
  }
}
