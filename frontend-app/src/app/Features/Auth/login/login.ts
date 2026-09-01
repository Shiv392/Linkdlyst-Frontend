import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonButton } from '../../../Shared/Components/common-button/common-button';
import { CommonInput } from '../../../Shared/Components/common-input/common-input';

@Component({
  selector: 'app-login',
  imports: [CommonButton, CommonInput, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly fb = inject(FormBuilder).nonNullable;

  readonly loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(128)]],
  });

  submitted = false;
  showPassword = false;

  inputClass(control: AbstractControl): string {
    const hasError = control.invalid && (control.touched || this.submitted);

    return `h-12 w-full rounded-lg border bg-white pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
      hasError
        ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
        : 'border-slate-200 focus:border-[#d64545] focus:ring-red-50'
    }`;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  signIn(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    // Authentication will be connected to LoginService when the API contract is available.
  }
}
