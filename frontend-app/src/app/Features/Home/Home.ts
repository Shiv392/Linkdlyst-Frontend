import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { CommonButton } from "../../Shared/Components/common-button/common-button";
import { CommonInput } from "../../Shared/Components/common-input/common-input";

@Component({
    selector: "app-home",
    imports: [CommonButton, CommonInput, ReactiveFormsModule, RouterLink],
    templateUrl: "./Home.html",
})
export class Home{

    public router = inject(Router);

    dots = Array(15);
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

    public redirectLogin(): void{
        this.router.navigate(['/auth/login']);
    }
}
