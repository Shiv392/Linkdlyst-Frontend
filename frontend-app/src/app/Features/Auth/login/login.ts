import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonButton } from '../../../Shared/Components/common-button/common-button';
import { CommonInput } from '../../../Shared/Components/common-input/common-input';
import { LoginService } from '../Services/Login.service';
import { Subject, takeUntil } from 'rxjs';
import { loginApiResponse } from '../Models/login';
import { CommonLoaderService } from '../../../Shared/Services/CommonLoaderService.service';
import { NotificationService } from '../../../Shared/Services/Notification.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [CommonButton, CommonInput, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnDestroy {

  private readonly fb = inject(FormBuilder).nonNullable;
  private loginService = inject(LoginService);
  private loaderService = inject(CommonLoaderService);
  private notificationService = inject(NotificationService);
  private cookieService = inject(CookieService);

  readonly loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(128)]],
  });

  submitted = false;
  showPassword = false;

  public subject$ = new Subject<void>();

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

    this.loaderService.showLoader();

    // Authentication will be connected to LoginService when the API contract is available.
    const apibody = {
      email : this.loginForm.value.email?.trim()?.toLowerCase() || '',
      password : this.loginForm.value.password?.trim() || ''
    }
    this.loginService.loginUser(apibody).pipe(takeUntil(this.subject$))
    .subscribe((response: loginApiResponse)=>{
      this.notificationService.notificationSubject$.next({
        type: 'success',
        summary: 'Success',
        detail: response.message,
      });
      this.loaderService.hideLoader();
    })
  }

  ngOnDestroy(): void {
    this.subject$.next();
    this.subject$.complete();
  }
}
