import { Component, EventEmitter, Input, OnChanges, OnInit, Output, Self, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, NgControl, NgModel } from '@angular/forms';
import { format } from 'date-fns';

type OnChange = (value: Date) => void;
type OnTouched = () => void;

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DateComponent), multi: true }]
})
export class DateComponent implements OnInit, OnChanges, ControlValueAccessor {
  @Input() date: string | null = null;
  @Output() dateChange = new EventEmitter<string>();

  day: number | null = null;
  month: number | null = null;
  year: number | null = null;
  hour: number | null = null;
  minute: number | null = null;

  _disabled?: boolean = false;
  // ngControl = inject(NgControl);

  // constructor(private ngControl: NgControl) {
  constructor() {
    console.debug('date in constructor', this.date);
    // this.ngControl.valueAccessor = this;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  _onChange: OnChange = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  _onTouched: OnTouched = () => {};

  writeValue(dateString: string): void {
    const date = new Date(dateString);
    const formattedDate = date ? format(date, 'dd:MM:yyyy') : '';
    this.date = formattedDate;
  }
  registerOnChange(fn: any): void {
    // eslint-disable-next-line no-underscore-dangle
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    // eslint-disable-next-line no-underscore-dangle
    // this._onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    // eslint-disable-next-line no-underscore-dangle
    this._disabled = isDisabled;
  }

  ngOnInit() {
    console.debug('date in ngOnInit', this.date);
  }

  ngOnChanges() {
    console.debug('date in ngOnChanges', this.date);

    if (!this.date) {
      return;
    }

    const date = new Date(this.date);
    this.day = date.getDate();
    this.month = date.getMonth() + 1;
    this.year = date.getFullYear();
    this.hour = date.getHours();
    this.minute = date.getMinutes();

    // eslint-disable-next-line no-underscore-dangle
    this._onChange(date);
  }

  apply() {
    if (!this.year || !this.month || !this.day || !this.hour || !this.minute) {
      return;
    }

    const date = new Date(this.year, this.month - 1, this.day, this.hour, this.minute);
    this.dateChange.next(date.toISOString());
  }
}
