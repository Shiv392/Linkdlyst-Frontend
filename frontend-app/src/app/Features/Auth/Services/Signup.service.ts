import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { signupApiBody, signupResponse } from "../Models/signup";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "../../../Environments/environment";
import { AuthControllerService } from "../../../Controllers/AuthController.service";

@Injectable({
    providedIn: "root"
})
export class SignupService {

    public httpClient = inject(HttpClient);
    public authControllerService = inject(AuthControllerService);


    public signupUser(signupApiBody: signupApiBody): Observable<signupResponse> {
        const url = environment.baseURL + this.authControllerService.signup;

        return this.httpClient.post<signupResponse>(url, signupApiBody)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return throwError(() => error.error)
                }
                )
            )
    }
}