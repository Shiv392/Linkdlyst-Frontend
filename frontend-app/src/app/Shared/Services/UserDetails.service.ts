import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Controller } from "../../Controllers/Controller";
import { BehaviorSubject, catchError, Observable, throwError } from "rxjs";
import { userDetails } from "../Types/UserDetails";
import { environment } from "../../Environments/environment";

@Injectable({
    providedIn : 'root'
})

export class UserDetailsService{

    private http = inject(HttpClient);
    private controller = inject(Controller);

    public callApiEvent$ = new BehaviorSubject<boolean>(false);

    public getUserDetails() : Observable<userDetails>{
        const url = environment.baseURL + this.controller.user_details;
        return this.http.get<userDetails>(url)
        .pipe(
            catchError((error : HttpErrorResponse)=>{
                return throwError(()=> error.error)
            })
        )
    }
}