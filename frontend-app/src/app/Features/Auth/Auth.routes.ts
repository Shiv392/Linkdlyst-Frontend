import { Routes } from "@angular/router";

export const AuthRoutes : Routes = [
    {
        path : '', redirectTo : 'login', pathMatch : 'full'
    },
    {
        path : 'login', loadComponent: ()=> import("./login/login").then(c=> c.Login)
    },
    {
        path : "signup", loadComponent: ()=> import("./signup/signup").then(c=> c.Signup)
    }
]