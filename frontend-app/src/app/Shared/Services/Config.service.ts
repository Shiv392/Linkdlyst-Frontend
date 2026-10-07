import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn : 'root'
})

export class ConfigService{

    public userEmail = signal<String | null>(null);
    public userName = signal<String | null>(null);
}