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
@Component({
  selector: 'app-update-attendence',
  templateUrl: './update-attendence.component.html',
  styleUrls: ['./update-attendence.component.css'],
})
export class UpdateAttendenceComponent implements OnInit {
  timeForm: FormGroup;
  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    public data: { report: any },
    public AttendanceService: AttendanceService,
    private fb: FormBuilder
  ) {
    this.timeForm = this.fb.group(
      {
        startTime: ['', Validators.required],
        endTime: ['', Validators.required],
      },
      { validator: this.timeOrderValidator() }
    );
  }
  ngOnInit(): void {
    console.log(this.data.report);
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
}
