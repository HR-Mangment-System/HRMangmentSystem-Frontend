import { Component } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { UsersGroupsService } from 'src/app/Service/users-groups.service';

@Component({
  selector: 'app-users-groups',
  templateUrl: './users-groups.component.html',
  styleUrls: ['./users-groups.component.css']
})
export class UsersGroupsComponent {

  constructor(private groupService: UsersGroupsService) { }

  pages: Page[] = [
    { name: 'Attendance', create: false, read: false, update: false, delete: false },
    { name: 'Employees', create: false, read: false, update: false, delete: false },
    { name: 'Salaries', create: false, read: false, update: false, delete: false },
    { name: 'Settings', create: false, read: false, update: false, delete: false },
  ];

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ]),
    permissions: new FormArray([
      new FormGroup({
        name: new FormControl('Attendance'),
        create: new FormControl(false),
        read: new FormControl(false),
        update: new FormControl(false),
        delete: new FormControl(false),
      }),
      new FormGroup({
        name: new FormControl('Employees'),
        create: new FormControl(false),
        read: new FormControl(false),
        update: new FormControl(false),
        delete: new FormControl(false),
      }),
      new FormGroup({
        name: new FormControl('Salaries'),
        create: new FormControl(false),
        read: new FormControl(false),
        update: new FormControl(false),
        delete: new FormControl(false),
      }),
      new FormGroup({
        name: new FormControl('Settings'),
        create: new FormControl(false),
        read: new FormControl(false),
        update: new FormControl(false),
        delete: new FormControl(false),
      }),
    ]),
  });

  get getName(): any {
    return this.form.controls.name;
  }

  get getPermissions(): FormArray {
    return this.form.get('permissions') as FormArray;
  }

  setPermissions(event: any, index: number, controlName: string): void {
    const permission = this.getPermissions.controls[index];
    permission.get(controlName)?.setValue(event.target.checked);
  }
  ischanged: boolean = false;

  onSubmit(): void {
    console.log(this.form.value);
    for (let i = 0; i < this.getPermissions.length; i++) {
      if (this.getPermissions.controls[i].value.create || this.getPermissions.controls[i].value.read || this.getPermissions.controls[i].value.update || this.getPermissions.controls[i].value.delete) {
        this.ischanged = true;
        break;
      }
    }

    if (this.form.controls.name.valid && this.ischanged) {
      this.groupService.createGroup(this.form.value).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      (this.form.controls.name.invalid) ? this.form.controls.name.markAsDirty():this.form.controls.permissions.setErrors({ invalid: true });
    }
  }
}

interface Page {
  name: string;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}
