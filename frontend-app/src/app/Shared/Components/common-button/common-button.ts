import { Component, Input } from '@angular/core';
import { Button, ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-common-button',
  imports: [ButtonModule],
  templateUrl: './common-button.html',
  styleUrl: './common-button.css',
})
export class CommonButton {
  @Input() label = '';
  @Input() icon?: string;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() buttonClass = '';
  @Input() loading? : boolean = false;
}
