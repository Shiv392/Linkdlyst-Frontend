import { Injectable, signal } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn : 'root'
})

export class AuthService{
    public isLoggedIn = signal<boolean>(false);

    public logoutSubject = new Subject<boolean>();
}