import { EmployeeDepartmentService } from './../../Service/employee-department.service';
import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/Pop up/alert/alert.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit{
  employeeDepts: any = null;
  constructor(private _empDepartments:EmployeeDepartmentService,
    private dialogref:MatDialog,
    private router:Router
  ) { }

  ngOnInit(): void {
    this._empDepartments.getDepartments().subscribe({
      next: (data:any) => {
        this.employeeDepts = data.data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  deleteDepartment(id: number) {
    const dialogRef = this.dialogref.open(AlertComponent, {
      data: { id: id, alerttype: 'delete', entityType: 'department' }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle the result if needed
      if (result) {
        // Reload departments or any other action you need after deletion
        this.reloadDepartments();
      }
    });
  }

  reloadDepartments() {
    // Reload departments or navigate to the previous page
    this.router.navigateByUrl(this.router.url);
  }
}
