import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  UserDto } from '@auth/interfaces/userDto.interface';
import { AuthService } from '@auth/services/auth.service';
import { FormUtils } from 'src/app/utils/form-utils';


@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  formUtils = FormUtils;
  fb = inject(FormBuilder);
  hasError = signal(false);
  isPosting = signal(false);
  router = inject(Router);

  authService = inject(AuthService);

  registerForm = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telephone: ['', [Validators.required, Validators.pattern('[0-9]{9}'), Validators.maxLength(9)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.registerForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }
    console.log(this.registerForm.value);
    const newUser: UserDto = {
      firstname: this.registerForm.value.name!,
      lastname: this.registerForm.value.surname!,
      email: this.registerForm.value.email!,
      telephone: this.registerForm.value.telephone!,
      password: this.registerForm.value.password!,
    };
    this.authService.register(newUser).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigateByUrl('/');
        return;
      }

      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
    });
  }

  // Check Authentication

  // Registro

  // Logout


}
