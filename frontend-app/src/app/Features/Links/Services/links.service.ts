import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { addLinkApiBody, editLinkApiBody, getLinksApiResponse } from "../Models/links.model";
import { environment } from "../../../Environments/environment";
import { Controller } from "../../../Controllers/Controller";

@Injectable({
    providedIn: 'root'
})

export class LinkService {
    private http = inject(HttpClient);
    private controller = inject(Controller);

    public getLinks(): Observable<getLinksApiResponse> {
        const url = environment.baseURL + this.controller.linkEndPoint;

        return this.http.get<getLinksApiResponse>(url)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return throwError(() => error.error)
                })
            )
    }

    public addLink(apibody: addLinkApiBody): Observable<{ success: boolean, message: string }> {
        const url = environment.baseURL + this.controller.linkEndPoint;

        return this.http.post<{ success: boolean, message: string }>(url, apibody)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return throwError(() => error.error)
                })
            )
    }

    public deleteLink(id: number): Observable<{ success: boolean, message: string }> {
        const url: string = environment.baseURL + this.controller.linkEndPoint + `/${id}`;

        return this.http.delete<{ success: boolean, message: string }>(url)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return throwError(() => error.error)
                })
            )
    }

    public editLink(apibody: editLinkApiBody): Observable<{ success: boolean, message: string }> {
        const url = environment.baseURL + this.controller.linkEndPoint;

        return this.http.post<{ success: boolean, message: string }>(url, apibody)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    return throwError(() => error.error)
                })
            )
    }

    public readonly navigationLinks = signal<any>([
        { label: 'Home', route: '/home' },
        { label: 'My links', route: '/links' }
    ])
}