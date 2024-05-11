import { EmployeeDepartmentService } from './../../Service/employee-department.service';
import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit{
  employeeDepts: any = null;
  constructor(private _empDepartments:EmployeeDepartmentService,
    private dialogref:MatDialog
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

  delete(id: number) {
    // this.dialogref.open(, {
    //   data: { id: id, alerttype: 'delete' },
    // });
  }

}
