// src/app/flight-booking/flight-booking.module.ts

import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { FlightCardComponent } from './flight-card/flight-card.component';
import { PassengerSearchComponent } from './passenger-search/passenger-search.component';
import { RouterModule } from '@angular/router';
import { FLIGHT_BOOKING_ROUTES } from './flight-booking.routes';
import { FlightBookingComponent } from './flight-booking.component';
import { FlightEditComponent } from './flight-edit/flight-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlightService } from './flight.service';

@NgModule({
  imports: [RouterModule.forChild(FLIGHT_BOOKING_ROUTES), FormsModule, SharedModule, ReactiveFormsModule],
  declarations: [FlightSearchComponent, FlightCardComponent, PassengerSearchComponent, FlightBookingComponent, FlightEditComponent],
  exports: [FlightSearchComponent],
  providers: [FlightService]
})
export class FlightBookingModule {}
