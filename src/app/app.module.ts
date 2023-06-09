// src/app/app.module.ts

import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserModule } from '@angular/platform-browser';
import { InjectionToken, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FlightBookingModule } from './flight-booking/flight-booking.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { SharedModule } from './shared/shared.module';
import { CustomerModule } from './customer/customer.module';
import { environment } from 'src/environments/environment';
import { CustomPrealoadStrategy } from './custom-preaload.strategy';

export const BASE_URL = new InjectionToken<string>('BASE_URL', {
  providedIn: 'root',
  factory: () => 'http://google.com'
});

export const AUTH_API = new InjectionToken<string>('AUTH_API', {
  providedIn: 'root',
  factory: () => {
    if (environment.production) {
      return 'https://myreal.auth.api.de';
    } else {
      return 'https://mytest.auth.api.de';
    }
  }
});

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES, { preloadingStrategy: CustomPrealoadStrategy }),
    HttpClientModule,
    BrowserModule,
    SharedModule
  ],
  declarations: [AppComponent, SidebarComponent, NavbarComponent, HomeComponent, AboutComponent, NotFoundComponent],
  providers: [
    // {
    //   provide: BASE_URL,
    //   useValue: 'http://google.com'
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
