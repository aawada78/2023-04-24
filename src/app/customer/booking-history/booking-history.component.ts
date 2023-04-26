import { Component, OnInit } from '@angular/core';
import { Flight } from 'src/app/flight-booking/flight';
import { OutletComponent } from 'src/app/shared/controls/outlet/outlet.component';
@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.scss']
})
export class BookingHistoryComponent implements OnInit {
  contextInfo = { $implicit: 'folks', desc: 'I have now a binding from Typescript!' };

  outletComponent = OutletComponent;

  flights: Flight[] = [
    { id: 1, from: 'Berlin', to: 'Stuttgart', date: '2023-04-19T17:00+01:00' },
    { id: 2, from: 'Berlin', to: 'Stuttgart', date: '2023-04-19T19:00+01:00' },
    { id: 3, from: 'Stuttgart', to: 'Berlin', date: '2023-04-26T20:00+01:00' }
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getKeys(): string[] {
    return Object.keys(this.flights[0]);
  }

  constructor() {}

  ngOnInit(): void {}

  delete() {
    console.log('Delete executed!');
  }
}
