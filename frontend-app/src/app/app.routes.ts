import { Routes } from '@angular/router';
import { authGuard } from './Guards/auth.guard';

export const routes: Routes = [
    {
        path : '', redirectTo : 'home', pathMatch : 'full'
    },
    {
        path : "home", loadComponent : () => import('./Features/Home/Home').then(m => m.Home)
    },
    {
        path : "app",
        loadComponent : () => import("./Features/Links/layout/layout").then(m=> m.Layout),
        children : [
            {
                path : '',
                redirectTo : 'link',
                pathMatch : "full"
            },
            {
                path : "link",
                pathMatch : 'full',
                loadComponent : ()=> import("./Features/Links/links").then(m=> m.Links)
            }
        ]
    },
    {
        path : "auth", loadChildren : () => import('./Features/Auth/Auth.routes').then(m => m.AuthRoutes)
    },
    {
        path : '**', redirectTo : 'home', pathMatch : 'full'
    }
];
