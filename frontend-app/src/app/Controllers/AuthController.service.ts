import { Injectable } from "@angular/core";

@Injectable({
    providedIn : "root"
})
export class AuthControllerService{
    public readonly login : String = "/auth/login";
    public readonly signup : String = "/auth/signup";
}