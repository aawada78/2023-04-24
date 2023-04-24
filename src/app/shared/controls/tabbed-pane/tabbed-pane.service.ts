import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TabbedPaneService {
  readonly pageCount = new BehaviorSubject<number>(0);
  readonly currentPage = new BehaviorSubject<number>(0);
}
