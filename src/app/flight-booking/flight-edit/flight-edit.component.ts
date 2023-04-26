// src/app/flight-booking/flight-edit/flight-edit.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CanDeactivateComponent } from 'src/app/shared';
import { Flight } from '../flight';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.scss']
})
export class FlightEditComponent implements OnInit, CanDeactivateComponent {
  id = 0;
  showDetails = false;
  flight!: Flight;

  constructor(private route: ActivatedRoute) {}

  canDeactivate(): Observable<boolean> {
    if (confirm('Do you really want to leave?')) {
      return of(true);
    }
    return of(false);
  }

  ngOnInit(): void {
    this.route.params.pipe(pluck('id', 'showDetails')).subscribe(([id, showDetails]) => {
      this.id = id;
      this.showDetails = showDetails;
    });

    this.route.data.pipe(pluck('flight')).subscribe({
      next: (flight) => {
        this.flight = flight;
      }
    });
  }
}
