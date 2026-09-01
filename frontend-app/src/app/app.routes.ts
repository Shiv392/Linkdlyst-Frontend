import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path : '', redirectTo : 'home', pathMatch : 'full'
    },
    {
        path : "home", loadComponent : () => import('./Features/Home/Home').then(m => m.Home)
    },
    {
        path : "auth", loadChildren : () => import('./Features/Auth/Auth.routes').then(m => m.AuthRoutes)
    },
    {
        path : '**', redirectTo : 'home', pathMatch : 'full'
    }
];
