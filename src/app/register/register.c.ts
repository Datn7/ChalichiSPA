import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.c.html',
  styleUrls: ['./register.c.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class RegisterC {
  registerForm: FormGroup<{
    username: FormControl<string>;
    password: FormControl<string>;
  }>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
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
    this.authService.register(this.registerForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/tasks']),
      error: (err) => alert(err.error),
    });
  }
}
