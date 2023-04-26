// src/app/flight-booking/flight-booking.routes.ts

import { Routes } from '@angular/router';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { PassengerSearchComponent } from './passenger-search/passenger-search.component';

// Diesen Import hinzufügen
import { FlightEditComponent } from './flight-edit/flight-edit.component';
import { FlightBookingComponent } from './flight-booking.component';
import { AuthGuard, CanDeactivateGuard } from '../shared';
import { FlightResolver } from './flight-edit/flight.resolver';

export const FLIGHT_BOOKING_ROUTES: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'flight-booking',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: FlightBookingComponent,
    // canActivate: [() => inject(AuthService).isLoggedIn()],
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'flight-search',
        pathMatch: 'full'
      },
      {
        path: 'flight-search',
        component: FlightSearchComponent
      },
      {
        path: 'passenger-search',
        component: PassengerSearchComponent
      },
      {
        path: 'flight-edit/:id',
        component: FlightEditComponent,
        canDeactivate: [CanDeactivateGuard],
        resolve: {
          flight: FlightResolver
        }
      }
    ]
  }
];
