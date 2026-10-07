import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonInput } from "../../Shared/Components/common-input/common-input";
import { CommonNavbar } from "../../Shared/Components/common-navbar/common-navbar";
import { UrlShortnerInput } from "../../Shared/Components/url-shortner-input/url-shortner-input";

@Component({
    selector: "app-home",
    imports: [CommonInput, ReactiveFormsModule, CommonNavbar, UrlShortnerInput],
    templateUrl: "./Home.html",
})
export class Home{

    readonly navigationLinks = [
        { label: 'Home', route: '/home' },
        { label: 'My links', route: '/links' },
    ];

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

}
