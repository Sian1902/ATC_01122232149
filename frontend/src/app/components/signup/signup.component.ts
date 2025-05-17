import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, SignUpDTO } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './signup.component.html',
})
export class SignUpComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder,private authService: AuthService,private router: Router) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: FormGroup): null | { mismatch: true } {
    return group.get('password')?.value === group.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Signup form data:', this.signupForm.value);
      const data:SignUpDTO = {
        name: this.signupForm.value.name,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password
      };
      this.authService.signUp(data).subscribe({
        next: (response) => {
          alert('Signup successful!');
          console.log('Signup response:', response);
          this.router.navigate(['/signin']); 
        },
        error: (error) => {
          alert('Signup failed: ' + error.toString());
          console.error('Signup error:', error);
        }
      });
    }
  }
}
