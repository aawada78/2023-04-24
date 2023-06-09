// src/app/flight-search/flight-search.component.ts

import { Component, OnInit, inject } from '@angular/core';
import { Flight } from '../flight';
import { FlightService } from '../flight.service';
import { addDays, subDays } from 'date-fns';
import { BasketService } from 'src/app/shared';
import { of } from 'rxjs';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss']
})
export class FlightSearchComponent implements OnInit {
  from = 'Hamburg';
  to = 'Graz';
  date = new Date();
  selectedFlight: Flight | null = null;
  delayFilter = false;

  basket: { [key: number]: boolean } = {
    3: true,
    5: true
  };

  basketService = inject(BasketService);
  constructor(private flightService: FlightService) {}

  get flights() {
    // We will refactor this to an observable in a later exercise!
    return this.flightService.flights;
  }
  basketChange(selected: boolean, id: number) {
    this.basket[id] = selected;
    this.basketService.basket$.next(this.basket);
  }

  ngOnInit(): void {
    this.basketService.basket$.subscribe({
      next: (basket) => (this.basket = basket)
    });
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
