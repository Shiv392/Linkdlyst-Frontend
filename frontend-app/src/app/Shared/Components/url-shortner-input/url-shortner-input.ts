import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonInput } from '../common-input/common-input';
import { CommonButton } from '../common-button/common-button';
import { AuthService } from '../../Services/Auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-url-shortner-input',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CommonInput, CommonButton],
  templateUrl: './url-shortner-input.html',
  styleUrl: './url-shortner-input.css',
})
export class UrlShortnerInput {

  private authService = inject(AuthService);
  private router = inject(Router);

  constructor(){

  }

    readonly shortenForm = new FormGroup({
      name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(50)] }),
        url: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    });

    shortenUrl(): void {
        if (this.shortenForm.invalid) {
            this.shortenForm.markAllAsTouched();
            return;
        }

        if(!this.authService.isLoggedIn()){
              this.router.navigate(["/auth/login"])
        }
        else{
          this.router.navigate(['/links']);
        }
    }
}
