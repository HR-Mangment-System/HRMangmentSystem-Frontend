import { EmployeeService } from 'src/app/Service/employee.service';
import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AttendanceService } from 'src/app/Service/attendance.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-manage-attendence',
  templateUrl: './manage-attendence.component.html',
  styleUrls: ['./manage-attendence.component.css'],
})
export class manageattendenceComponent implements OnInit {
  timeForm: FormGroup;
  Flag = true;
  employees: any;
  filterdemployee: Observable<any> = new Observable();
  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    public data: { report: any },
    public AttendanceService: AttendanceService,
    private fb: FormBuilder,
    private EmployeeService: EmployeeService
  ) {
    this.timeForm = this.fb.group(
      {
        startTime: ['', Validators.required],
        endTime: ['', Validators.required],
        EmployeeNames: ['', Validators.required],
      },
      { validator: this.timeOrderValidator() }
    );
  }
  ngOnInit(): void {
    if (this.data.report.employeeName == '') {
      this.Flag = false;
      this.EmployeeService.getEmployees().subscribe({
        next: (data: any) => {
          this.employees = data.data;
          console.log(this.employees);
        },
      });
      this.filterdemployee = this.timeForm.controls[
        'EmployeeNames'
      ].valueChanges.pipe(
        startWith(''),
        map((value) => {
          const name = typeof value === 'string' ? value : value?.name;

          return name ? this._filter(name as string) : this.employees;
        })
      );
    }
  }
  confirm() {
    this.data.report.arrivalTime = this.timeForm.controls['startTime'].value;
    this.data.report.departureTime = this.timeForm.controls['endTime'].value;
    this.AttendanceService.updateAttendence(this.data.report).subscribe({
      next: (data: any) => {
        if (data.length == 0)
          this._snackBar.open('No Content', 'X', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['red-snackbar', 'mt-5'],
            duration: 2000,
          });
        else
          this._snackBar.open('Edited Successfully', 'X', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['green-snackbar', 'mt-5'],
            duration: 2000,
          });
      },
      error: (error) => {
        this._snackBar.open('No Content', 'X', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['red-snackbar', 'mt-5'],
          duration: 2000,
        });
      },
    });
  }

  timeOrderValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const startTime = control.get('startTime')?.value;
      const endTime = control.get('endTime')?.value;

      if (startTime && endTime && startTime >= endTime) {
        return { timeOrder: true };
      }
      return null;
    };
  }
  displayFn(user: any): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.employees.filter((employee: any) =>
      employee.name.toLowerCase().includes(filterValue)
    );
  }
}
