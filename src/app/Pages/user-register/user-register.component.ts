import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRegisterService } from 'src/app/Service/user-register.service';
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registrationForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder , private userRegisterService: UserRegisterService) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      userName: ['', [Validators.required, Validators.minLength(4)]], // Use an array for multiple validators
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]], // Use an array for multiple validators
      confirmPassword: ['', Validators.required], // Add confirmPassword field
      groupId: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }



  registerUser(Event : any) {
    Event.preventDefault();
    if (this.registrationForm.valid) {
      // Form is valid, perform form submission logic here
      // console.log(this.registrationForm.value);
      this.userRegisterService.registerUser(this.registrationForm.value).subscribe({
        next: (response:any) => {
          // Handle successful registration
          console.log('Registration successful:', response);
        },
        error: (error:any) => {
          // Handle registration error
          console.error('Registration error:', error);
        }
      })
    } else {
      // Form is invalid, mark all fields as touched to display validation errors
      this.registrationForm.markAllAsTouched();
    }
  }
}
