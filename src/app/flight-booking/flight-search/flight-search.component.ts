// src/app/flight-search/flight-search.component.ts

import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { Flight } from '../flight';
import { FlightService } from '../flight.service';
import { addDays, subDays } from 'date-fns';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss']
})
export class FlightSearchComponent {
  from = 'Hamburg';
  to = 'Graz';
  date = new Date();
  selectedFlight: Flight | null = null;
  delayFilter = false;

  basket: { [key: number]: boolean } = {
    3: true,
    5: true
  };

  constructor(private flightService: FlightService) {}

  get flights() {
    // We will refactor this to an observable in a later exercise!
    return this.flightService.flights;
  }

  search(): void {
    this.flightService.load(this.from, this.to);
  }

  select(f: Flight): void {
    this.selectedFlight = f;
  }

  delay(): void {
    this.flightService.delay();
  }

  skipToNextWeek(): void {
    this.date = addDays(this.date, 7);
  }

  skipToPrevWeek(): void {
    this.date = subDays(this.date, 7);
  }
}
