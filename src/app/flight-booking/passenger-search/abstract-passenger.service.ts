import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Passenger } from './passenger';
import { PassengerService } from './passenger.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PassengerDummyService } from './passenger-dummy.service';

@Injectable({
  providedIn: 'any',
  useFactory: (http: HttpClient) => {
    if (!environment.production) {
      return new PassengerService(http);
    } else {
      return new PassengerDummyService();
    }
  },
  deps: [HttpClient]
})
export abstract class AbstractPassengerService {
  abstract find(name: string, firstname: string): Observable<Passenger[]>;
}
