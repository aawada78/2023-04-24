import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomPrealoadStrategy implements PreloadingStrategy {
  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    if (route.data && route.data.preloading) {
      const preloading = route.data.preloading;

      const today = new Date().getDate();

      if (preloading.preload && preloading.startDay <= today) {
        return fn();
      }
    }

    return of(null);
  }
}
