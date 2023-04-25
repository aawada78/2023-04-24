import { Directive, HostBinding, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { format, parse } from 'date-fns';

type OnChange = (value: Date) => void;
type OnTouched = () => void;

@Directive({
  selector: '[appDateCva]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DateCvaDirective,
      multi: true
    }
  ]
})
export class DateCvaDirective implements ControlValueAccessor {
  @HostBinding('value') value = '';

  _disabled?: boolean = false;
  _onChange: OnChange = () => {};
  _onTouched: OnTouched = () => {};

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @HostListener('blur')
  handleBlur(): void {
    // eslint-disable-next-line no-underscore-dangle
    this._onTouched();
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @HostListener('change', ['$event.target.value'])
  handleChange(value: string) {
    const date = value ? parse(value, 'dd:MM:yyyy', 0) : new Date();
    // eslint-disable-next-line no-underscore-dangle
    this._onChange(date);
  }

  writeValue(date: Date): void {
    const formattedDate = date ? format(date, 'dd:MM:yyyy') : '';
    this.value = formattedDate;
  }
  registerOnChange(fn: any): void {
    // eslint-disable-next-line no-underscore-dangle
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    // eslint-disable-next-line no-underscore-dangle
    this._onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    // eslint-disable-next-line no-underscore-dangle
    this._disabled = isDisabled;
  }
}
