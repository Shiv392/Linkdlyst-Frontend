import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonNotification } from './Shared/Components/common-notification/common-notification';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonNotification],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend-app');
}
