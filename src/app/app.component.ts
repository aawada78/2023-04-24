import { Component, Inject } from '@angular/core';
import { AUTH_API, BASE_URL } from './app.module';
import { inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Hello World!';

  authApi = inject(AUTH_API);

  constructor(@Inject(BASE_URL) private baseUrl: string) {
    console.log('AppComponent', baseUrl);
    console.log('AppComponent - AuthApi', this.authApi);
  }
}
