import { AttendanceService } from './../../Service/attendance.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  constructor(
    public AttendanceService: AttendanceService,
    public router: Router,
    @Inject(MAT_DIALOG_DATA)
    public data: { id: 0; alerttype: string }
  ) {}
  confirm() {
    if (this.data.alerttype == 'delete') {
      this.AttendanceService.deleteAttendance(this.data.id).subscribe(
        () => {
          this.router.navigate(['./attendance-departure']);
        },
        (error) => {
          console.error('Error deleting attendance:', error);
        }
      );
    }
  }
}
