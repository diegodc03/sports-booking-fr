import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  UserDto } from '@auth/interfaces/userDto.interface';
import { AuthService } from '@auth/services/auth.service';
import { FormUtils } from 'src/app/utils/form-utils';
import { RouterLinkActive, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent {

  formUtils = FormUtils;
  fb = inject(FormBuilder);
  hasError = signal(false);
  errorMessage = signal<string | null>(null);
  isPosting = signal(false);
  router = inject(Router);

  authService = inject(AuthService);

  registerForm = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telephone: ['', [Validators.required, Validators.pattern('[0-9]{9}'), Validators.maxLength(9)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    this.errorMessage.set(null);

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      // Mensaje personalizado para errores DE FORMULARIO
      this.errorMessage.set('Por favor, revise los campos marcados en rojo.');
      this.clearErrorAfterDelay();
      return;
    }
    console.log(this.registerForm.value);
    const newUser: UserDto = {
      firstname: this.registerForm.value.name!,
      lastname: this.registerForm.value.surname!,
      email: this.registerForm.value.email!,
      telephone: this.registerForm.value.telephone!,
      password: this.registerForm.value.password!,
      confirmPassword: this.registerForm.value.confirmPassword!,
    };
    this.authService.register(newUser).subscribe({
      
      next: (response) => {
        this.router.navigateByUrl('/');
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage.set(err.error || 'Ocurrió un error desconocido.');
        this.clearErrorAfterDelay();
      }
    });
  }

  private clearErrorAfterDelay(delay: number = 5000) {
    setTimeout(() => {
      this.errorMessage.set(null);
    }, delay);
  }

  // Check Authentication

  // Registro

  // Logout


}
