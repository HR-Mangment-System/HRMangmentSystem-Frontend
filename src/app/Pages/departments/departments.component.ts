import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmployeeDepartmentService } from './../../Service/employee-department.service';
import { AlertComponent } from 'src/app/Pop up/alert/alert.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  @ViewChild('addEditDepartmentModal') addEditDepartmentModal!: TemplateRef<any>;
  employeeDepts: any[] = [];
  departmentForm!: FormGroup;
  selectedDepartment: any = null;

  constructor(
    private fb: FormBuilder,
    private _empDepartments: EmployeeDepartmentService,
    private dialog: MatDialog,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadDepartments();
    this.departmentForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  loadDepartments(): void {
    this._empDepartments.getDepartments().subscribe({
      next: (data: any) => {
        this.employeeDepts = data.data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  openAddEditDepartmentModal(department: any): void {
    this.selectedDepartment = department;
    if (department) {
      this.departmentForm.patchValue(department);
    } else {
      this.departmentForm.reset();
    }
    this.modalService.open(this.addEditDepartmentModal);
  }

  saveDepartment(): void {
    if (this.departmentForm.invalid) {
      return;
    }

    const departmentData = {
      ...this.departmentForm.value,
      id: this.selectedDepartment ? this.selectedDepartment.id : 0,
      isDeleted: false
    };

    if (this.selectedDepartment) {
      this._empDepartments.updateDepartment(departmentData).subscribe({
        next: () => {
          this.modalService.dismissAll();
          this.loadDepartments();
        },
        error: (error) => {
          console.log('Error updating department:', error);
        }
      });
    } else {
      this._empDepartments.addDepartment(departmentData).subscribe({
        next: () => {
          this.modalService.dismissAll();
          this.loadDepartments();
        },
        error: (error) => {
          console.log('Error adding department:', error);
        }
      });
    }
  }

  confirmDeleteDepartment(id: number): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      data: { id: id, alerttype: 'delete', entityType: 'department' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteDepartment(id);
      }
    });
  }

  deleteDepartment(id: number): void {
    this._empDepartments.deleteDepartment(id).subscribe({
      next: () => {
        this.loadDepartments();
      },
      error: (error) => {
        console.log('Error deleting department:', error);
      }
    });
  }
}
