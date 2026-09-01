import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-common-input',
  imports: [],
  templateUrl: './common-input.html',
  styleUrl: './common-input.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CommonInput),
      multi: true,
    },
  ],
})
export class CommonInput implements ControlValueAccessor {
  @Input() type = 'text';
  @Input() id = '';
  @Input() name = '';
  @Input() placeholder = '';
  @Input() inputClass = '';
  @Input() ariaLabel = '';
  @Input() autocomplete?: string;

  value = '';
  disabled = false;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | null): void {
    this.value = value ?? '';
  }

  registerOnChange(onChange: (value: string) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  updateValue(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
    this.onChange(this.value);
  }

  markAsTouched(): void {
    this.onTouched();
  }
}
