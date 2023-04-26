// src/app/default-flight.service.ts

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from './flight';
import { FlightBookingModule } from './flight-booking.module';

@Injectable({
  providedIn: 'any'
  // providedIn: FlightBookingModule
})
export class FlightService {
  // We will refactor this to an observable in a later exercise!
  flights: Flight[] = [];

  constructor(private http: HttpClient) {}

  load(from: string, to: string): void {
    this.find(from, to).subscribe({
      next: (flights) => {
        this.flights = flights;
      },
      error: (err) => {
        console.error('error', err);
      }
    });
  }

  find(from: string, to: string): Observable<Flight[]> {
    const url = 'http://www.angular.at/api/flight';

    const headers = new HttpHeaders().set('Accept', 'application/json');

    const params = new HttpParams().set('from', from).set('to', to);

    return this.http.get<Flight[]>(url, { headers, params });
  }

  delay(): void {
    // const date = new Date(this.flights[0].date);
    // date.setTime(date.getTime() + 1000 * 60 * 15);
    // this.flights[0].date = date.toISOString();

    const oldFlights = this.flights;
    const oldFlight = oldFlights[0];
    const oldDate = new Date(oldFlight.date);

    const newDate = new Date(oldDate.getTime() + 1000 * 60 * 15);
    const newFlight = { ...oldFlight, date: newDate.toISOString() };
    // const newFlights = [newFlight, ...oldFlights.slice(1)];
    // this.flights = newFlights;
    this.flights[0] = newFlight;
  }
}
