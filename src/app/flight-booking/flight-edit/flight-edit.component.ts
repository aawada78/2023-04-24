// src/app/flight-booking/flight-edit/flight-edit.component.ts

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
import { CanDeactivateComponent } from 'src/app/shared';
import { Flight } from '../flight';
import { pluck, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.scss']
})
export class FlightEditComponent implements OnInit, CanDeactivateComponent, OnDestroy {
  id = 0;
  showDetails = false;
  flight!: Flight;
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
    this.route.params.pipe(takeUntil(this.terminator$), pluck('id', 'showDetails')).subscribe(([id, showDetails]) => {
      this.id = id;
      this.showDetails = showDetails;
    });

    this.route.data.pipe(takeUntil(this.terminator$), pluck('flight')).subscribe({
      next: (flight) => {
        this.flight = flight;
      }
    });
  }
}
