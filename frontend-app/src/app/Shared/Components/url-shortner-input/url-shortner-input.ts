import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonInput } from '../common-input/common-input';
import { CommonButton } from '../common-button/common-button';
import { AuthService } from '../../Services/Auth.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LinkService } from '../../../Features/Links/Services/links.service';
import { CommonLoaderService } from '../../Services/CommonLoaderService.service';
import { NotificationService } from '../../Services/Notification.service';

@Component({
  selector: 'app-url-shortner-input',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CommonInput, CommonButton],
  templateUrl: './url-shortner-input.html',
  styleUrl: './url-shortner-input.css',
})
export class UrlShortnerInput {

  private authService = inject(AuthService);
  private router = inject(Router);
  private linkService = inject(LinkService);
  private commmonLoaderService = inject(CommonLoaderService);
  private commonNotificationService = inject(NotificationService);

  private subject$ = new Subject<void>();

  constructor(){

  }

    readonly shortenForm = new FormGroup({
      name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(50)] }),
        url: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    });

    shortenUrl(): void {
        if (this.shortenForm.invalid) {
            this.shortenForm.markAllAsTouched();
            return;
        }

        if(!this.authService.isLoggedIn()){
              this.router.navigate(["/auth/login"])
        }
        else{

          this.commmonLoaderService.showLoader();
          const apibody = {
            "name" : this.shortenForm.value.name?.trim() || '',
            "url" : this.shortenForm.value.url?.toLowerCase().trim() || '',
            "securityPassword" : ''
          }

          this.linkService.addLink(apibody).pipe(takeUntil(this.subject$))
          .subscribe(({
            next : (res: {success: boolean, message : string})=>{
            if(res.success){
              this.commonNotificationService.notificationSubject$.next({
                type : 'success',
                summary : 'Success',
                detail : res.message
              }
              );

              this.commmonLoaderService.hideLoader();
              this.linkService.reloadApiSubject.next(true);
            }
          },
          error : ()=>{
            this.commmonLoaderService.hideLoader();
          }
          }))
          
          this.router.navigate(['/links']);
        }
    }
}
