import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonInput } from '../common-input/common-input';
import { CommonButton } from '../common-button/common-button';

@Component({
  selector: 'app-url-shortner-input',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CommonInput, CommonButton],
  templateUrl: './url-shortner-input.html',
  styleUrl: './url-shortner-input.css',
})
export class UrlShortnerInput {

  constructor(){

  }

    readonly shortenForm = new FormGroup({
        url: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    });

    shortenUrl(): void {
        if (this.shortenForm.invalid) {
            this.shortenForm.markAllAsTouched();
            return;
        }

        // URL shortening will be connected to the API in the feature workflow.
    }
}
