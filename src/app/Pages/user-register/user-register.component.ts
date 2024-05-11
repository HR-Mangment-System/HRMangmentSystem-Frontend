import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRegisterService } from 'src/app/Service/user-register.service';
import { UsersGroupsService } from 'src/app/Service/users-groups.service';
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  groups: { id: string, name: string }[] = [];

  constructor(private formBuilder: FormBuilder, private userRegisterService: UserRegisterService, private userGroupsService: UsersGroupsService) { }


  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      userName: ['', [Validators.required, Validators.minLength(4)]], // Use an array for multiple validators
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]], // Use an array for multiple validators
      confirmPassword: ['', Validators.required], // Add confirmPassword field
      groupId: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
    this.fetchGroups();
  }
  fetchGroups() {
    this.userGroupsService.getGroups().subscribe({
      next: (response: any) => {
        // Handle successful registration
        this.groups = response.data.map((group: any) => {
          return { id: group.id, name: group.name };
        });
        console.log('Groups fetched successfully:', this.groups);
      },
      error: (error: any) => {
        // Handle registration error
        console.error('Error fetching groups:', error);
      }
    })
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }



  registerUser(event: any) {
    event.preventDefault();
    if (this.registrationForm.valid) {
      // Form is valid, perform form submission logic here
      const formData = this.registrationForm.value;
      this.userRegisterService.registerUser(formData).subscribe({
        next: (response: any) => {
          // Handle successful registration
          console.log('Registration successful:', response);
        },
        error: (error: any) => {
          // Handle registration error
          console.error('Registration error:', error);
        }
      });
    } else {
      // Form is invalid, mark all fields as touched to display validation errors
      this.registrationForm.markAllAsTouched();
    }
  }
}
