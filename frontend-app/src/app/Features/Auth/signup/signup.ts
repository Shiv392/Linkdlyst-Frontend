import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonButton } from '../../../Shared/Components/common-button/common-button';
import { CommonInput } from '../../../Shared/Components/common-input/common-input';

@Component({
  selector: 'app-signup',
  imports: [CommonButton, CommonInput, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  private readonly fb = inject(FormBuilder).nonNullable;

  public signupForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(128)]],
  });

  submitted = false;
  showPassword = false;

  inputClass(control: AbstractControl): string {
    const hasError = control.invalid && (control.touched || this.submitted);

    return `h-10 w-full rounded-lg border bg-white pl-10 pr-4 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
      hasError
        ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
        : 'border-slate-200 focus:border-[#d64545] focus:ring-red-50'
    }`;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  signUp(): void {
    this.submitted = true;

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    // Registration will be connected to the authentication API when available.
  }
}
