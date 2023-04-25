import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  readonly basket$ = new BehaviorSubject<{ [key: number]: boolean }>({});
}
