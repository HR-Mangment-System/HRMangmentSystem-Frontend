import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeDepartmentService } from './../../Service/employee-department.service'; // Import your department service
import { AttendanceService } from 'src/app/Service/attendance.service'; // Import your employee service
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  constructor(
    private departmentService: EmployeeDepartmentService,
    private attendanceService: AttendanceService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    public data: { id: 0; alerttype: string; entityType: string }
  ) {}

  confirm() {
    if (this.data.alerttype === 'delete') {
      switch (this.data.entityType) {
        case 'department':
          this.departmentService.deleteDepartment(this.data.id).subscribe(
            () => {
              this.snackBar.open('Deleted Successfully', 'X', {
                horizontalPosition: 'end',
                verticalPosition: 'top',
                panelClass: ['green-snackbar', 'mt-5'],
                duration: 2000,
              });
            },
            (error) => {
              this.snackBar.open('Error Deleting Department ', 'X', {
                horizontalPosition: 'end',
                verticalPosition: 'top',
                panelClass: ['red-snackbar', 'mt-5'],
                duration: 2000,
              });
            }
          );
          break;
        case 'attendance':
          this.attendanceService.deleteAttendance(this.data.id).subscribe(
            () => {
              this.navigateBack();
            },
            (error) => {
              console.error('Error deleting attendance:', error);
            }
          );
          break;
        default:
          console.error('Invalid entityType:', this.data.entityType);
          break;
      }
    }
  }

  private navigateBack() {
    const previousUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.router.navigateByUrl(previousUrl);
  }
}
