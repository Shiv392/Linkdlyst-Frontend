import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonNotification } from './Shared/Components/common-notification/common-notification';
import { CommonLoader } from './Shared/Components/common-loader/common-loader';
import { CookieService } from 'ngx-cookie-service';
import { Subject, takeUntil } from 'rxjs';
import { UserDetailsService } from './Shared/Services/UserDetails.service';
import { userDetails } from './Shared/Types/UserDetails';
import { ConfigService } from './Shared/Services/Config.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonNotification, CommonLoader],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [CookieService]
})
export class App implements OnInit, OnDestroy {

  protected readonly title = signal('frontend-app');

  private userDetailService = inject(UserDetailsService);
  private configService = inject(ConfigService);
  private cookieService = inject(CookieService);

  public subject$ = new Subject<void>();

  ngOnInit(): void {
      this.userDetailService.callApiEvent$.pipe(takeUntil(this.subject$))
      .subscribe(event=>{
        if(event){
          this.getUserDetails();
        }
      });

      this.getUserDetails();
  }

  public getUserDetails() : void{
    this.userDetailService.getUserDetails().pipe(takeUntil(this.subject$))
    .subscribe((res : userDetails)=>{
      if(res.success){
        this.configService.userEmail.set(res.data.email);
        this.configService.userName.set(res.data.name);
      }
    })
  }

  ngOnDestroy(): void {
    this.subject$.next();
    this.subject$.complete();
  }
}
