import { Component, Inject } from '@angular/core';
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

@Component({
  selector: 'app-update-attendence',
  templateUrl: './update-attendence.component.html',
  styleUrls: ['./update-attendence.component.css'],
})
export class UpdateAttendenceComponent {
  timeForm: FormGroup;
  constructor(
    private router: Router,
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
  confirm() {
    this.data.report.arrivalTime = this.timeForm.controls['startTime'].value;
    this.data.report.departureTime = this.timeForm.controls['endTime'].value;
    this.AttendanceService.updateAttendence(this.data.report).subscribe(() => {
      this.router.navigate(['./attendance-departure']);
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
