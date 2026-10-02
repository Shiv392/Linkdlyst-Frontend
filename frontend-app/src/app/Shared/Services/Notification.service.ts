import { Injectable } from "@angular/core";
import { NotificationEvent } from "../Types/Notification.interface";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
    providedIn : 'root'
})

export class NotificationService{

    public notificationSubject$: Subject<NotificationEvent | null>= new BehaviorSubject<NotificationEvent | null>(null);

}