import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Flight } from '../flight';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { FlightService } from '../flight.service';

@Injectable({
  providedIn: 'root'
})
export class FlightResolver implements Resolve<Flight> {
  private flightService = inject(FlightService);

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Flight | Observable<Flight> | Promise<Flight> {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    const id = route.params['id'];
    // return this.flightService.findById(id).pipe(delay(2000));
    return this.flightService.findById(id);
  }
}
