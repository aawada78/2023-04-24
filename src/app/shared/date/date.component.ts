import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Self,
  SimpleChanges,
  forwardRef,
  inject
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgControl, NgModel } from '@angular/forms';
import { format } from 'date-fns';

type OnChange = (value: Date) => void;
type OnTouched = () => void;

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
  // providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DateComponent), multi: true }]
})
export class DateComponent implements ControlValueAccessor {
  @Input() date: Date | null = null;

  day: number | null = null;
  month: number | null = null;
  year: number | null = null;
  hour: number | null = null;
  minute: number | null = null;

  _disabled?: boolean = false;
  ngControl = inject(NgControl);

  constructor() {
    console.debug('date in constructor', this.date);
    this.ngControl.valueAccessor = this;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  _onChange: OnChange = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  _onTouched: OnTouched = () => {};

  onDateChange() {
    if (!this.date) {
      return;
    }

    this.day = this.date.getDate();
    this.month = this.date.getMonth() + 1;
    this.year = this.date.getFullYear();
    this.hour = this.date.getHours();
    this.minute = this.date.getMinutes();
  }

  writeValue(date: Date): void {
    this.date = date;

    this.onDateChange();
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

  apply() {
    if (!this.year || !this.month || !this.day || !this.hour || !this.minute) {
      return;
    }

    const date = new Date(this.year, this.month - 1, this.day, this.hour, this.minute);
    console.debug('New date in apply', date);
    this.date = date;
    // eslint-disable-next-line no-underscore-dangle
    this._onChange(this.date);
  }
}
