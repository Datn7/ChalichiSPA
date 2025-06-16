import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginDto } from '../../models/user.model'; // adjust if needed

@Component({
  selector: 'app-login',
  templateUrl: './login.c.html',
  styleUrls: ['./login.c.scss'],
})
export class LoginC {
  loginForm: FormGroup<{
    username: FormControl<string>;
    password: FormControl<string>;
  }>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      password: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  onSubmit() {
    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/tasks']),
      error: (err) => alert(err.error),
    });
  }
}
