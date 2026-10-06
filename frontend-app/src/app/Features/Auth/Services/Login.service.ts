import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { AuthControllerService } from "../../../Controllers/AuthController.service";
import { throwError } from "rxjs/internal/observable/throwError";
import { catchError } from "rxjs";
import { environment } from "../../../Environments/environment";
import { loginApiBody, loginApiResponse } from "../Models/login";

@Injectable({
    providedIn : 'root'
})
export class LoginService{

    private http = inject(HttpClient);
    private AuthControllerService = inject(AuthControllerService);
    
    public loginUser(LoginApibody: loginApiBody) : Observable<loginApiResponse> {
        const url = environment.baseURL + this.AuthControllerService.login;
        return this.http.post<loginApiResponse>(url, LoginApibody, {withCredentials : true})
        .pipe(
            catchError((error : HttpErrorResponse)=>{
                return throwError(()=> error.error)
            })
        )
    }
}