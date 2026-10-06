import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { NotificationEvent } from '../../Types/Notification.interface';
import { Subject, takeUntil } from 'rxjs';
import { NotificationService } from '../../Services/Notification.service';

@Component({
  selector: 'app-common-notification',
  standalone: true,
  imports: [CommonModule, ToastModule, RippleModule],
  templateUrl: './common-notification.html',
  styleUrl: './common-notification.css',
  providers : [MessageService]
})
export class CommonNotification implements AfterViewInit, OnDestroy {

  private messageService = inject(MessageService);
  private notificationService = inject(NotificationService);
  
  public subject$ = new Subject<void>();
  
  public ngAfterViewInit(): void {
    this.notificationService.notificationSubject$.pipe(
      takeUntil(this.subject$)
    )
    .subscribe((notification: NotificationEvent|null)=>{
      console.log("Notification received in common-notification component: ", notification);
      if(notification){
        this.showNotification(notification);
      }
    })
  }

  public showNotification(notification: NotificationEvent): void{
    this.messageService.add({
      severity: notification.type, 
      summary: notification.summary, 
      detail: notification.detail,
      sticky : notification.sticky
      });
  }

  public ngOnDestroy(): void {
    this.subject$.next();
    this.subject$.complete();
  }

}
