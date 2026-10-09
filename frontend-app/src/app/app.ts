import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonNotification } from './Shared/Components/common-notification/common-notification';
import { CommonLoader } from './Shared/Components/common-loader/common-loader';
import { Subject, takeUntil } from 'rxjs';
import { UserDetailsService } from './Shared/Services/UserDetails.service';
import { userDetails } from './Shared/Types/UserDetails';
import { ConfigService } from './Shared/Services/Config.service';
import { AuthService } from './Shared/Services/Auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonNotification, CommonLoader],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {

  protected readonly title = signal('frontend-app');

  private userDetailService = inject(UserDetailsService);
  private configService = inject(ConfigService);
  private authService = inject(AuthService);
  private cookieService = inject(CookieService);

  public subject$ = new Subject<void>();

  ngOnInit(): void {
      this.userDetailService.callApiEvent$.pipe(takeUntil(this.subject$))
      .subscribe(event=>{
        if(event){
          this.getUserDetails();
        }
      });

      this.listenLogout();

      this.getUserDetails();
  }

  public listenLogout() : void{
    this.authService.logoutSubject.pipe(takeUntil(this.subject$))
    .subscribe(event=>{
      if(event){
        this.authService.isLoggedIn.set(false);
        this.cookieService.deleteAll();
        this
      }
    })
  }

  public getUserDetails() : void{
    this.userDetailService.getUserDetails().pipe(takeUntil(this.subject$))
    .subscribe({
      next : (res : userDetails)=>{
      if(res.success){
        this.authService.isLoggedIn.set(true);
        this.configService.userEmail.set(res.data.email);
        this.configService.userName.set(res.data.name);
      }
      },
      error : (error: HttpErrorResponse)=>{
        this.authService.isLoggedIn.set(false);
        this.configService.userEmail.set(null);
        this.configService.userEmail.set(null);
      }
    })
  }

  ngOnDestroy(): void {
    this.subject$.next();
    this.subject$.complete();
  }
}
