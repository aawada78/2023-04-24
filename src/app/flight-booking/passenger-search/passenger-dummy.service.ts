import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Passenger } from './passenger';
import { AbstractPassengerService } from './abstract-passenger.service';

@Injectable()
export class PassengerDummyService implements AbstractPassengerService {
  constructor() {
    console.log('Passenger Dummy Service');
  }

  find(name: string, firstname: string): Observable<Passenger[]> {
    const passengers = [
      { id: 2942, name: 'Smith', firstName: 'Emma', bonusMiles: 39400, passengerStatus: 'B' },
      { id: 2966, name: 'Smith', firstName: 'Mia', bonusMiles: 162005, passengerStatus: 'B' }
    ];

    return of(passengers);
  }
}
