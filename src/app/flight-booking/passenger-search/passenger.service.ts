import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Passenger } from './passenger';
import { AbstractPassengerService } from './abstract-passenger.service';

@Injectable()
export class PassengerService implements AbstractPassengerService {
  private url = 'http://demo.angulararchitects.io/api/passenger';
  constructor(private http: HttpClient) {
    console.log('Passenger Service', this.url);
  }

  find(name: string, firstname: string): Observable<Passenger[]> {
    const params = new HttpParams().set('name', name).set('firstname', firstname);
    const headers = new HttpHeaders().set('Accept', 'application/json');

    return this.http.get<Passenger[]>(this.url, { params, headers });
  }
}
