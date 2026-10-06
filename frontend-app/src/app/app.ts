import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonNotification } from './Shared/Components/common-notification/common-notification';
import { CommonLoader } from './Shared/Components/common-loader/common-loader';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonNotification, CommonLoader],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [CookieService]
})
export class App {
  protected readonly title = signal('frontend-app');
}
