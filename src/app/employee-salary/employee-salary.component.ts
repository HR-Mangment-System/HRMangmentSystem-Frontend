import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-employee-salary',
  templateUrl: './employee-salary.component.html',
  styleUrls: ['./employee-salary.component.css']
})
export class EmployeeSalaryComponent {
  @ViewChild('dateInput') dateInput!: ElementRef<HTMLInputElement>;

  showFormattedDate(dateValue: string) {
    // Split the date into year and month parts
    const [year, month] = dateValue.split('-');

    // Format the date as mm-dd-yyyy
    const formattedDate = `${month}-01-${year}`;

    // Log the formatted date to the console
    console.log(formattedDate);
  }
}
