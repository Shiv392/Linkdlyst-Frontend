import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class CommonLoaderService{

    public loading$ =  signal(false);

    public showLoader() : void{
        this.loading$.set(true);
    }

    public hideLoader() : void{
        this.loading$.set(false);
    }
}