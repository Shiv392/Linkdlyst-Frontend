import { Injectable } from "@angular/core";

@Injectable({
    providedIn : 'root'
})

export  class Controller{
    public readonly user_details : string = '/user-details';

    public readonly linkEndPoint : string = '/urls'
}