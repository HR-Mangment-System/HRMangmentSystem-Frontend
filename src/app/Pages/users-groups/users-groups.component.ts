import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';


@Component({
  selector: 'app-users-groups',
  templateUrl: './users-groups.component.html',
  styleUrls: ['./users-groups.component.css']
})
export class UsersGroupsComponent implements OnInit{
  pagesName: string [] = ['Attendance', 'Employees','Salaries','Settings']; 
  form: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      permissions: this.formBuilder.array([]) 
    });

    this.pagesName.forEach(() => {
      (this.form.get('permissions') as FormArray).push(this.createPermissionFormGroup());
    });
  }

  createPermissionFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      create: [false], 
      read: [false],
      update: [false],
      delete: [false]
    });
  }

  addPermission(): void {
    const permissions = this.form.get('permissions') as FormArray;
    permissions.push(this.createPermissionFormGroup());
  }

  removePermission(index: number): void {
    const permissions = this.form.get('permissions') as FormArray;
    permissions.removeAt(index);
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value); 
    } else {
    }
  }
}
