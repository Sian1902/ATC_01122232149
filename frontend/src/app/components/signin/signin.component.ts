import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, SignInDTO } from '../../services/auth.service';
import { SignInResponse } from './signin-response';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule], // ✅ ReactiveFormsModule is required
  templateUrl: './signin.component.html',
})
export class SignInComponent {
  signinForm: FormGroup;

  constructor(private fb: FormBuilder,private authService: AuthService,private userService: UserService,private router: Router) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signinForm.valid) {
     const data:SignInDTO = {email: this.signinForm.value.email, password: this.signinForm.value.password};
     this.authService.signIn(data).subscribe({
      next: (response: string) => {
          const parsed: SignInResponse = JSON.parse(response);
          localStorage.setItem('jwtToken', parsed.token);
          console.log('Parsed response:', parsed.token);
          this.userService.setUser(parsed.user);
          this.router.navigate(['/home']);
      },
      error: (error) => {
        alert('Signin failed: ' + error.toString());
        console.error('Signin error:', error);
        }
      })
    }
  }
}