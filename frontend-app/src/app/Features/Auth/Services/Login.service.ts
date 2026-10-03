import { inject, Injectable } from "@angular/core";
import { LoginApiBody } from "../Models/LoginApiBody.interface";
import { Observable } from "rxjs/internal/Observable";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { AuthControllerService } from "../../../Controllers/AuthController.service";
import { throwError } from "rxjs/internal/observable/throwError";
import { catchError } from "rxjs";
import { environment } from "../../../Environments/environment";
import { LoginResponse } from "../Models/LoginResponse";

@Injectable({
    providedIn : 'root'
})
export class LoginService{

    private http = inject(HttpClient);
    private AuthControllerService = inject(AuthControllerService);
    
    public loginUser(LoginApibody: LoginApiBody) : Observable<LoginResponse> {
        const url = environment.baseURL + this.AuthControllerService.login;
        return this.http.post<LoginResponse>(url, LoginApibody)
        .pipe(
            catchError((error : HttpErrorResponse)=>{
                return throwError(()=> error.error)
            })
        )
    }
}