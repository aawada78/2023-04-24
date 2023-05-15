// src/app/flight-booking/flight-edit/flight-edit.component.ts

import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
import { CanDeactivateComponent } from 'src/app/shared';
import { Flight } from '../flight';
import { filter, pluck, takeUntil } from 'rxjs/operators';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

const validCities: string[] = ['Berlin', 'Stuttgart', 'Honolulu'];

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
function cityValidator(c: AbstractControl): ValidationErrors {
  if (c.value && validCities.includes(c.value)) {
    return {};
  }
  return {
    city: {
      currentCity: c.value,
      availableCities: validCities,
      message: 'Please select a valid city!'
    }
  };
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
function cityValidatorWithParams(validCitiesParam: string[]): ValidatorFn {
  return (c: AbstractControl): ValidationErrors => {
    if (c.value && validCitiesParam.includes(c.value)) {
      return {};
    }
    return {
      city: {
        currentCity: c.value,
        availableCities: validCities,
        message: 'Please select a valid city!'
      }
    };
  };
}

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.scss']
})
export class FlightEditComponent implements OnInit, CanDeactivateComponent, OnDestroy {
  id = 0;
  showDetails = false;
  flight!: Flight;
  form!: FormGroup;
  formBuilder = inject(FormBuilder);

  superDupaCities: string[] = ['Berlin', 'Stuttgart', 'Honolulu', 'Hamburg', 'Graz'];

  private terminator$ = new Subject();

  constructor(private route: ActivatedRoute) {}

  ngOnDestroy(): void {
    this.terminator$.next();
  }

  canDeactivate(): Observable<boolean> {
    if (confirm('Do you really want to leave?')) {
      return of(true);
    }
    return of(false);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [this.id, [Validators.required]],
      from: [
        '',
        { validators: [Validators.required, Validators.maxLength(15), cityValidatorWithParams(this.superDupaCities)], updateOn: 'blur' }
      ],
      to: [
        '',
        { validators: [Validators.required, Validators.maxLength(15), cityValidatorWithParams(this.superDupaCities)], updateOn: 'blur' }
      ],
      date: [''],
      delayed: [false]
    });

    this.route.params
      .pipe(
        takeUntil(this.terminator$),
        filter((params) => !!params),
        pluck('id', 'showDetails')
      )
      .subscribe(([id, showDetails]) => {
        this.id = id;
        this.showDetails = showDetails;
      });

    this.route.data.pipe(takeUntil(this.terminator$), pluck('flight')).subscribe({
      next: (flight) => {
        this.flight = flight;
        this.form.patchValue(flight);
      }
    });

    this.form.valueChanges.pipe(takeUntil(this.terminator$)).subscribe({
      next: (formValue) => console.log('Form value', formValue)
    });
  }

  save() {
    console.log('Id', this.form.controls.id.value);
    console.log('From', this.form.controls.from.value);
    console.log('To', this.form.controls.to.value);
    console.log('Date', this.form.controls.date.value);
    console.log('Delayed', this.form.controls.delayed.value);
  }
}
