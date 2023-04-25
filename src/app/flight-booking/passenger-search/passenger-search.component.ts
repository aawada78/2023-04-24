import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Passenger } from './passenger';
import { AbstractPassengerService } from './abstract-passenger.service';

@Component({
  selector: 'app-passenger-search',
  templateUrl: './passenger-search.component.html',
  styleUrls: ['./passenger-search.component.scss']
})
export class PassengerSearchComponent {
  firstname = '';
  name = 'Smith';
  passengerList$: Observable<Passenger[]> = of([]);
  selectedPassenger: Passenger | undefined;

  constructor(private passengerService: AbstractPassengerService) {}

  load(): void {
    this.passengerList$ = this.passengerService.find(this.name, this.firstname);
  }

  toggleSelection(p: Passenger) {
    this.selectedPassenger = p;
  }
}
