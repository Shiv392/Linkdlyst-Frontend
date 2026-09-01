import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-common-button',
  imports: [],
  templateUrl: './common-button.html',
  styleUrl: './common-button.css',
})
export class CommonButton {
  @Input() label = '';
  @Input() icon?: string;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() buttonClass = '';
}
